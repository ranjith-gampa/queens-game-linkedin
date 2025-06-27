/**
 * Gets the current day's level number.
 * The game adds a new level every day, so we can calculate the level based on days elapsed since start.
 */
const BASE_DATE = new Date('2024-04-30'); // Game start date
const INITIAL_LEVEL = 0;

export function getDailyLevelNumber(): number {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const timeDiff = today.getTime() - BASE_DATE.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    
    return INITIAL_LEVEL + daysDiff;
}
