// Multi-device sync utilities for Queens Game
import { UserProfile, LevelCompletionTime } from './types';
import { StreakData, getStreakData, saveStreakData } from './streak';
import { uploadUserProfile, downloadUserProfile } from './database';
import { 
  getUserProfile, 
  setUserProfile, 
  getAllLevelCompletionTimes,
  safeParseLocalStorage
} from './localStorage';

// Extended user profile for remote data
export interface RemoteUserData {
  userId: string;
  username: string;
  avatar: string;
  completedLevels: number[];
  completedBonusLevels: string[];
  completedCommunityLevels: string[];
  levelCompletionTimes: LevelCompletionTime[];
  streakData: StreakData;
  settings: UserSettings;
  lastSyncTimestamp: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserSettings {
  theme: string;
  language: string;
  clashingQueensEnabled: boolean;
  showInstructions: boolean;
  showClock: boolean;
  autoPlaceXs: boolean;
  groupBySize: boolean;
  hideCompletedLevels: boolean;
  showUniqueCommunityLevels: boolean;
  showMultipleCommunityLevels: boolean;
  showCompletedCommunityLevels: boolean;
  showNotCompletedCommunityLevels: boolean;
  pwaInstallBannerEnabled: boolean;
  pwaOfflineSupportEnabled: boolean;
  bonusLevelsClicked: boolean;
  communityLevelsClicked: boolean;
}

export interface SyncResult {
  success: boolean;
  action: 'uploaded' | 'downloaded' | 'merged' | 'conflict' | 'no_action';
  message: string;
  conflictReason?: string;
}

class MultiDeviceSync {
  private static instance: MultiDeviceSync;

  static getInstance(): MultiDeviceSync {
    if (!MultiDeviceSync.instance) {
      MultiDeviceSync.instance = new MultiDeviceSync();
    }
    return MultiDeviceSync.instance;
  }

  // Get user data from remote database
  async getRemoteUserData(userId: string): Promise<RemoteUserData | null> {
    try {
      const result = await downloadUserProfile(userId);
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to download user profile');
      }

      if (!result.data) {
        return null;
      }

      return this.mapToRemoteUserData(result.data);
    } catch (error) {
      console.error('Error fetching remote user data:', error);
      throw error;
    }
  }

  // Upload user data to remote database
  async uploadUserData(userData: RemoteUserData): Promise<boolean> {
    try {
      const result = await uploadUserProfile({
        userId: userData.userId,
        username: userData.username,
        avatar: userData.avatar,
        completedLevels: userData.completedLevels,
        completionTimes: userData.levelCompletionTimes,
        currentStreak: userData.streakData.currentStreak,
        maxStreak: userData.streakData.currentStreak, // Use current streak as max for now
        lastPlayedLevel: userData.streakData.lastPlayedLevel,
        lastActivityDate: userData.streakData.lastPlayedDate,
        streakStartDate: userData.streakData.lastPlayedDate, // Use last played as start for now
        settings: userData.settings
      });

      if (!result.success) {
        throw new Error(result.error || 'Failed to upload user profile');
      }

      return true;
    } catch (error) {
      console.error('Error uploading user data:', error);
      throw error;
    }
  }

  // Get current local data
  getLocalUserData(): RemoteUserData | null {
    const userProfile = getUserProfile();
    if (!userProfile) return null;

    const completedLevels = this.getCompletedLevels();
    const completedBonusLevels = this.getCompletedBonusLevels();
    const completedCommunityLevels = this.getCompletedCommunityLevels();
    const levelCompletionTimes = getAllLevelCompletionTimes();
    const streakData = getStreakData();
    const settings = this.getCurrentSettings();

    return {
      userId: userProfile.userId,
      username: userProfile.username,
      avatar: userProfile.avatar,
      completedLevels,
      completedBonusLevels,
      completedCommunityLevels,
      levelCompletionTimes,
      streakData,
      settings,
      lastSyncTimestamp: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }

  // Apply remote data to local storage
  applyRemoteDataToLocal(remoteData: RemoteUserData): void {
    // Update user profile
    const userProfile: UserProfile = {
      userId: remoteData.userId,
      username: remoteData.username,
      avatar: remoteData.avatar
    };
    setUserProfile(userProfile);

    // Update completed levels
    this.setCompletedLevels(remoteData.completedLevels);
    this.setCompletedBonusLevels(remoteData.completedBonusLevels);
    this.setCompletedCommunityLevels(remoteData.completedCommunityLevels);

    // Update level completion times
    this.setLevelCompletionTimes(remoteData.levelCompletionTimes);

    // Update streak data
    saveStreakData(remoteData.streakData);

    // Update settings
    this.applySettings(remoteData.settings);

    // Set sync timestamp
    localStorage.setItem('lastSyncTimestamp', remoteData.lastSyncTimestamp.toString());
  }

  // Merge local and remote data
  mergeUserData(localData: RemoteUserData, remoteData: RemoteUserData): RemoteUserData {
    // Use more recent timestamp to determine priority
    const useRemote = remoteData.lastSyncTimestamp > localData.lastSyncTimestamp;

    // Merge completed levels (union of both)
    const mergedCompletedLevels = Array.from(new Set([
      ...localData.completedLevels,
      ...remoteData.completedLevels
    ])).sort((a, b) => a - b);

    const mergedCompletedBonusLevels = Array.from(new Set([
      ...localData.completedBonusLevels,
      ...remoteData.completedBonusLevels
    ])).sort();

    const mergedCompletedCommunityLevels = Array.from(new Set([
      ...localData.completedCommunityLevels,
      ...remoteData.completedCommunityLevels
    ])).sort();

    // Merge completion times (keep fastest times per level)
    const mergedCompletionTimes = this.mergeLevelCompletionTimes(
      localData.levelCompletionTimes,
      remoteData.levelCompletionTimes
    );

    // Merge streak data (use higher streak and more badges)
    const mergedStreakData = this.mergeStreakData(
      localData.streakData,
      remoteData.streakData
    );

    return {
      userId: localData.userId,
      username: useRemote ? remoteData.username : localData.username,
      avatar: useRemote ? remoteData.avatar : localData.avatar,
      completedLevels: mergedCompletedLevels,
      completedBonusLevels: mergedCompletedBonusLevels,
      completedCommunityLevels: mergedCompletedCommunityLevels,
      levelCompletionTimes: mergedCompletionTimes,
      streakData: mergedStreakData,
      settings: useRemote ? remoteData.settings : localData.settings,
      lastSyncTimestamp: Math.max(localData.lastSyncTimestamp, remoteData.lastSyncTimestamp),
      createdAt: localData.createdAt,
      updatedAt: new Date().toISOString()
    };
  }

  // Main sync function
  async syncUserData(): Promise<SyncResult> {
    try {
      const userProfile = getUserProfile();
      if (!userProfile) {
        return {
          success: false,
          action: 'no_action',
          message: 'No user profile found. Please create a profile first.'
        };
      }

      const localData = this.getLocalUserData();
      if (!localData) {
        return {
          success: false,
          action: 'no_action',
          message: 'Failed to get local user data.'
        };
      }

      let remoteData = await this.getRemoteUserData(userProfile.userId);

      if (!remoteData) {
        // No remote data exists, upload local data to create the profile
        await this.uploadUserData(localData);
        return {
          success: true,
          action: 'uploaded',
          message: 'Local data uploaded to cloud successfully.'
        };
      }

      // Check if user IDs match
      if (localData.userId !== remoteData.userId) {
        // Clear local data and download remote data
        this.clearLocalUserData();
        this.applyRemoteDataToLocal(remoteData);
        return {
          success: true,
          action: 'downloaded',
          message: 'User ID mismatch. Local data cleared and remote data downloaded.'
        };
      }

      // Merge data and check for conflicts
      const mergedData = this.mergeUserData(localData, remoteData);
      
      // Apply merged data locally
      this.applyRemoteDataToLocal(mergedData);
      
      // Upload merged data to remote
      await this.uploadUserData(mergedData);

      return {
        success: true,
        action: 'merged',
        message: 'Data successfully merged and synchronized across devices.'
      };

    } catch (error) {
      console.error('Sync error:', error);
      
      // If it's a 404 error (user not found), try to create the profile
      if (error instanceof Error && (error.message.includes('404') || error.message.includes('not found'))) {
        try {
          const localData = this.getLocalUserData();
          if (localData) {
            await this.uploadUserData(localData);
            return {
              success: true,
              action: 'uploaded',
              message: 'Profile created and local data uploaded to cloud successfully.'
            };
          }
        } catch (createError) {
          console.error('Failed to create profile:', createError);
        }
      }
      
      return {
        success: false,
        action: 'no_action',
        message: `Sync failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  // Switch to different user account
  async switchToUser(userId: string): Promise<SyncResult> {
    try {
      const remoteData = await this.getRemoteUserData(userId);
      
      if (!remoteData) {
        return {
          success: false,
          action: 'no_action',
          message: 'User not found. Please check the User ID.'
        };
      }

      // Clear current local data
      this.clearLocalUserData();
      
      // Apply remote user data
      this.applyRemoteDataToLocal(remoteData);

      return {
        success: true,
        action: 'downloaded',
        message: `Successfully switched to user: ${remoteData.username}`
      };

    } catch (error) {
      console.error('Switch user error:', error);
      return {
        success: false,
        action: 'no_action',
        message: `Failed to switch user: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  // Helper methods
  private mapToRemoteUserData(data: any): RemoteUserData {
    // Create streak data from the simplified structure
    const streakData: StreakData = {
      currentStreak: data.currentStreak || 0,
      lastPlayedLevel: data.lastPlayedLevel || -1,
      lastPlayedDate: data.lastActivityDate || '',
      weeklyProgress: [false, false, false, false, false, false, false], // Not stored in remote, use default
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
      dbSyncCompleted: true
    };

    return {
      userId: data.userId,
      username: data.username,
      avatar: data.avatar,
      completedLevels: data.completedLevels || [],
      completedBonusLevels: [], // Not stored separately in new structure
      completedCommunityLevels: [], // Not stored separately in new structure
      levelCompletionTimes: data.completionTimes || [],
      streakData: streakData,
      settings: data.settings || this.getDefaultSettings(),
      lastSyncTimestamp: Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }

  private getCompletedLevels(): number[] {
    return safeParseLocalStorage('completedLevels', []);
  }

  private getCompletedBonusLevels(): string[] {
    return safeParseLocalStorage('completedBonusLevels', []);
  }

  private getCompletedCommunityLevels(): string[] {
    return safeParseLocalStorage('completedCommunityLevels', []);
  }

  private setCompletedLevels(levels: number[]): void {
    localStorage.setItem('completedLevels', JSON.stringify(levels));
  }

  private setCompletedBonusLevels(levels: string[]): void {
    localStorage.setItem('completedBonusLevels', JSON.stringify(levels));
  }

  private setCompletedCommunityLevels(levels: string[]): void {
    localStorage.setItem('completedCommunityLevels', JSON.stringify(levels));
  }

  private setLevelCompletionTimes(times: LevelCompletionTime[]): void {
    localStorage.setItem('levelCompletionTimes', JSON.stringify(times));
  }

  private getCurrentSettings(): UserSettings {
    return {
      theme: localStorage.getItem('theme') || 'system',
      language: localStorage.getItem('i18nextLng') || 'en',
      clashingQueensEnabled: safeParseLocalStorage('clashingQueensEnabled', true),
      showInstructions: safeParseLocalStorage('showInstructions', true),
      showClock: safeParseLocalStorage('showClock', true),
      autoPlaceXs: safeParseLocalStorage('autoPlaceXs', false),
      groupBySize: safeParseLocalStorage('groupBySize', false),
      hideCompletedLevels: safeParseLocalStorage('hideCompletedLevels', false),
      showUniqueCommunityLevels: safeParseLocalStorage('showUniqueCommunityLevels', false),
      showMultipleCommunityLevels: safeParseLocalStorage('showMultipleCommunityLevels', false),
      showCompletedCommunityLevels: safeParseLocalStorage('showCompletedCommunityLevels', false),
      showNotCompletedCommunityLevels: safeParseLocalStorage('showNotCompletedCommunityLevels', false),
      pwaInstallBannerEnabled: safeParseLocalStorage('pwaInstallBannerEnabled', true),
      pwaOfflineSupportEnabled: safeParseLocalStorage('pwaOfflineSupportEnabled', false),
      bonusLevelsClicked: safeParseLocalStorage('bonusLevelsClicked', false),
      communityLevelsClicked: safeParseLocalStorage('communityLevelsClicked', false)
    };
  }

  private applySettings(settings: UserSettings): void {
    localStorage.setItem('theme', settings.theme);
    localStorage.setItem('i18nextLng', settings.language);
    localStorage.setItem('clashingQueensEnabled', JSON.stringify(settings.clashingQueensEnabled));
    localStorage.setItem('showInstructions', JSON.stringify(settings.showInstructions));
    localStorage.setItem('showClock', JSON.stringify(settings.showClock));
    localStorage.setItem('autoPlaceXs', JSON.stringify(settings.autoPlaceXs));
    localStorage.setItem('groupBySize', JSON.stringify(settings.groupBySize));
    localStorage.setItem('hideCompletedLevels', JSON.stringify(settings.hideCompletedLevels));
    localStorage.setItem('showUniqueCommunityLevels', JSON.stringify(settings.showUniqueCommunityLevels));
    localStorage.setItem('showMultipleCommunityLevels', JSON.stringify(settings.showMultipleCommunityLevels));
    localStorage.setItem('showCompletedCommunityLevels', JSON.stringify(settings.showCompletedCommunityLevels));
    localStorage.setItem('showNotCompletedCommunityLevels', JSON.stringify(settings.showNotCompletedCommunityLevels));
    localStorage.setItem('pwaInstallBannerEnabled', JSON.stringify(settings.pwaInstallBannerEnabled));
    localStorage.setItem('pwaOfflineSupportEnabled', JSON.stringify(settings.pwaOfflineSupportEnabled));
    localStorage.setItem('bonusLevelsClicked', JSON.stringify(settings.bonusLevelsClicked));
    localStorage.setItem('communityLevelsClicked', JSON.stringify(settings.communityLevelsClicked));
  }

  private clearLocalUserData(): void {
    const keysToKeep = ['theme', 'i18nextLng']; // Keep theme and language preferences
    const allKeys = Object.keys(localStorage);
    
    allKeys.forEach(key => {
      if (!keysToKeep.includes(key)) {
        localStorage.removeItem(key);
      }
    });
  }

  private mergeLevelCompletionTimes(
    local: LevelCompletionTime[], 
    remote: LevelCompletionTime[]
  ): LevelCompletionTime[] {
    const timeMap = new Map<string, LevelCompletionTime>();

    // Add all times to map, keeping the fastest for each level+type combination
    [...local, ...remote].forEach(time => {
      const key = `${time.id}-${time.levelType}`;
      const existing = timeMap.get(key);
      
      if (!existing || time.time < existing.time) {
        timeMap.set(key, time);
      }
    });

    return Array.from(timeMap.values()).sort((a, b) => a.timestamp - b.timestamp);
  }

  private mergeStreakData(local: StreakData, remote: StreakData): StreakData {
    return {
      currentStreak: Math.max(local.currentStreak, remote.currentStreak),
      lastPlayedLevel: Math.max(local.lastPlayedLevel, remote.lastPlayedLevel),
      lastPlayedDate: local.lastPlayedDate > remote.lastPlayedDate ? local.lastPlayedDate : remote.lastPlayedDate,
      weeklyProgress: local.weeklyProgress.map((day, index) => day || remote.weeklyProgress[index]),
      badges: {
        threeDays: local.badges.threeDays || remote.badges.threeDays,
        fiveDays: local.badges.fiveDays || remote.badges.fiveDays,
        sevenDays: local.badges.sevenDays || remote.badges.sevenDays,
        thirtyOneDays: local.badges.thirtyOneDays || remote.badges.thirtyOneDays,
        fiftyDays: local.badges.fiftyDays || remote.badges.fiftyDays,
        oneHundredDays: local.badges.oneHundredDays || remote.badges.oneHundredDays,
        oneHundredFiftyDays: local.badges.oneHundredFiftyDays || remote.badges.oneHundredFiftyDays,
        twoHundredDays: local.badges.twoHundredDays || remote.badges.twoHundredDays,
        threeSixtyFiveDays: local.badges.threeSixtyFiveDays || remote.badges.threeSixtyFiveDays
      },
      notificationsEnabled: local.notificationsEnabled, // Keep local preference
      dbSyncCompleted: true
    };
  }

  private getDefaultSettings(): UserSettings {
    return {
      theme: 'system',
      language: 'en',
      clashingQueensEnabled: true,
      showInstructions: true,
      showClock: true,
      autoPlaceXs: false,
      groupBySize: false,
      hideCompletedLevels: false,
      showUniqueCommunityLevels: false,
      showMultipleCommunityLevels: false,
      showCompletedCommunityLevels: false,
      showNotCompletedCommunityLevels: false,
      pwaInstallBannerEnabled: true,
      pwaOfflineSupportEnabled: false,
      bonusLevelsClicked: false,
      communityLevelsClicked: false
    };
  }
}

// Export singleton instance
export const multiDeviceSync = MultiDeviceSync.getInstance();
