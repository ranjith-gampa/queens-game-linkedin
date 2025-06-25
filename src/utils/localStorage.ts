export const markLevelAsCompleted = (levelNumber: number) => {
  const completedLevels =
    JSON.parse(localStorage.getItem("completedLevels") as string) || [];

  if (!completedLevels.includes(levelNumber)) {
    completedLevels.push(levelNumber);
    localStorage.setItem("completedLevels", JSON.stringify(completedLevels));
  }
};

export const markBonusLevelAsCompleted = (levelId: string) => {
  const completedLevels =
    JSON.parse(localStorage.getItem("completedBonusLevels") as string) || [];

  if (!completedLevels.includes(levelId)) {
    completedLevels.push(levelId);
    localStorage.setItem(
      "completedBonusLevels",
      JSON.stringify(completedLevels)
    );
  }
};

export const markCommunityLevelAsCompleted = (levelId: string) => {
  const completedLevels =
    JSON.parse(localStorage.getItem("completedCommunityLevels") as string) ||
    [];

  if (!completedLevels.includes(levelId)) {
    completedLevels.push(levelId);
    localStorage.setItem(
      "completedCommunityLevels",
      JSON.stringify(completedLevels)
    );
  }
};

export const isLevelCompleted = (levelNumber: number) => {
  const completedLevels =
    JSON.parse(localStorage.getItem("completedLevels") as string) || [];
  return completedLevels.includes(levelNumber);
};

export const isBonusLevelCompleted = (levelId: string) => {
  const completedLevels =
    JSON.parse(localStorage.getItem("completedBonusLevels") as string) || [];
  return completedLevels.includes(levelId);
};

export const isCommunityLevelCompleted = (levelId: string) => {
  const completedLevels =
    JSON.parse(localStorage.getItem("completedCommunityLevels") as string) ||
    [];
  return completedLevels.includes(levelId);
};

export const resetCompletedLevels = () => {
  localStorage.setItem("completedLevels", JSON.stringify([]));
};

export const setClashingQueensPreference = (enabled: boolean) => {
  localStorage.setItem("clashingQueensEnabled", JSON.stringify(enabled));
};

export const getClashingQueensPreference = () => {
  return (
    JSON.parse(localStorage.getItem("clashingQueensEnabled") as string) ?? true
  ); // Default to true
};

export const setShowInstructionsPreference = (enabled: boolean) => {
  localStorage.setItem("showInstructions", JSON.stringify(enabled));
};

export const getShowInstructionsPreference = () => {
  return JSON.parse(localStorage.getItem("showInstructions") as string) ?? true; // Default to true
};

export const setShowClockPreference = (enabled: boolean) => {
  localStorage.setItem("showClock", JSON.stringify(enabled));
};

export const getShowClockPreference = () => {
  return JSON.parse(localStorage.getItem("showClock") as string) ?? true; // Default to true
};

export const setAutoPlaceXsPreference = (enabled: boolean) => {
  localStorage.setItem("autoPlaceXs", JSON.stringify(enabled));
};

export const getAutoPlaceXsPreference = () => {
  return JSON.parse(localStorage.getItem("autoPlaceXs") as string) ?? false; // Default to false
};

export const setGroupingPreference = (enabled: boolean) => {
  localStorage.setItem("groupBySize", JSON.stringify(enabled));
};

export const getGroupingPreference = () => {
  return JSON.parse(localStorage.getItem("groupBySize") as string) ?? false; // Default to false
};

export const setBonusLevelsClicked = (clicked: boolean) => {
  localStorage.setItem("bonusLevelsClicked", JSON.stringify(clicked));
};

export const getBonusLevelsClicked = () => {
  return (
    JSON.parse(localStorage.getItem("bonusLevelsClicked") as string) ?? false
  ); // Default to false
};

export const setCommunityLevelsClicked = (clicked: boolean) => {
  localStorage.setItem("communityLevelsClicked", JSON.stringify(clicked));
};

export const getCommunityLevelsClicked = () => {
  return (
    JSON.parse(localStorage.getItem("communityLevelsClicked") as string) ??
    false
  ); // Default to false
};

export const setHideCompletedLevelsPreference = (enabled: boolean) => {
  localStorage.setItem("hideCompletedLevels", JSON.stringify(enabled));
};

export const getHideCompletedLevelsPreference = () => {
  return (
    JSON.parse(localStorage.getItem("hideCompletedLevels") as string) ?? false
  ); // Default to false
};

export const setShowUniqueCommunityLevelsPreference = (enabled: boolean) => {
  localStorage.setItem("showUniqueCommunityLevels", JSON.stringify(enabled));
};

export const getShowUniqueCommunityLevelsPreference = () => {
  return (
    JSON.parse(localStorage.getItem("showUniqueCommunityLevels") as string) ??
    false
  ); // Default to false
};

export const setShowMultipleCommunityLevelsPreference = (enabled: boolean) => {
  localStorage.setItem("showMultipleCommunityLevels", JSON.stringify(enabled));
};

export const getShowMultipleCommunityLevelsPreference = () => {
  return (
    JSON.parse(localStorage.getItem("showMultipleCommunityLevels") as string) ??
    false
  ); // Default to false
};

export const setShowCompletedCommunityLevelsPreference = (enabled: boolean) => {
  localStorage.setItem("showCompletedCommunityLevels", JSON.stringify(enabled));
};

export const getShowCompletedCommunityLevelsPreference = () => {
  return (
    JSON.parse(
      localStorage.getItem("showCompletedCommunityLevels") as string
    ) ?? false
  ); // Default to false
};

export const setShowNotCompletedCommunityLevelsPreference = (
  enabled: boolean
) => {
  localStorage.setItem(
    "showNotCompletedCommunityLevels",
    JSON.stringify(enabled)
  );
};

export const getShowNotCompletedCommunityLevelsPreference = () => {
  return (
    JSON.parse(
      localStorage.getItem("showNotCompletedCommunityLevels") as string
    ) ?? false
  ); // Default to false
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
  const stringId = id.toString();
  const timeSeconds = Math.floor(time);
  const completionTimes: LevelCompletionTime[] =
    JSON.parse(localStorage.getItem(LEVEL_COMPLETION_TIMES_KEY) as string) || [];

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
  const stringId = id.toString();
  const completionTimes: LevelCompletionTime[] =
    JSON.parse(localStorage.getItem(LEVEL_COMPLETION_TIMES_KEY) as string) || [];

  return completionTimes
    .filter(
      (entry) => entry.id === stringId && entry.levelType === levelType
    )
    .sort((a, b) => a.time - b.time); // Sort from fastest to slowest
};

export const getAllLevelCompletionTimes = (): LevelCompletionTime[] => {
  return (
    JSON.parse(localStorage.getItem(LEVEL_COMPLETION_TIMES_KEY) as string) || []
  );
};

export const getUserProfile = (): UserProfile | null => {
  const profileData = localStorage.getItem(USER_PROFILE_KEY);
  return profileData ? JSON.parse(profileData) as UserProfile : null;
};

export const setUserProfile = (profile: UserProfile): void => {
  localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile));
};

export const hasUserProfile = (): boolean => {
  return localStorage.getItem(USER_PROFILE_KEY) !== null;
};