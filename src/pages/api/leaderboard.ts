import { createClient } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { pusher } from '@/utils/pusher';
import { config } from 'dotenv';

config();

// Vercel Postgres will automatically use these environment variables:
// POSTGRES_URL
// POSTGRES_URL_NON_POOLING - for migrations and other one-off operations
// These are automatically added when you create a Postgres instance in your Vercel project

// GET /api/leaderboard?type=regular&limit=100
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const levelType = searchParams.get('type') || 'regular';
  const limit = parseInt(searchParams.get('limit') || '100');

  try {
    const client = createClient();
    await client.connect();

    try {
      const result = await client.query(`
        SELECT 
          ct.level_id,
          u.username,
          u.avatar,
          ct.time_seconds,
          ct.completed_at,
          l.type
        FROM completion_times ct
        JOIN users u ON ct.user_id = u.id
        JOIN levels l ON ct.level_id = l.id
        WHERE l.type = $1
        ORDER BY ct.time_seconds ASC
        LIMIT $2
      `, [levelType, limit]);

      return NextResponse.json(result.rows);
    } finally {
      await client.end();
    }
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
  }
}

// POST /api/leaderboard
export async function POST(req: Request) {
  const { userId, levelId, timeSeconds, username, avatar, levelType } = await req.json();

  try {
    const client = createClient();
    await client.connect();

    try {
      // First ensure user exists
      const { rows: [user] } = await client.query(`
        INSERT INTO users (id, username, avatar)
        VALUES ($1, $2, $3)
        ON CONFLICT (id) DO UPDATE SET
          username = EXCLUDED.username,
          avatar = EXCLUDED.avatar
        RETURNING *
      `, [userId, username || 'Anonymous', avatar || '👤']);

      // Ensure level exists
      await client.query(`
        INSERT INTO levels (id, type, size)
        VALUES ($1, $2, $3)
        ON CONFLICT (id) DO NOTHING
      `, [levelId, levelType, 0]);

      // Insert or update fastest time
      const { rows: [newTime] } = await client.query(`
        INSERT INTO completion_times (user_id, level_id, time_seconds)
        VALUES ($1, $2, $3)
        ON CONFLICT (user_id, level_id) DO UPDATE SET 
          time_seconds = CASE
            WHEN completion_times.time_seconds > EXCLUDED.time_seconds 
            THEN EXCLUDED.time_seconds
            ELSE completion_times.time_seconds
          END,
          completed_at = CASE 
            WHEN completion_times.time_seconds > EXCLUDED.time_seconds 
            THEN NOW()
            ELSE completion_times.completed_at
          END
        RETURNING *
      `, [user.id, levelId, timeSeconds]);

      // If this is a new fastest time, trigger real-time update
      if (newTime) {
        await pusher.trigger('leaderboard', 'new-score', {
          levelId: newTime.level_id,
          username: user.username,
          avatar: user.avatar,
          timeSeconds: newTime.time_seconds,
          completedAt: newTime.completed_at,
          type: levelType // Include the level type for filtering
        });
      }

      return NextResponse.json({ success: true });
    } finally {
      await client.end();
    }
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json({ error: 'Database operation failed' }, { status: 500 });
  }
}
