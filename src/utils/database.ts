import { LeaderboardEntry } from './types';
import supabase from './database/supabase';

const ROW_LIMIT = 100;
const ROW_LIMIT_TODAY = 10; // Limit for today's leaderboard

function mapToLeaderboardEntries(data: any[]): LeaderboardEntry[] {
    return data.map((entry: any) => ({
        id: entry.id,
        levelId: entry.level_id,
        username: entry.username,
        avatar: entry.avatar,
        timeSeconds: entry.time_seconds,
        completedAt: entry.completed_at,
        type: entry.type
    }));
}

export async function getLeaderboardEntries(levelType: string, rowLimit: number = ROW_LIMIT): Promise<LeaderboardEntry[]> {
    const { data, error } = await supabase.rpc('get_completion_times', {
        p_level_type: levelType,
        num_records: rowLimit
    });

    if (error) {
        console.error('Error calling function: get_completion_times', error);
        return Promise.reject(new Error('Failed to fetch leaderboard entries'));
    }
    
    return mapToLeaderboardEntries(data);
}

export async function getTodayLeaderboardEntries(levelType: string, levelId: string, rowLimit: number = ROW_LIMIT_TODAY): Promise<LeaderboardEntry[]> {
    const { data, error } = await supabase.rpc('get_completion_times_today', {
        p_level_id: levelId,
        p_level_type: levelType,
        num_records: rowLimit
    });

    if (error) {
        console.error('Error calling function: get_completion_times_today', error);
        return Promise.reject(new Error('Failed to fetch today\'s leaderboard entries'));
    }
    
    return mapToLeaderboardEntries(data);
}

async function insertOrUpdateUser(
    userId: string,
    username: string,
    avatar: string
): Promise<string> {
    console.log('Inserting or updating user:', { userId, username, avatar });
    const { data, error } = await supabase.rpc('insert_or_update_user', {
        p_user_id: userId,
        p_username: username || 'Guest',
        p_avatar: avatar || '👤'
    });

    if (error) {
        console.error('Error calling function: insert_or_update_user', error);
        throw new Error(`Failed to insert or update user: ${error.message}`);
    }

    if (!data) {
        console.error('No user ID returned from insert_or_update_user');
        throw new Error('Failed to insert or update user: No ID returned');
    }

    console.log('Successfully inserted/updated user, returned ID:', data);
    return data;
}

async function insertOrUpdateLevel(
    levelId: string,
    levelType: string
): Promise<boolean> {
    console.log('Inserting or updating level:', levelId, levelType);
    const { data, error } = await supabase.rpc('insert_into_levels', {
        level_id: levelId,
        level_type: levelType,
        level_size: 0 // Assuming size is not needed for leaderboard entries
    });
    if (error) {
        console.error('Error calling function: insert_into_levels', error);
        return Promise.reject(new Error('Failed to insert or update level'));
    }

    return !!data;
}

async function insertIntoCompletionTimes(
    userId: string,
    levelId: string,
    timeSeconds: number,
    levelType: string
): Promise<boolean> {
    console.log('Inserting completion time:', userId, levelId, timeSeconds);
    const { data, error } = await supabase.rpc('insert_or_update_completion_time', {
        p_user_id: userId,
        p_level_id: levelId,
        p_time_seconds: timeSeconds,
        p_level_type: levelType
    });
    if (error) {
        console.error('Error calling function: insert_or_update_completion_time', error);
        return Promise.reject(new Error('Failed to insert completion time'));
    }

    return !!data;
}

export async function saveLeaderboardEntry(
    userId: string,
    username: string,
    avatar: string,
    levelId: string,
    timeSeconds: number,
    levelType: string
): Promise<boolean> {
    try {
        // First ensure user exists
        const user_id = await insertOrUpdateUser(userId, username, avatar);
        if (!user_id) {
            throw new Error('Failed to insert or update user: ' + user_id);
        }

        // Ensure level exists
        const levelExists = await insertOrUpdateLevel(levelId, levelType);
        if (!levelExists) {
            throw new Error('Failed to insert or update level: ' + levelExists);
        }

        // Insert into completion times
        const newTime = await insertIntoCompletionTimes(user_id, levelId, timeSeconds, levelType);
        if (!newTime) {
            throw new Error('Failed to insert completion time: ' + newTime);
        }

        return true;
    } catch (error) {
        console.error('Error in saveLeaderboardEntry:', error);
        throw error; // Re-throw to be handled by caller
    }
}
