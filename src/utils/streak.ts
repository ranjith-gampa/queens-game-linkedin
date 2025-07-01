import { getDailyLevelNumber } from './getDailyLevel';

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
}

const STREAK_KEY = 'queensGameStreak';

// Helper function to get current Pacific time date string
export function getPacificDateString(): string {
  const now = new Date();
  const pacificTime = new Date(now.toLocaleString("en-US", {timeZone: "America/Los_Angeles"}));
  return pacificTime.toISOString().split('T')[0]; // YYYY-MM-DD format
}

// Helper function to get day of week (0 = Sunday, 1 = Monday, etc.)
export function getPacificDayOfWeek(): number {
  const now = new Date();
  const pacificTime = new Date(now.toLocaleString("en-US", {timeZone: "America/Los_Angeles"}));
  return pacificTime.getDay();
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
  };

  if (typeof window === 'undefined') {
    return defaultData;
  }

  const stored = localStorage.getItem(STREAK_KEY);

  if (!stored) {
    return defaultData;
  }

  try {
    return { ...defaultData, ...JSON.parse(stored) };
  } catch {
    return defaultData;
  }
}

// Save streak data
export function saveStreakData(data: StreakData): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STREAK_KEY, JSON.stringify(data));
  }
}

// Update streak when daily level is completed
export function updateStreakOnLevelCompletion(): StreakData {
  const currentLevel = getDailyLevelNumber();
  const currentDate = getPacificDateString();
  const dayOfWeek = getPacificDayOfWeek();
  const streakData = getStreakData();

  // Check if this is today's level
  if (streakData.lastPlayedLevel === currentLevel && streakData.lastPlayedDate === currentDate) {
    // Already played today, no streak update needed
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
  
  // Check if it's a new week (Sunday = 0)
  if (dayOfWeek === 0 && streakData.lastPlayedDate !== currentDate) {
    newWeeklyProgress.fill(false);
  }
  
  // Mark current day as completed
  newWeeklyProgress[dayOfWeek] = true;

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
export function updateStreak(levelId: string, isDailyLevel: boolean): StreakData {
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
  };
  
  saveStreakData(defaultData);
}
