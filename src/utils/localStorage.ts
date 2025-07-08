// Helper function to safely parse localStorage values
export const safeParseLocalStorage = (key: string, defaultValue: any = null) => {
  if (typeof window === 'undefined') return defaultValue;
  const value = localStorage.getItem(key);
  if (!value || value === 'undefined' || value === 'null') return defaultValue;
  try {
    return JSON.parse(value);
  } catch {
    return defaultValue;
  }
};

/**
 * Set a setting in localStorage and sync to database
 */
async function setSettingWithSync(key: string, value: any): Promise<void> {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
    
    // Import dynamically to avoid circular dependency
    try {
      const { syncSettingToDatabase } = await import('./database');
      await syncSettingToDatabase(key, value);
    } catch (error) {
      console.warn('Failed to sync setting to database:', error);
    }
  }
}

// Function to clean up corrupted localStorage entries
export const cleanupCorruptedLocalStorage = () => {
  if (typeof window === 'undefined') return;
  
  const keysToCheck = [
    'bonusLevelsClicked',
    'communityLevelsClicked', 
    'clashingQueensEnabled',
    'showInstructions',
    'showClock',
    'autoPlaceXs',
    'groupBySize',
    'hideCompletedLevels'
  ];
  
  keysToCheck.forEach(key => {
    const value = localStorage.getItem(key);
    if (value === 'undefined' || value === 'null') {
      localStorage.removeItem(key);
    }
  });
};

export const markLevelAsCompleted = (levelNumber: number) => {
  if (typeof window === 'undefined') return;
  const completedLevels = safeParseLocalStorage("completedLevels", []);

  if (!completedLevels.includes(levelNumber)) {
    completedLevels.push(levelNumber);
    localStorage.setItem("completedLevels", JSON.stringify(completedLevels));
  }
};

export const markBonusLevelAsCompleted = (levelId: string) => {
  if (typeof window === 'undefined') return;
  const completedLevels = safeParseLocalStorage("completedBonusLevels", []);

  if (!completedLevels.includes(levelId)) {
    completedLevels.push(levelId);
    localStorage.setItem(
      "completedBonusLevels",
      JSON.stringify(completedLevels)
    );
  }
};

export const markCommunityLevelAsCompleted = (levelId: string) => {
  if (typeof window === 'undefined') return;
  const completedLevels = safeParseLocalStorage("completedCommunityLevels", []);

  if (!completedLevels.includes(levelId)) {
    completedLevels.push(levelId);
    localStorage.setItem(
      "completedCommunityLevels",
      JSON.stringify(completedLevels)
    );
  }
};

export const isLevelCompleted = (levelNumber: number) => {
  if (typeof window === 'undefined') return false;
  const completedLevels = safeParseLocalStorage("completedLevels", []);
  return completedLevels.includes(levelNumber);
};

export const isBonusLevelCompleted = (levelId: string) => {
  if (typeof window === 'undefined') return false;
  const completedLevels = safeParseLocalStorage("completedBonusLevels", []);
  return completedLevels.includes(levelId);
};

export const isCommunityLevelCompleted = (levelId: string) => {
  if (typeof window === 'undefined') return false;
  const completedLevels = safeParseLocalStorage("completedCommunityLevels", []);
  return completedLevels.includes(levelId);
};

export const resetCompletedLevels = () => {
  if (typeof window !== 'undefined') {
    localStorage.setItem("completedLevels", JSON.stringify([]));
  }
};

export const setClashingQueensPreference = async (enabled: boolean) => {
  await setSettingWithSync("clashingQueensEnabled", enabled);
};

export const getClashingQueensPreference = () => {
  if (typeof window === 'undefined') return true;
  return safeParseLocalStorage("clashingQueensEnabled", true);
};

export const setShowInstructionsPreference = async (enabled: boolean) => {
  await setSettingWithSync("showInstructions", enabled);
};

export const getShowInstructionsPreference = () => {
  if (typeof window === 'undefined') return true;
  return safeParseLocalStorage("showInstructions", true);
};

export const setShowClockPreference = async (enabled: boolean) => {
  await setSettingWithSync("showClock", enabled);
};

export const getShowClockPreference = () => {
  if (typeof window === 'undefined') return true;
  return safeParseLocalStorage("showClock", true); // Default to true
};

export const setAutoPlaceXsPreference = async (enabled: boolean) => {
  await setSettingWithSync("autoPlaceXs", enabled);
};

export const getAutoPlaceXsPreference = () => {
  if (typeof window === 'undefined') return false;
  return safeParseLocalStorage("autoPlaceXs", false); // Default to false
};

export const setGroupingPreference = async (enabled: boolean) => {
  await setSettingWithSync("groupBySize", enabled);
};

export const getGroupingPreference = () => {
  if (typeof window === 'undefined') return false;
  return safeParseLocalStorage("groupBySize", false); // Default to false
};

export const setBonusLevelsClicked = (clicked: boolean) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem("bonusLevelsClicked", JSON.stringify(clicked));
  }
};

export const getBonusLevelsClicked = () => {
  if (typeof window === 'undefined') return false;
  return safeParseLocalStorage("bonusLevelsClicked", false); // Default to false
};

export const setCommunityLevelsClicked = (clicked: boolean) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem("communityLevelsClicked", JSON.stringify(clicked));
  }
};

export const getCommunityLevelsClicked = () => {
  if (typeof window === 'undefined') return false;
  return safeParseLocalStorage("communityLevelsClicked", false); // Default to false
};

export const setHideCompletedLevelsPreference = (enabled: boolean) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem("hideCompletedLevels", JSON.stringify(enabled));
  }
};

export const getHideCompletedLevelsPreference = () => {
  if (typeof window === 'undefined') return false;
  return safeParseLocalStorage("hideCompletedLevels", false); // Default to false
};

export const setShowUniqueCommunityLevelsPreference = (enabled: boolean) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem("showUniqueCommunityLevels", JSON.stringify(enabled));
  }
};

export const getShowUniqueCommunityLevelsPreference = () => {
  if (typeof window === 'undefined') return false;
  return safeParseLocalStorage("showUniqueCommunityLevels", false); // Default to false
};

export const setShowMultipleCommunityLevelsPreference = (enabled: boolean) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem("showMultipleCommunityLevels", JSON.stringify(enabled));
  }
};

export const getShowMultipleCommunityLevelsPreference = () => {
  if (typeof window === 'undefined') return false;
  return safeParseLocalStorage("showMultipleCommunityLevels", false); // Default to false
};

export const setShowCompletedCommunityLevelsPreference = (enabled: boolean) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem("showCompletedCommunityLevels", JSON.stringify(enabled));
  }
};

export const getShowCompletedCommunityLevelsPreference = () => {
  if (typeof window === 'undefined') return false;
  return safeParseLocalStorage("showCompletedCommunityLevels", false); // Default to false
};

export const setShowNotCompletedCommunityLevelsPreference = (
  enabled: boolean
) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(
      "showNotCompletedCommunityLevels",
      JSON.stringify(enabled)
    );
  }
};

export const getShowNotCompletedCommunityLevelsPreference = () => {
  if (typeof window === 'undefined') return false;
  return safeParseLocalStorage("showNotCompletedCommunityLevels", false); // Default to false
};

import { LevelCompletionTime, UserProfile } from "./types";
import { saveLeaderboardEntry } from './database';

const LEVEL_COMPLETION_TIMES_KEY = "levelCompletionTimes";
const USER_PROFILE_KEY = "userProfile";

export const getPreviousFastestTime = (
  id: string | number,
  levelType: string
): number | null => {
  const times = getLevelCompletionTimes(id, levelType);
  return times.length > 0 ? times[0].time : null;
};

export const saveLevelCompletionTime = async (
  id: string | number,
  time: number,
  levelType: string
): Promise<{ isFastest: boolean; previousFastestTime: number | null }> => {
  if (typeof window === 'undefined') {
    return { isFastest: false, previousFastestTime: null };
  }
  
  const stringId = id.toString();
  const timeSeconds = Math.floor(time);
  const completionTimes: LevelCompletionTime[] = safeParseLocalStorage(LEVEL_COMPLETION_TIMES_KEY, []);

  const userProfile = getUserProfile();

  // Mark level as completed based on level type
  if (levelType === "regular") {
    markLevelAsCompleted(Number(id));
  } else if (levelType === "bonus") {
    markBonusLevelAsCompleted(stringId);
  } else if (levelType === "community") {
    markCommunityLevelAsCompleted(stringId);
  }

  // Save to local storage first
  const existingTimes = completionTimes.filter(
    entry => entry.id === stringId && entry.levelType === levelType
  );

  let isFastest = false;
  let previousFastestTime: number | null = null;

  // Include user information
  const newTimeEntry: LevelCompletionTime = {
    id: stringId,
    time,
    timestamp: Date.now(),
    levelType,
    userId: userProfile?.userId || 'anonymous',
    username: userProfile?.username || 'Anonymous',
    avatar: userProfile?.avatar || '👤'
  };

  // Check if this is a new fastest time
  if (existingTimes.length > 0) {
    const fastestTimeEntry = existingTimes.reduce(
      (fastest, current) => (current.time < fastest.time ? current : fastest),
      existingTimes[0]
    );

    previousFastestTime = fastestTimeEntry.time;

    if (time < fastestTimeEntry.time) {
      isFastest = true;
      // Update local storage with new fastest time
      const updatedTimes = completionTimes.filter(
        entry => !(entry.id === stringId && entry.levelType === levelType)
      );
      updatedTimes.push(newTimeEntry);
      localStorage.setItem(LEVEL_COMPLETION_TIMES_KEY, JSON.stringify(updatedTimes));
    }
  } else {
    isFastest = true;
    completionTimes.push(newTimeEntry);
    localStorage.setItem(LEVEL_COMPLETION_TIMES_KEY, JSON.stringify(completionTimes));
  }

  // Save to database if this is a fastest time
  if (isFastest) {
    try {
      const addedToLeaderboard = await saveLeaderboardEntry(
        userProfile?.userId || 'anonymous',
        userProfile?.username || 'Anonymous',
        userProfile?.avatar || '👤',
        stringId,
        timeSeconds,
        levelType
      );
      console.log('Saved to database:', addedToLeaderboard);
    } catch (error) {
      console.error('Failed to save to database:', error);
      // Continue since we still have local storage backup
    }
  }

  return { isFastest, previousFastestTime };
};

export const getLevelCompletionTimes = (
  id: string | number,
  levelType: string
): LevelCompletionTime[] => {
  if (typeof window === 'undefined') return [];
  const stringId = id.toString();
  const completionTimes: LevelCompletionTime[] = safeParseLocalStorage(LEVEL_COMPLETION_TIMES_KEY, []);

  return completionTimes
    .filter(
      (entry) => entry.id === stringId && entry.levelType === levelType
    )
    .sort((a, b) => a.time - b.time); // Sort from fastest to slowest
};

export const getAllLevelCompletionTimes = (): LevelCompletionTime[] => {
  if (typeof window === 'undefined') return [];
  return safeParseLocalStorage(LEVEL_COMPLETION_TIMES_KEY, []);
};

export const getUserProfile = (): UserProfile | null => {
  if (typeof window === 'undefined') return null;
  return safeParseLocalStorage(USER_PROFILE_KEY, null);
};

export const setUserProfile = (profile: UserProfile): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile));
  }
};

export const hasUserProfile = (): boolean => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(USER_PROFILE_KEY) !== null;
};

// PWA Settings
const PWA_INSTALL_BANNER_ENABLED_KEY = "pwaInstallBannerEnabled";
const PWA_OFFLINE_SUPPORT_ENABLED_KEY = "pwaOfflineSupportEnabled";

export const getPWAInstallBannerPreference = (): boolean => {
  if (typeof window === 'undefined') return true;
  const preference = localStorage.getItem(PWA_INSTALL_BANNER_ENABLED_KEY);
  return preference === null ? true : preference === 'true'; // Default to true (enabled)
};

export const setPWAInstallBannerPreference = async (enabled: boolean): Promise<void> => {
  await setSettingWithSync(PWA_INSTALL_BANNER_ENABLED_KEY, enabled);
};

export const getPWAOfflineSupportPreference = (): boolean => {
  if (typeof window === 'undefined') return false;
  const preference = localStorage.getItem(PWA_OFFLINE_SUPPORT_ENABLED_KEY);
  return preference === null ? false : preference === 'true'; // Default to false (disabled)
};

export const setPWAOfflineSupportPreference = async (enabled: boolean): Promise<void> => {
  await setSettingWithSync(PWA_OFFLINE_SUPPORT_ENABLED_KEY, enabled);
};

export const clearPWAInstallBannerDismissal = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem("installBannerDismissedAt");
  }
};