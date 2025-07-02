import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StreakData, getBadgeNames, getDayNames } from '@/utils/streak';
import { getNotificationPermission, requestNotificationPermission, scheduleStreakReminders, cancelStreakReminders } from '@/utils/notifications';

interface StreakDisplayProps {
  streakData: StreakData;
  onNotificationToggle: (enabled: boolean) => void;
}

const StreakDisplay: React.FC<StreakDisplayProps> = ({ streakData, onNotificationToggle }) => {
  const [isRequestingPermission, setIsRequestingPermission] = useState(false);
  const { t } = useTranslation();
  
  const badgeNames = getBadgeNames();
  const dayNames = getDayNames();
  const notificationPermission = getNotificationPermission();

  const handleNotificationToggle = async (enabled: boolean) => {
    if (enabled && !notificationPermission.granted) {
      setIsRequestingPermission(true);
      const granted = await requestNotificationPermission();
      setIsRequestingPermission(false);
      
      if (granted) {
        scheduleStreakReminders();
        onNotificationToggle(true);
      } else {
        // Permission denied, keep toggle off
        onNotificationToggle(false);
      }
    } else {
      // Update the parent state first
      onNotificationToggle(enabled);
      
      // Then handle the actual notification scheduling/canceling
      if (enabled && notificationPermission.granted) {
        scheduleStreakReminders();
      } else if (!enabled) {
        // Cancel reminders when notifications are disabled
        cancelStreakReminders();
      }
    }
  };

  return (
    <div className="flex flex-col items-center space-y-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full">
      {/* Streak Counter */}
      <div className="text-center">
        <div className="text-2xl font-bold text-orange-500 mb-1">
          {t('STREAK_DAY_COUNT', { count: streakData.currentStreak })}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-300">
          {t('STREAK_LOOKS_AMAZING')}
        </div>
      </div>

      {/* Weekly Progress */}
      <div className="flex justify-center space-x-2">
        {dayNames.map((day, index) => (
          <div
            key={index}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              streakData.weeklyProgress[index]
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
            }`}
          >
            {streakData.weeklyProgress[index] ? '✓' : day}
          </div>
        ))}
      </div>

      {/* Badges */}
      <div className="w-full">
        <div className="text-center text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
          {t('STREAK_BADGES')}
        </div>
        <div className="flex justify-start gap-1 overflow-x-auto pb-1">
          {badgeNames.map((badge) => (
            <div
              key={badge.key}
              className={`flex-shrink-0 relative p-1 rounded text-center text-xs font-medium transition-all whitespace-nowrap ${
                streakData.badges[badge.key]
                  ? 'bg-yellow-400 text-yellow-900 shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
              }`}
            >
              <div className="text-xs mb-0.5">
                {streakData.badges[badge.key] ? '🏆' : '🏅'}
              </div>
              <div className="text-xs">{badge.name}</div>
              {streakData.badges[badge.key] && (
                <div className="absolute inset-0 bg-yellow-400 opacity-20 rounded animate-pulse"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Notification Toggle */}
      <div className="w-full border-t border-gray-200 dark:border-gray-600 pt-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
            {t('STREAK_NOTIFICATIONS')}
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={streakData.notificationsEnabled}
              onChange={(e) => handleNotificationToggle(e.target.checked)}
              disabled={isRequestingPermission}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:left-[1px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-orange-500"></div>
          </label>
        </div>
        
        {isRequestingPermission && (
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-center">
            {t('STREAK_REQUESTING_PERMISSION')}
          </div>
        )}
        
        {notificationPermission.denied && (
          <div className="text-xs text-red-500 mt-1 text-center">
            {t('STREAK_NOTIFICATIONS_BLOCKED')}
          </div>
        )}
      </div>
    </div>
  );
};

export default StreakDisplay;
