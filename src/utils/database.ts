import { LeaderboardEntry } from './types';
import supabase from './database/supabase';
import { getUserProfile } from './localStorage';

const ROW_LIMIT = 100;
const ROW_LIMIT_TODAY = 10; // Limit for today's leaderboard

/**
 * Get default user settings with all required fields
 */
function getDefaultSettings(): any {
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

/**
 * Merge user settings with defaults to ensure all fields are present
 */
function mergeWithDefaultSettings(userSettings: any): any {
    const defaults = getDefaultSettings();
    return { ...defaults, ...userSettings };
}

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

export async function getLeaderboardEntries(
    levelType: string, 
    rowLimit: number = ROW_LIMIT,
    userId?: string
): Promise<LeaderboardEntry[]> {
    let data, error;

    if (userId) {
        // Use the user-specific function if userId is provided
        ({ data, error } = await supabase.rpc('get_completion_times_user', {
            p_level_type: levelType,
            p_user_id: userId,
            num_records: rowLimit
        }));
    } else {
        // Use the general function if no userId is provided
        ({ data, error } = await supabase.rpc('get_completion_times', {
            p_level_type: levelType,
            num_records: rowLimit
        }));
    }

    if (error) {
        console.error('Error calling function:', error);
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

export async function insertOrUpdateUser(
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

/**
 * Upload user profile data to remote database
 */
export async function uploadUserProfile(userData: any): Promise<{ success: boolean; error?: string }> {
    try {
        // Ensure settings always have default values
        const completeSettings = mergeWithDefaultSettings(userData.settings || {});
        
        // First try the upsert function
        const { error: funcError } = await supabase.rpc('upsert_user_profile', {
            p_user_id: userData.userId,
            p_username: userData.username,
            p_avatar: userData.avatar,
            p_completed_levels: userData.completedLevels || [],
            p_completion_times: userData.completionTimes || [],
            p_current_streak: userData.currentStreak || 0,
            p_max_streak: userData.maxStreak || 0,
            p_last_played_level: userData.lastPlayedLevel || -1,
            p_last_activity_date: userData.lastActivityDate || null,
            p_streak_start_date: userData.streakStartDate || null,
            p_settings: completeSettings
        });

        if (!funcError) {
            return { success: true };
        }

        // If function fails or doesn't exist, fallback to direct table upsert
        console.warn('Upsert function failed, using direct table upsert:', funcError);
        
        const { error: tableError } = await supabase
            .from('user_profiles')
            .upsert({
                user_id: userData.userId,
                username: userData.username,
                avatar: userData.avatar,
                completed_levels: userData.completedLevels || [],
                completion_times: userData.completionTimes || [],
                current_streak: userData.currentStreak || 0,
                max_streak: userData.maxStreak || 0,
                last_played_level: userData.lastPlayedLevel || -1,
                last_activity_date: userData.lastActivityDate || null,
                streak_start_date: userData.streakStartDate || null,
                settings: completeSettings,
                updated_at: new Date().toISOString()
            }, {
                onConflict: 'user_id'
            });

        if (tableError) {
            console.error('Error with direct table upsert:', tableError);
            return { success: false, error: tableError.message };
        }

        console.log('Successfully uploaded user profile using direct table upsert');
        return { success: true };

    } catch (error) {
        console.error('Error in uploadUserProfile:', error);
        return { success: false, error: 'Failed to upload user profile' };
    }
}

/**
 * Download user profile data from remote database using database function
 */
export async function downloadUserProfile(userId: string): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
        const { data, error } = await supabase.rpc('get_user_profile', {
            p_user_id: userId
        });

        if (error) {
            console.warn('Database function get_user_profile failed, resorting to guest mode:', error);
            // Resort to guest mode instead of fallback
            return { success: true, data: null };
        }

        if (!data || data.length === 0) {
            // No user profile found
            return { success: true, data: null };
        }

        // Transform the function result data to match our expected format
        const profileData = data[0] || data;
        const transformedData = {
            userId: profileData.user_id,
            username: profileData.username,
            avatar: profileData.avatar,
            completedLevels: profileData.completed_levels || [],
            completionTimes: profileData.completion_times || [],
            currentStreak: profileData.current_streak || 0,
            maxStreak: profileData.max_streak || 0,
            lastPlayedLevel: profileData.last_played_level || -1,
            lastActivityDate: profileData.last_activity_date,
            streakStartDate: profileData.streak_start_date,
            settings: mergeWithDefaultSettings(profileData.settings || {})
        };

        return { success: true, data: transformedData };
    } catch (error) {
        console.error('Error in downloadUserProfile:', error);
        return { success: true, data: null }; // Resort to guest mode on any error
    }
}

/**
 * Upload current localStorage settings to database
 * This is useful for migrating existing users to the database system
 */
export async function uploadCurrentSettingsToDatabase(userId: string): Promise<{ success: boolean; error?: string }> {
    try {
        // Import dynamically to avoid circular dependency
        const { safeParseLocalStorage } = await import('./localStorage');
        
        // Collect all current settings from localStorage
        const currentSettings = {
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

        // Merge with defaults to ensure all settings are present
        const completeSettings = mergeWithDefaultSettings(currentSettings);
        
        // Update user settings in database
        return await updateUserSettings(userId, completeSettings);
    } catch (error) {
        console.error('Error uploading current settings to database:', error);
        return { success: false, error: 'Failed to upload settings to database' };
    }
}

/**
 * Update user settings in the database
 * This function specifically handles setting updates when users change preferences
 */
export async function updateUserSettings(userId: string, settingsUpdate: Partial<any>): Promise<{ success: boolean; error?: string }> {
    try {
        // First get current profile to preserve other data
        const currentProfile = await downloadUserProfile(userId);
        
        if (!currentProfile.success) {
            return { success: false, error: 'Failed to fetch current profile' };
        }

        // If no profile exists, create one with default data
        if (!currentProfile.data) {
            const newProfile = {
                userId,
                username: 'Guest',
                avatar: '👤',
                completedLevels: [],
                completionTimes: [],
                currentStreak: 0,
                maxStreak: 0,
                lastActivityDate: null,
                streakStartDate: null,
                settings: mergeWithDefaultSettings(settingsUpdate)
            };
            return uploadUserProfile(newProfile);
        }

        // Merge the settings update with current settings
        const updatedSettings = mergeWithDefaultSettings({
            ...currentProfile.data.settings,
            ...settingsUpdate
        });

        // Update the profile with new settings
        const updatedProfile = {
            ...currentProfile.data,
            settings: updatedSettings
        };

        return uploadUserProfile(updatedProfile);
    } catch (error) {
        console.error('Error updating user settings:', error);
        return { success: false, error: 'Failed to update user settings' };
    }
}

/**
 * Compatibility function: ensures user exists in both old and new systems
 * This bridges the gap during migration period
 */
export async function ensureUserCompatibility(userId: string, username: string, avatar: string): Promise<boolean> {
    try {
        // First, ensure user exists in old system (for leaderboard compatibility)
        await insertOrUpdateUser(userId, username, avatar);
        
        // Then, ensure user exists in new system (for sync functionality)
        const { success } = await uploadUserProfile({
            userId,
            username,
            avatar,
            completedLevels: [],
            completionTimes: [],
            currentStreak: 0,
            maxStreak: 0,
            lastActivityDate: null,
            streakStartDate: null,
            settings: getDefaultSettings()
        });
        
        return success;
    } catch (error) {
        console.error('Error ensuring user compatibility:', error);
        return false;
    }
}

/**
 * Get user data from either system (prioritize new system)
 */
export async function getUserData(userId: string): Promise<{ success: boolean; data?: any; source?: string }> {
    // Try new system first
    const newSystemResult = await downloadUserProfile(userId);
    if (newSystemResult.success && newSystemResult.data) {
        return { ...newSystemResult, source: 'user_profiles' };
    }
    
    // Fallback to old system data (for migration scenarios)
    try {
        // This would require additional functions to get old system data
        // For now, return empty data structure
        return {
            success: true,
            data: {
                userId,
                username: 'Guest',
                avatar: '👤',
                completedLevels: [],
                completionTimes: [],
                currentStreak: 0,
                maxStreak: 0,
                lastActivityDate: null,
                streakStartDate: null,
                settings: getDefaultSettings()
            },
            source: 'legacy'
        };
    } catch (error) {
        console.error('Error getting user data from legacy system:', error);
        return { success: false };
    }
}

/**
 * Auto-sync settings to database when they change
 */
export async function syncSettingToDatabase(settingKey: string, settingValue: any): Promise<void> {
    try {
        const userProfile = getUserProfile();
        if (!userProfile?.userId) {
            return; // No user profile, skip sync
        }

        // Map localStorage keys to database setting keys
        const settingMapping: Record<string, string> = {
            'clashingQueensEnabled': 'clashingQueensEnabled',
            'showInstructions': 'showInstructions',
            'showClock': 'showClock',
            'autoPlaceXs': 'autoPlaceXs',
            'groupBySize': 'groupBySize',
            'hideCompletedLevels': 'hideCompletedLevels',
            'showUniqueCommunityLevels': 'showUniqueCommunityLevels',
            'showMultipleCommunityLevels': 'showMultipleCommunityLevels',
            'showCompletedCommunityLevels': 'showCompletedCommunityLevels',
            'showNotCompletedCommunityLevels': 'showNotCompletedCommunityLevels',
            'pwaInstallBannerEnabled': 'pwaInstallBannerEnabled',
            'pwaOfflineSupportEnabled': 'pwaOfflineSupportEnabled',
            'bonusLevelsClicked': 'bonusLevelsClicked',
            'communityLevelsClicked': 'communityLevelsClicked',
            'theme': 'theme',
            'i18nextLng': 'language'
        };

        const dbSettingKey = settingMapping[settingKey];
        if (!dbSettingKey) {
            return; // Unknown setting, skip sync
        }

        // Update the setting in the database
        const settingsUpdate = { [dbSettingKey]: settingValue };
        await updateUserSettings(userProfile.userId, settingsUpdate);
        
        console.log(`Synced setting ${settingKey} to database:`, settingValue);
    } catch (error) {
        console.warn('Failed to sync setting to database:', error);
        // Don't throw error - local storage should still work even if DB sync fails
    }
}
