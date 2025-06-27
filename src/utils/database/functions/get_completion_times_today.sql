-- Function to get completion times for today's level
CREATE OR REPLACE FUNCTION get_completion_times_today(
    p_level_id VARCHAR,
    p_level_type VARCHAR,
    num_records INTEGER
)
RETURNS TABLE (
    id INTEGER,
    level_id VARCHAR,
    username VARCHAR,
    avatar VARCHAR,
    time_seconds INTEGER,
    completed_at TIMESTAMP,
    type VARCHAR
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        ct.id,
        ct.level_id,
        u.username,
        u.avatar,
        ct.time_seconds,
        ct.completed_at,
        l.type
    FROM completion_times ct
    JOIN users u ON ct.user_id = u.id
    JOIN levels l ON ct.level_id = l.id
    WHERE ct.level_id = p_level_id::VARCHAR
        AND DATE(ct.completed_at) = CURRENT_DATE
        AND l.type = p_level_type
    ORDER BY ct.time_seconds ASC
    LIMIT num_records;
END;
$$ LANGUAGE plpgsql;
