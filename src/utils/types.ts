export interface Level {
  size: number;
  colorRegions: string[][];
  regionColors: { [key: string]: string };
  isNew?: boolean;
}

export interface BonusLevel {
  path: string;
  size: number;
  colorRegions: string[][];
  regionColors: { [key: string]: string };
  isNew?: boolean;
}

export interface CommunityLevel {
  path: string;
  size: number;
  colorRegions: string[][];
  regionColors: { [key: string]: string };
  solutionsCount: number;
  createdBy: string;
  creatorLink?: string;
}

export interface TestLevel {
  size: number;
  colorRegions: string[][];
  regionColors: { [key: string]: string };
}

export interface LevelCompletionTime {
  id: string;
  time: number;
  timestamp: number;
  levelType: string;
  userId?: string;
  username?: string;
  avatar?: string;
}

export interface UserProfile {
  userId: string;
  username: string;
  avatar: string;
}