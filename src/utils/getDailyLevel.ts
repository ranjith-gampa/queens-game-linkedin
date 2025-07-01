/**
 * Gets the current day's level number.
 * The game adds a new level every day, so we can calculate the level based on days elapsed since start.
 */
const BASE_DATE = new Date('2024-04-30'); // Game start date
const INITIAL_LEVEL = 0;

export function getDailyLevelNumber(): number {
    // Get current date in Pacific Time
    const now = new Date();
    const pacificTime = new Date(now.toLocaleString("en-US", {timeZone: "America/Los_Angeles"}));
    pacificTime.setHours(0, 0, 0, 0);
    
    const timeDiff = pacificTime.getTime() - BASE_DATE.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    
    return INITIAL_LEVEL + daysDiff;
}
