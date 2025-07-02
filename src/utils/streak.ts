import { getDailyLevelNumber } from './getDailyLevel';
import { getLeaderboardEntries } from './database';
import { getUserProfile } from './localStorage';

export interface StreakData {
  currentStreak: number;
  lastPlayedLevel: number;
  lastPlayedDate: string; // Pacific time date string (YYYY-MM-DD)
  weeklyProgress: boolean[]; // 7 days for S, M, T, W, T, F, S
  badges: {
    threeDays: boolean;
    fiveDays: boolean;
    sevenDays: boolean;
    thirtyOneDays: boolean;
    fiftyDays: boolean;
    oneHundredDays: boolean;
    oneHundredFiftyDays: boolean;
    twoHundredDays: boolean;
    threeSixtyFiveDays: boolean;
  };
  notificationsEnabled: boolean;
  dbSyncCompleted?: boolean; // Flag to track if we've synced with database records
}

const STREAK_KEY = 'queensGameStreak';

// Helper function to get current Pacific time date string
export function getPacificDateString(): string {
  const now = new Date();
  return convertUTCToPacificDateString(now);
}

// Helper function to get day of week (0 = Sunday, 1 = Monday, etc.)
export function getPacificDayOfWeek(): number {
  const now = new Date();
  
  // Get the day of week in Pacific timezone
  const pacificDate = new Date(now.toLocaleString("en-US", {timeZone: "America/Los_Angeles"}));
  return pacificDate.getDay();
}

// Get current streak data
export function getStreakData(): StreakData {
  const defaultData: StreakData = {
    currentStreak: 0,
    lastPlayedLevel: -1,
    lastPlayedDate: '',
    weeklyProgress: [false, false, false, false, false, false, false],
    badges: {
      threeDays: false,
      fiveDays: false,
      sevenDays: false,
      thirtyOneDays: false,
      fiftyDays: false,
      oneHundredDays: false,
      oneHundredFiftyDays: false,
      twoHundredDays: false,
      threeSixtyFiveDays: false,
    },
    notificationsEnabled: false,
    dbSyncCompleted: false,
  };

  if (typeof window === 'undefined') {
    return defaultData;
  }

  const stored = localStorage.getItem(STREAK_KEY);

  if (!stored) {
    return defaultData;
  }

  try {
    const parsedData = { ...defaultData, ...JSON.parse(stored) };
    
    // Auto-repair corrupted weekly progress data
    const trueCount = parsedData.weeklyProgress.filter(Boolean).length;
    // Only repair if there's a clear impossibility (more than 7 days in a week)
    const needsRepair = trueCount > 7;
    
    if (needsRepair) {
      console.log('🔧 Auto-repairing corrupted weekly progress data');
      console.log(`   Issue: ${trueCount} days marked (max should be 7)`);
      console.log(`   Before repair:`, parsedData.weeklyProgress);
      
      // Reset weekly progress and only mark today if we played today
      const currentDate = getPacificDateString();
      const dayOfWeek = getPacificDayOfWeek();
      const newWeeklyProgress = [false, false, false, false, false, false, false];
      
      if (parsedData.lastPlayedDate === currentDate && parsedData.currentStreak > 0) {
        newWeeklyProgress[dayOfWeek] = true;
        console.log(`   Marking today (${dayOfWeek}) as completed since we played today`);
      }
      
      const repairedData = {
        ...parsedData,
        weeklyProgress: newWeeklyProgress
      };
      
      console.log(`   After repair:`, newWeeklyProgress);
      console.log(`   Repaired data:`, repairedData);
      
      // Save the repaired data
      localStorage.setItem(STREAK_KEY, JSON.stringify(repairedData));
      return repairedData;
    }
    
    return parsedData;
  } catch {
    return defaultData;
  }
}

// Save streak data
export function saveStreakData(data: StreakData): void {
  if (typeof window !== 'undefined') {
    // Validate data consistency before saving
    const trueCount = data.weeklyProgress.filter(Boolean).length;
    // Only auto-correct if there's a clear inconsistency (more days than possible in a week)
    // Weekly progress can equal streak count if all streak days fall in the current week
    if (trueCount > 7) {
      console.warn('⚠️ Attempting to save inconsistent streak data - auto-correcting');
      console.warn(`   Issue: ${trueCount} days marked in weekly progress (max should be 7)`);
      
      // Auto-correct before saving
      const currentDate = getPacificDateString();
      const dayOfWeek = getPacificDayOfWeek();
      const correctedWeeklyProgress = [false, false, false, false, false, false, false];
      
      if (data.lastPlayedDate === currentDate && data.currentStreak > 0) {
        correctedWeeklyProgress[dayOfWeek] = true;
      }
      
      const correctedData = {
        ...data,
        weeklyProgress: correctedWeeklyProgress
      };
      
      console.warn('   Corrected weekly progress:', correctedWeeklyProgress);
      localStorage.setItem(STREAK_KEY, JSON.stringify(correctedData));
    } else {
      console.log(`💾 Saving streak data: ${data.currentStreak} days, ${trueCount} weekly days marked`);
      localStorage.setItem(STREAK_KEY, JSON.stringify(data));
    }
  }
}

// Update streak when daily level is completed
export function updateStreakOnLevelCompletion(): StreakData {
  console.log('📊 updateStreakOnLevelCompletion() called');
  
  const currentLevel = getDailyLevelNumber();
  const currentDate = getPacificDateString();
  const dayOfWeek = getPacificDayOfWeek();
  
  console.log(`   Current level: ${currentLevel}, date: ${currentDate}, day: ${dayOfWeek}`);
  
  const streakData = getStreakData(); // This will auto-repair if needed
  
  console.log(`   Retrieved streak data:`, streakData);

  // Check if this is today's level
  if (streakData.lastPlayedLevel === currentLevel && streakData.lastPlayedDate === currentDate) {
    // Already played today, no streak update needed - return the current data (which may have been auto-repaired)
    console.log(`   Already played today - returning existing data`);
    return streakData;
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayPacific = new Date(yesterday.toLocaleString("en-US", {timeZone: "America/Los_Angeles"}));
  const yesterdayString = yesterdayPacific.toISOString().split('T')[0];

  let newStreak = 1;
  
  // Check if streak should continue
  if (streakData.lastPlayedDate === yesterdayString) {
    newStreak = streakData.currentStreak + 1;
  }

  // Update weekly progress (reset at beginning of week)
  const newWeeklyProgress = [...streakData.weeklyProgress];
  
  // Calculate the start of the current week (Sunday)
  const now = new Date();
  const pacificTime = new Date(now.toLocaleString("en-US", {timeZone: "America/Los_Angeles"}));
  const startOfCurrentWeek = new Date(pacificTime);
  startOfCurrentWeek.setDate(pacificTime.getDate() - pacificTime.getDay());
  startOfCurrentWeek.setHours(0, 0, 0, 0);
  
  // Calculate the start of the week when we last played
  let shouldResetWeek = false;
  if (streakData.lastPlayedDate) {
    const lastPlayedDate = new Date(streakData.lastPlayedDate + 'T00:00:00-08:00');
    const startOfLastPlayedWeek = new Date(lastPlayedDate);
    startOfLastPlayedWeek.setDate(lastPlayedDate.getDate() - lastPlayedDate.getDay());
    startOfLastPlayedWeek.setHours(0, 0, 0, 0);
    
    // If we're in a different week than when we last played, reset the progress
    shouldResetWeek = startOfCurrentWeek.getTime() !== startOfLastPlayedWeek.getTime();
  } else {
    // First time playing, start fresh
    shouldResetWeek = true;
  }
  
  if (shouldResetWeek) {
    newWeeklyProgress.fill(false);
  }
  
  // Mark all consecutive streak days that fall in the current week
  if (newStreak > 0) {
    console.log(`   Marking consecutive days for ${newStreak}-day streak in current week...`);
    
    // Build consecutive dates working backwards from today
    const currentDateObj = new Date(currentDate + 'T00:00:00-08:00');
    for (let i = 0; i < newStreak; i++) {
      const streakDateObj = new Date(currentDateObj);
      streakDateObj.setDate(currentDateObj.getDate() - i);
      
      // Check if this streak date is in the current week
      const startOfStreakDateWeek = new Date(streakDateObj);
      startOfStreakDateWeek.setDate(streakDateObj.getDate() - streakDateObj.getDay());
      startOfStreakDateWeek.setHours(0, 0, 0, 0);
      
      if (startOfCurrentWeek.getTime() === startOfStreakDateWeek.getTime()) {
        const streakDayOfWeek = streakDateObj.getDay();
        newWeeklyProgress[streakDayOfWeek] = true;
        const streakDateString = convertUTCToPacificDateString(streakDateObj);
        console.log(`     Marked day ${i + 1}: ${streakDateString} (${streakDayOfWeek})`);
      } else {
        console.log(`     Day ${i + 1} is outside current week, stopping`);
        break;
      }
    }
    
    const markedCount = newWeeklyProgress.filter(Boolean).length;
    console.log(`   Weekly progress: ${markedCount} days marked for ${newStreak}-day streak`);
  } else {
    // No streak, mark only current day
    newWeeklyProgress[dayOfWeek] = true;
    console.log(`   Marked only current day (no streak)`);
  }

  // Update badges
  const newBadges = { ...streakData.badges };
  if (newStreak >= 3) newBadges.threeDays = true;
  if (newStreak >= 5) newBadges.fiveDays = true;
  if (newStreak >= 7) newBadges.sevenDays = true;
  if (newStreak >= 31) newBadges.thirtyOneDays = true;
  if (newStreak >= 50) newBadges.fiftyDays = true;
  if (newStreak >= 100) newBadges.oneHundredDays = true;
  if (newStreak >= 150) newBadges.oneHundredFiftyDays = true;
  if (newStreak >= 200) newBadges.twoHundredDays = true;
  if (newStreak >= 365) newBadges.threeSixtyFiveDays = true;

  const updatedData: StreakData = {
    ...streakData,
    currentStreak: newStreak,
    lastPlayedLevel: currentLevel,
    lastPlayedDate: currentDate,
    weeklyProgress: newWeeklyProgress,
    badges: newBadges,
  };

  console.log(`   Final updated data:`, updatedData);
  console.log(`   Saving to localStorage...`);
  
  saveStreakData(updatedData);
  
  console.log(`   ✅ updateStreakOnLevelCompletion() complete`);
  return updatedData;
}

// Check if user can play today's level
export function canPlayTodaysLevel(): boolean {
  const currentLevel = getDailyLevelNumber();
  const currentDate = getPacificDateString();
  const streakData = getStreakData();

  return !(streakData.lastPlayedLevel === currentLevel && streakData.lastPlayedDate === currentDate);
}

// Get the badge names for display
export function getBadgeNames(): Array<{ key: keyof StreakData['badges'], name: string, days: number }> {
  return [
    { key: 'threeDays', name: '3 days', days: 3 },
    { key: 'fiveDays', name: '5 days', days: 5 },
    { key: 'sevenDays', name: '7 days', days: 7 },
    { key: 'thirtyOneDays', name: '31 days', days: 31 },
    { key: 'fiftyDays', name: '50 days', days: 50 },
    { key: 'oneHundredDays', name: '100 days', days: 100 },
    { key: 'oneHundredFiftyDays', name: '150 days', days: 150 },
    { key: 'twoHundredDays', name: '200 days', days: 200 },
    { key: 'threeSixtyFiveDays', name: '365 days', days: 365 },
  ];
}

// Get day names for weekly progress
export function getDayNames(): string[] {
  return ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
}

// Update streak manually (for testing)
export function updateStreak(_levelId: string, isDailyLevel: boolean): StreakData {
  if (!isDailyLevel) {
    return getStreakData(); // Don't update streak for non-daily levels
  }
  
  return updateStreakOnLevelCompletion();
}

// Reset streak data (for testing)
export function resetStreak(): void {
  const defaultData: StreakData = {
    currentStreak: 0,
    lastPlayedLevel: -1,
    lastPlayedDate: '',
    weeklyProgress: [false, false, false, false, false, false, false],
    badges: {
      threeDays: false,
      fiveDays: false,
      sevenDays: false,
      thirtyOneDays: false,
      fiftyDays: false,
      oneHundredDays: false,
      oneHundredFiftyDays: false,
      twoHundredDays: false,
      threeSixtyFiveDays: false,
    },
    notificationsEnabled: false,
    dbSyncCompleted: false,
  };
  
  saveStreakData(defaultData);
}

// Helper function to get level number from date
export function getLevelNumberFromDate(date: string): number {
  const BASE_DATE = new Date('2024-04-30');
  const targetDate = new Date(date + 'T00:00:00-08:00'); // Pacific Time
  const timeDiff = targetDate.getTime() - BASE_DATE.getTime();
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  return daysDiff;
}

// Calculate historical streak from database records
export async function calculateHistoricalStreak(): Promise<StreakData | null> {
  if (typeof window === 'undefined') {
    return null;
  }

  const userProfile = getUserProfile();
  if (!userProfile || !userProfile.userId || userProfile.userId === 'anonymous') {
    console.log('No user profile found, cannot calculate historical streak');
    return null;
  }

  try {
    console.log('Calculating historical streak for user:', userProfile.userId);
    
    // Fetch user's completion records from database (regular/daily levels only)
    const userRecords = await getLeaderboardEntries('regular', 1000, userProfile.userId);
    
    if (!userRecords || userRecords.length === 0) {
      console.log('No historical records found for user');
      return null;
    }

    // Convert database records to a map of levelId -> completion date
    const levelCompletions: Map<number, string> = new Map();
    
    userRecords.forEach(record => {
      const levelNumber = parseInt(record.levelId);
      
      // Parse the database timestamp (assuming it's in UTC)
      const completionDate = new Date(record.completedAt);
      
      // Convert UTC timestamp to Pacific Time date string
      const pacificDateString = convertUTCToPacificDateString(completionDate);
      
      console.log(`Level ${levelNumber}: UTC=${record.completedAt} -> Pacific=${pacificDateString}`);
      
      // Only count if this level corresponds to a daily level for that Pacific date
      const expectedLevelForDate = getLevelNumberFromDate(pacificDateString);
      if (levelNumber === expectedLevelForDate) {
        levelCompletions.set(levelNumber, pacificDateString);
        console.log(`✅ Level ${levelNumber} matches expected daily level for ${pacificDateString}`);
      } else {
        console.log(`❌ Level ${levelNumber} does not match expected daily level ${expectedLevelForDate} for ${pacificDateString}`);
      }
    });

    console.log(`Found ${levelCompletions.size} daily level completions in history`);

    if (levelCompletions.size === 0) {
      return null;
    }

    // Calculate the streak by working backwards from today
    let streakCount = 0;
    let lastPlayedLevel = -1;
    let lastPlayedDate = '';
    let streakDates: string[] = []; // Track the actual dates in the streak
    let badges = {
      threeDays: false,
      fiveDays: false,
      sevenDays: false,
      thirtyOneDays: false,
      fiftyDays: false,
      oneHundredDays: false,
      oneHundredFiftyDays: false,
      twoHundredDays: false,
      threeSixtyFiveDays: false,
    };

    // Start from today and work backwards
    for (let i = 0; i <= 365; i++) { // Check up to 1 year back
      const checkDate = new Date();
      checkDate.setDate(checkDate.getDate() - i);
      const pacificCheckDate = new Date(checkDate.toLocaleString("en-US", {timeZone: "America/Los_Angeles"}));
      const dateString = pacificCheckDate.toISOString().split('T')[0];
      const levelForDate = getLevelNumberFromDate(dateString);
      
      if (levelCompletions.has(levelForDate)) {
        streakCount++;
        streakDates.push(dateString); // Record this date as part of the streak
        if (lastPlayedLevel === -1) {
          lastPlayedLevel = levelForDate;
          lastPlayedDate = dateString;
        }
        console.log(`   Streak day ${streakCount}: ${dateString} (level ${levelForDate})`);
      } else {
        // Streak is broken, stop counting
        console.log(`   Streak broken at ${dateString} (level ${levelForDate} not found)`);
        break;
      }
    }

    console.log(`   Final streak: ${streakCount} days, dates: [${streakDates.join(', ')}]`);

    // Calculate badges based on streak count
    if (streakCount >= 3) badges.threeDays = true;
    if (streakCount >= 5) badges.fiveDays = true;
    if (streakCount >= 7) badges.sevenDays = true;
    if (streakCount >= 31) badges.thirtyOneDays = true;
    if (streakCount >= 50) badges.fiftyDays = true;
    if (streakCount >= 100) badges.oneHundredDays = true;
    if (streakCount >= 150) badges.oneHundredFiftyDays = true;
    if (streakCount >= 200) badges.twoHundredDays = true;
    if (streakCount >= 365) badges.threeSixtyFiveDays = true;

    // Calculate weekly progress for current week based on actual streak dates
    const weeklyProgress = [false, false, false, false, false, false, false];
    
    if (streakCount > 0 && streakDates.length > 0) {
      console.log('📅 Calculating weekly progress from actual streak dates...');
      
      const today = new Date();
      const pacificToday = new Date(today.toLocaleString("en-US", {timeZone: "America/Los_Angeles"}));
      const startOfCurrentWeek = new Date(pacificToday);
      startOfCurrentWeek.setDate(pacificToday.getDate() - pacificToday.getDay()); // Start from Sunday
      
      // Check each streak date to see if it falls in the current week
      streakDates.forEach((dateString, index) => {
        const streakDateObj = new Date(dateString + 'T00:00:00-08:00');
        
        // Check if this streak date is in the current week
        const startOfStreakDateWeek = new Date(streakDateObj);
        startOfStreakDateWeek.setDate(streakDateObj.getDate() - streakDateObj.getDay());
        
        if (startOfCurrentWeek.getTime() === startOfStreakDateWeek.getTime()) {
          const dayOfWeek = streakDateObj.getDay();
          weeklyProgress[dayOfWeek] = true;
          console.log(`   Marked ${dateString} (day ${dayOfWeek}) from streak date ${index + 1}`);
        } else {
          console.log(`   Skipped ${dateString} (not in current week)`);
        }
      });
      
      const markedDays = weeklyProgress.filter(Boolean).length;
      console.log(`   Final weekly progress: ${markedDays} days marked out of ${streakCount}-day streak`);
    } else {
      console.log('📅 No streak dates available, leaving weekly progress empty');
    }

    const historicalStreakData: StreakData = {
      currentStreak: streakCount,
      lastPlayedLevel,
      lastPlayedDate,
      weeklyProgress,
      badges,
      notificationsEnabled: false, // Default to false
    };

    console.log(`Calculated historical streak: ${streakCount} days`);
    
    // Save the calculated streak data
    saveStreakData(historicalStreakData);
    
    return historicalStreakData;
  } catch (error) {
    console.error('Error calculating historical streak:', error);
    return null;
  }
}

// Initialize streak data with historical calculation if needed
export async function initializeStreakData(): Promise<StreakData> {
  console.log('🚀 Initializing streak data...');
  
  const userProfile = getUserProfile();
  if (!userProfile || !userProfile.userId || userProfile.userId === 'anonymous') {
    console.log('❌ No user profile found, using default streak data');
    return getStreakData();
  }

  console.log('👤 User profile found:', userProfile.userId);
  
  // Get current local data
  const localData = getStreakData();
  console.log('💾 Current local streak data:', localData);
  
  // Check if we've already synced with database
  if (localData.dbSyncCompleted) {
    console.log('✅ Database sync already completed, using local data');
    return localData;
  }
  
  console.log('🔄 Database sync not completed, calculating historical streak...');
  
  try {
    // Calculate streak from database records
    const dbData = await calculateHistoricalStreak();
    
    if (!dbData) {
      console.log('📥 No historical data found in database, marking sync as completed');
      // Mark sync as completed even if no database records found
      const updatedData = { ...localData, dbSyncCompleted: true };
      saveStreakData(updatedData);
      return updatedData;
    }
    
    console.log('📊 Database streak data:', dbData);
    
    // Merge database data with existing local data
    const mergedData = mergeStreakData(localData, dbData);
    console.log('🔗 Merged streak data:', mergedData);
    
    // Save the merged data
    saveStreakData(mergedData);
    
    console.log('✅ Database sync completed successfully');
    return mergedData;
    
  } catch (error) {
    console.error('❌ Error during database sync:', error);
    
    // Mark sync as completed to avoid retrying on every app load
    const updatedData = { ...localData, dbSyncCompleted: true };
    saveStreakData(updatedData);
    return updatedData;
  }
}

// Update streak with custom date (for testing)
export function updateStreakWithDate(levelId: string, isDailyLevel: boolean, customDate?: string): StreakData {
  if (!isDailyLevel) {
    return getStreakData(); // Don't update streak for non-daily levels
  }

  const currentLevel = parseInt(levelId);
  const currentDate = customDate || getPacificDateString();
  const customDateObj = customDate ? new Date(customDate + 'T00:00:00-08:00') : new Date(); // Pacific timezone
  const dayOfWeek = customDate ? customDateObj.getDay() : getPacificDayOfWeek();
  const streakData = getStreakData();

  // Check if this level/date combo was already played
  if (streakData.lastPlayedLevel === currentLevel && streakData.lastPlayedDate === currentDate) {
    // Already played, no streak update needed
    return streakData;
  }

  const yesterday = new Date(customDateObj);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayString = yesterday.toISOString().split('T')[0];

  let newStreak = 1;
  
  // Check if streak should continue
  if (streakData.lastPlayedDate === yesterdayString) {
    newStreak = streakData.currentStreak + 1;
  }

  // Update weekly progress (reset at beginning of week)
  const newWeeklyProgress = [...streakData.weeklyProgress];
  
  // Calculate the start of the current week (Sunday)
  const startOfCurrentWeek = new Date(customDateObj);
  startOfCurrentWeek.setDate(customDateObj.getDate() - customDateObj.getDay());
  startOfCurrentWeek.setHours(0, 0, 0, 0);
  
  // Calculate the start of the week when we last played
  let shouldResetWeek = false;
  if (streakData.lastPlayedDate) {
    const lastPlayedDate = new Date(streakData.lastPlayedDate + 'T00:00:00-08:00');
    const startOfLastPlayedWeek = new Date(lastPlayedDate);
    startOfLastPlayedWeek.setDate(lastPlayedDate.getDate() - lastPlayedDate.getDay());
    startOfLastPlayedWeek.setHours(0, 0, 0, 0);
    
    // If we're in a different week than when we last played, reset the progress
    shouldResetWeek = startOfCurrentWeek.getTime() !== startOfLastPlayedWeek.getTime();
  } else {
    // First time playing, start fresh
    shouldResetWeek = true;
  }
  
  if (shouldResetWeek) {
    newWeeklyProgress.fill(false);
  }
  
  // Mark all consecutive streak days that fall in the current week
  if (newStreak > 0) {
    console.log(`   Marking consecutive days for ${newStreak}-day streak in current week...`);
    
    // Build consecutive dates working backwards from the custom date
    for (let i = 0; i < newStreak; i++) {
      const streakDateObj = new Date(customDateObj);
      streakDateObj.setDate(customDateObj.getDate() - i);
      
      // Check if this streak date is in the current week
      const startOfStreakDateWeek = new Date(streakDateObj);
      startOfStreakDateWeek.setDate(streakDateObj.getDate() - streakDateObj.getDay());
      startOfStreakDateWeek.setHours(0, 0, 0, 0);
      
      if (startOfCurrentWeek.getTime() === startOfStreakDateWeek.getTime()) {
        const streakDayOfWeek = streakDateObj.getDay();
        newWeeklyProgress[streakDayOfWeek] = true;
        const streakDateString = convertUTCToPacificDateString(streakDateObj);
        console.log(`     Marked day ${i + 1}: ${streakDateString} (${streakDayOfWeek})`);
      } else {
        console.log(`     Day ${i + 1} is outside current week, stopping`);
        break;
      }
    }
    
    const markedCount = newWeeklyProgress.filter(Boolean).length;
    console.log(`   Weekly progress: ${markedCount} days marked for ${newStreak}-day streak`);
  } else {
    // No streak, mark only current day
    newWeeklyProgress[dayOfWeek] = true;
    console.log(`   Marked only current day (no streak)`);
  }

  // Update badges
  const newBadges = { ...streakData.badges };
  if (newStreak >= 3) newBadges.threeDays = true;
  if (newStreak >= 5) newBadges.fiveDays = true;
  if (newStreak >= 7) newBadges.sevenDays = true;
  if (newStreak >= 31) newBadges.thirtyOneDays = true;
  if (newStreak >= 50) newBadges.fiftyDays = true;
  if (newStreak >= 100) newBadges.oneHundredDays = true;
  if (newStreak >= 150) newBadges.oneHundredFiftyDays = true;
  if (newStreak >= 200) newBadges.twoHundredDays = true;
  if (newStreak >= 365) newBadges.threeSixtyFiveDays = true;

  const updatedData: StreakData = {
    ...streakData,
    currentStreak: newStreak,
    lastPlayedLevel: currentLevel,
    lastPlayedDate: currentDate,
    weeklyProgress: newWeeklyProgress,
    badges: newBadges,
  };

  saveStreakData(updatedData);
  return updatedData;
}

// Debug function to understand weekly progress logic
export function debugWeeklyProgress(): void {
  if (typeof window === 'undefined') return;
  
  const streakData = getStreakData();
  const now = new Date();
  const pacificTime = new Date(now.toLocaleString("en-US", {timeZone: "America/Los_Angeles"}));
  const currentDate = pacificTime.toISOString().split('T')[0];
  const dayOfWeek = pacificTime.getDay();
  
  console.log('=== WEEKLY PROGRESS DEBUG ===');
  console.log('Current Pacific date:', currentDate);
  console.log('Current day of week (0=Sun):', dayOfWeek);
  console.log('Current streak count:', streakData.currentStreak);
  console.log('Weekly progress array:', streakData.weeklyProgress);
  console.log('Last played date:', streakData.lastPlayedDate);
  console.log('Last played level:', streakData.lastPlayedLevel);
  
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const trueCount = streakData.weeklyProgress.filter(Boolean).length;
  
  console.log('\nWeekly progress breakdown:');
  streakData.weeklyProgress.forEach((completed, index) => {
    console.log(`  ${dayNames[index]}: ${completed ? '✓' : '✗'}`);
  });
  
  console.log('\nAnalysis:');
  console.log('  Days marked complete this week:', trueCount);
  console.log('  Current streak count:', streakData.currentStreak);
  console.log('  Expected match?', 'Weekly count can equal streak count if all streak days are in current week');
  console.log('  Issue detected?', trueCount > 7 ? 'YES - More than 7 days marked' : 'NO');
  
  // Check if this week has been reset properly
  const startOfWeek = new Date(pacificTime);
  startOfWeek.setDate(pacificTime.getDate() - pacificTime.getDay());
  const startOfWeekString = startOfWeek.toISOString().split('T')[0];
  
  console.log('\nWeek calculation:');
  console.log('  Start of current week (Sunday):', startOfWeekString);
  console.log('  Days into week:', dayOfWeek);
}

// Function to repair corrupted weekly progress data
export function repairWeeklyProgress(): StreakData {
  const streakData = getStreakData();
  const currentDate = getPacificDateString();
  const dayOfWeek = getPacificDayOfWeek();
  
  // If the current streak is 0 or 1, the weekly progress should only have at most 1 day marked
  if (streakData.currentStreak <= 1) {
    const newWeeklyProgress = [false, false, false, false, false, false, false];
    
    // If there's a current streak of 1 and we played today, mark today
    if (streakData.currentStreak === 1 && streakData.lastPlayedDate === currentDate) {
      newWeeklyProgress[dayOfWeek] = true;
    }
    
    const repairedData = {
      ...streakData,
      weeklyProgress: newWeeklyProgress
    };
    
    saveStreakData(repairedData);
    console.log('🔧 Repaired weekly progress for streak ≤ 1');
    return repairedData;
  }
  
  // For longer streaks, validate that weekly progress doesn't exceed 7 days
  const trueCount = streakData.weeklyProgress.filter(Boolean).length;
  if (trueCount > 7) {
    console.log(`🔧 Detected corrupted weekly progress: ${trueCount} days marked (max should be 7)`);
    
    // Reset weekly progress and only mark today if we played today
    const newWeeklyProgress = [false, false, false, false, false, false, false];
    if (streakData.lastPlayedDate === currentDate) {
      newWeeklyProgress[dayOfWeek] = true;
    }
    
    const repairedData = {
      ...streakData,
      weeklyProgress: newWeeklyProgress
    };
    
    saveStreakData(repairedData);
    console.log('🔧 Repaired corrupted weekly progress data');
    return repairedData;
  }
  
  return streakData;
}

// Validate streak data consistency
export function validateStreakData(data: StreakData): { isValid: boolean; issues: string[] } {
  const issues: string[] = [];
  const trueCount = data.weeklyProgress.filter(Boolean).length;
  
  // Check for basic consistency issues
  if (trueCount > 7) {
    issues.push(`Weekly progress has ${trueCount} days marked (max should be 7)`);
  }
  
  if (data.currentStreak > 0 && trueCount > data.currentStreak) {
    issues.push(`Weekly progress has ${trueCount} days marked but current streak is only ${data.currentStreak}`);
  }
  
  if (data.currentStreak < 0) {
    issues.push(`Current streak is negative: ${data.currentStreak}`);
  }
  
  // Check date consistency
  const currentDate = getPacificDateString();
  if (data.lastPlayedDate > currentDate) {
    issues.push(`Last played date ${data.lastPlayedDate} is in the future`);
  }
  
  return {
    isValid: issues.length === 0,
    issues
  };
}

// Force historical streak calculation (for testing/debugging)
export async function forceHistoricalStreakCalculation(): Promise<StreakData | null> {
  console.log('🔄 Forcing historical streak calculation...');
  
  const userProfile = getUserProfile();
  if (!userProfile || !userProfile.userId || userProfile.userId === 'anonymous') {
    console.log('❌ No user profile found for historical calculation');
    return null;
  }

  console.log('👤 User profile found:', userProfile);
  
  try {
    const historicalData = await calculateHistoricalStreak();
    if (historicalData) {
      console.log('✅ Historical calculation successful:', historicalData);
    } else {
      console.log('❌ Historical calculation returned null');
    }
    return historicalData;
  } catch (error) {
    console.error('❌ Historical calculation failed:', error);
    return null;
  }
}

// Merge database streak data with existing local data (for migration)
function mergeStreakData(localData: StreakData, dbData: StreakData): StreakData {
  // Use the higher streak count
  const currentStreak = Math.max(localData.currentStreak, dbData.currentStreak);
  
  // Use the more recent last played date
  let lastPlayedLevel = localData.lastPlayedLevel;
  let lastPlayedDate = localData.lastPlayedDate;
  
  if (dbData.lastPlayedDate && (!localData.lastPlayedDate || dbData.lastPlayedDate > localData.lastPlayedDate)) {
    lastPlayedLevel = dbData.lastPlayedLevel;
    lastPlayedDate = dbData.lastPlayedDate;
  }
  
  // Merge badges (keep any earned badges from either source)
  const badges = {
    threeDays: localData.badges.threeDays || dbData.badges.threeDays,
    fiveDays: localData.badges.fiveDays || dbData.badges.fiveDays,
    sevenDays: localData.badges.sevenDays || dbData.badges.sevenDays,
    thirtyOneDays: localData.badges.thirtyOneDays || dbData.badges.thirtyOneDays,
    fiftyDays: localData.badges.fiftyDays || dbData.badges.fiftyDays,
    oneHundredDays: localData.badges.oneHundredDays || dbData.badges.oneHundredDays,
    oneHundredFiftyDays: localData.badges.oneHundredFiftyDays || dbData.badges.oneHundredFiftyDays,
    twoHundredDays: localData.badges.twoHundredDays || dbData.badges.twoHundredDays,
    threeSixtyFiveDays: localData.badges.threeSixtyFiveDays || dbData.badges.threeSixtyFiveDays,
  };
  
  // Recalculate badges based on the final streak count
  if (currentStreak >= 3) badges.threeDays = true;
  if (currentStreak >= 5) badges.fiveDays = true;
  if (currentStreak >= 7) badges.sevenDays = true;
  if (currentStreak >= 31) badges.thirtyOneDays = true;
  if (currentStreak >= 50) badges.fiftyDays = true;
  if (currentStreak >= 100) badges.oneHundredDays = true;
  if (currentStreak >= 150) badges.oneHundredFiftyDays = true;
  if (currentStreak >= 200) badges.twoHundredDays = true;
  if (currentStreak >= 365) badges.threeSixtyFiveDays = true;
  
  // Calculate proper weekly progress based on merged data
  let weeklyProgress: boolean[];
  
  console.log('🔄 Calculating weekly progress for merged data...');
  console.log(`   Final streak: ${currentStreak}, final last played: ${lastPlayedDate}`);
  
  // Always recalculate weekly progress based on actual consecutive dates
  weeklyProgress = [false, false, false, false, false, false, false];
  
  if (currentStreak > 0 && lastPlayedDate) {
    const today = new Date();
    const pacificToday = new Date(today.toLocaleString("en-US", {timeZone: "America/Los_Angeles"}));
    const startOfCurrentWeek = new Date(pacificToday);
    startOfCurrentWeek.setDate(pacificToday.getDate() - pacificToday.getDay()); // Start from Sunday
    
    const lastPlayedDateObj = new Date(lastPlayedDate + 'T00:00:00-08:00');
    
    // Build actual consecutive streak dates working backwards from last played date
    const consecutiveDates: string[] = [];
    for (let i = 0; i < currentStreak; i++) {
      const streakDate = new Date(lastPlayedDateObj);
      streakDate.setDate(lastPlayedDateObj.getDate() - i);
      const dateString = convertUTCToPacificDateString(streakDate);
      consecutiveDates.push(dateString);
    }
    
    console.log(`   Consecutive streak dates: [${consecutiveDates.join(', ')}]`);
    
    // Mark each consecutive date that falls in the current week
    consecutiveDates.forEach((dateString, index) => {
      const streakDateObj = new Date(dateString + 'T00:00:00-08:00');
      
      // Check if this streak date is in the current week
      const startOfStreakDateWeek = new Date(streakDateObj);
      startOfStreakDateWeek.setDate(streakDateObj.getDate() - streakDateObj.getDay());
      
      if (startOfCurrentWeek.getTime() === startOfStreakDateWeek.getTime()) {
        const dayOfWeek = streakDateObj.getDay();
        weeklyProgress[dayOfWeek] = true;
        console.log(`   Marked ${dateString} (day ${dayOfWeek}) from consecutive streak day ${index + 1}`);
      } else {
        console.log(`   Skipped ${dateString} (not in current week)`);
      }
    });
  }
  
  const weeklyTrueCount = weeklyProgress.filter(Boolean).length;
  console.log(`🔄 Calculated weekly progress: ${weeklyTrueCount} days marked for streak of ${currentStreak}`);
  
  // Final validation - only auto-correct if there's a clear impossibility (more than 7 days in a week)
  // Weekly progress can equal streak count if all streak days fall in the current week
  if (weeklyTrueCount > 7) {
    console.log('🔧 Auto-repairing weekly progress during merge - final cleanup');
    console.log(`   Issue: ${weeklyTrueCount} days marked (max should be 7)`);
    
    // Reset weekly progress and only mark today if we played today
    const currentDate = getPacificDateString();
    const dayOfWeek = getPacificDayOfWeek();
    weeklyProgress = [false, false, false, false, false, false, false];
    
    if (lastPlayedDate === currentDate && currentStreak > 0) {
      weeklyProgress[dayOfWeek] = true;
      console.log(`   Marked today (${dayOfWeek}) as completed since last played date matches today`);
    }
  }
  
  // Keep local preferences but use merged streak data
  return {
    currentStreak,
    lastPlayedLevel,
    lastPlayedDate,
    weeklyProgress,
    badges,
    notificationsEnabled: localData.notificationsEnabled,
    dbSyncCompleted: true,
  };
}

// Helper function to convert UTC timestamp to Pacific Time date string
function convertUTCToPacificDateString(utcDate: Date): string {
  // Use Intl.DateTimeFormat for reliable timezone conversion
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Los_Angeles',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
  
  // This returns YYYY-MM-DD format
  return formatter.format(utcDate);
}

// Retroactively fix weekly progress for existing streaks (for migration/repair)
export function recalculateWeeklyProgress(): StreakData {
  console.log('🔧 Recalculating weekly progress for existing streak...');
  
  const streakData = getStreakData();
  
  // If no streak or already has properly calculated weekly progress, no need to fix
  if (streakData.currentStreak === 0) {
    console.log('   No active streak, nothing to recalculate');
    return streakData;
  }
  
  const trueCount = streakData.weeklyProgress.filter(Boolean).length;
  if (streakData.currentStreak > 0 && trueCount === 0) {
    console.log(`   Detected issue: ${streakData.currentStreak}-day streak with 0 days marked in weekly progress`);
  } else if (streakData.currentStreak > 1 && trueCount === 1) {
    console.log(`   Detected issue: ${streakData.currentStreak}-day streak with only 1 day marked in weekly progress`);
  } else {
    console.log(`   Weekly progress appears correct: ${streakData.currentStreak} streak, ${trueCount} days marked`);
    return streakData;
  }
  
  // Recalculate weekly progress based on consecutive dates
  // Calculate the start of the current week (Sunday)
  const now = new Date();
  const pacificTime = new Date(now.toLocaleString("en-US", {timeZone: "America/Los_Angeles"}));
  const startOfCurrentWeek = new Date(pacificTime);
  startOfCurrentWeek.setDate(pacificTime.getDate() - pacificTime.getDay());
  startOfCurrentWeek.setHours(0, 0, 0, 0);
  
  // Build new weekly progress by marking consecutive streak days that fall in current week
  const newWeeklyProgress = [false, false, false, false, false, false, false];
  
  if (streakData.lastPlayedDate && streakData.currentStreak > 0) {
    console.log(`   Calculating consecutive days for ${streakData.currentStreak}-day streak ending on ${streakData.lastPlayedDate}`);
    
    // Build consecutive dates working backwards from last played date
    const lastPlayedDateObj = new Date(streakData.lastPlayedDate + 'T00:00:00-08:00');
    for (let i = 0; i < streakData.currentStreak; i++) {
      const streakDateObj = new Date(lastPlayedDateObj);
      streakDateObj.setDate(lastPlayedDateObj.getDate() - i);
      
      // Check if this streak date is in the current week
      const startOfStreakDateWeek = new Date(streakDateObj);
      startOfStreakDateWeek.setDate(streakDateObj.getDate() - streakDateObj.getDay());
      startOfStreakDateWeek.setHours(0, 0, 0, 0);
      
      if (startOfCurrentWeek.getTime() === startOfStreakDateWeek.getTime()) {
        const streakDayOfWeek = streakDateObj.getDay();
        newWeeklyProgress[streakDayOfWeek] = true;
        const streakDateString = convertUTCToPacificDateString(streakDateObj);
        console.log(`     Marked day ${i + 1}: ${streakDateString} (${streakDayOfWeek})`);
      } else {
        console.log(`     Day ${i + 1} is outside current week, stopping`);
        break;
      }
    }
  }
  
  const markedCount = newWeeklyProgress.filter(Boolean).length;
  console.log(`   Recalculated weekly progress: ${markedCount} days marked for ${streakData.currentStreak}-day streak`);
  
  const repairedData = {
    ...streakData,
    weeklyProgress: newWeeklyProgress
  };
  
  saveStreakData(repairedData);
  console.log('✅ Weekly progress recalculation complete');
  return repairedData;
}
