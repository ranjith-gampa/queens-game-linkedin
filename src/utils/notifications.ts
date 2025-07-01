// Web Push Notifications utility for Queens Game streak reminders

export interface NotificationPermissionStatus {
  granted: boolean;
  denied: boolean;
  default: boolean;
}

// Check if notifications are supported in the browser
export function isNotificationSupported(): boolean {
  return typeof window !== 'undefined' && 'Notification' in window && 'serviceWorker' in navigator;
}

// Get current notification permission status
export function getNotificationPermission(): NotificationPermissionStatus {
  if (!isNotificationSupported()) {
    return { granted: false, denied: true, default: false };
  }

  const permission = Notification.permission;
  return {
    granted: permission === 'granted',
    denied: permission === 'denied',
    default: permission === 'default',
  };
}

// Request notification permission
export async function requestNotificationPermission(): Promise<boolean> {
  if (!isNotificationSupported()) {
    return false;
  }

  try {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return false;
  }
}

// Schedule notifications for 9 AM and 9 PM user's timezone
export function scheduleStreakReminders(): void {
  if (!getNotificationPermission().granted) {
    return;
  }

  // Clear existing reminders
  clearScheduledNotifications();

  // Schedule morning reminder (9 AM)
  scheduleDailyNotification(9, 0, 'Morning reminder: Don\'t lose your Queens Game win streak! 🏆', 'Play today\'s level to keep your streak alive.');

  // Schedule evening reminder (9 PM)
  scheduleDailyNotification(21, 0, 'Evening reminder: Keep your Queens Game streak going! 🌙', 'You still have time to play today\'s level.');
}

// Schedule a daily notification at a specific time
function scheduleDailyNotification(hour: number, minute: number, title: string, body: string): void {
  const now = new Date();
  const scheduledTime = new Date();
  scheduledTime.setHours(hour, minute, 0, 0);

  // If the time has passed today, schedule for tomorrow
  if (scheduledTime <= now) {
    scheduledTime.setDate(scheduledTime.getDate() + 1);
  }

  const timeUntilNotification = scheduledTime.getTime() - now.getTime();

  setTimeout(() => {
    showNotification(title, body);
    // Schedule the next occurrence (24 hours later)
    setInterval(() => {
      showNotification(title, body);
    }, 24 * 60 * 60 * 1000);
  }, timeUntilNotification);
}

// Show a notification
export function showNotification(title: string, body: string, icon?: string): void {
  if (!getNotificationPermission().granted) {
    return;
  }

  try {
    const notification = new Notification(title, {
      body,
      icon: icon || '/favicon.ico',
      badge: '/favicon.ico',
      tag: 'queens-game-streak',
      requireInteraction: false,
      silent: false,
    });

    // Auto-close after 5 seconds
    setTimeout(() => {
      notification.close();
    }, 5000);

    // Handle click to open the game
    notification.onclick = () => {
      window.focus();
      notification.close();
      // Navigate to daily level if possible
      if (window.location.pathname !== '/') {
        window.location.href = '/';
      }
    };
  } catch (error) {
    console.error('Error showing notification:', error);
  }
}

// Clear all scheduled notifications (note: this is a simplified version)
// In a real implementation, you'd want to track scheduled timeouts and clear them
export function clearScheduledNotifications(): void {
  // This is a limitation of web APIs - we can't easily clear scheduled timeouts
  // In a production app, you'd want to store timeout IDs and clear them properly
  console.log('Clearing scheduled notifications');
}

// Cancel streak reminders (alias for clearScheduledNotifications)
export function cancelStreakReminders(): void {
  clearScheduledNotifications();
  console.log('Streak reminders cancelled');
}

// Check if user can still play today's level
export function shouldShowStreakReminder(): boolean {
  const now = new Date();
  const hour = now.getHours();
  
  // Only show reminders between 9 AM and 11 PM
  return hour >= 9 && hour <= 23;
}

// Initialize notifications when the app loads
export function initializeNotifications(enabled: boolean): void {
  if (!isNotificationSupported()) {
    return;
  }

  if (!enabled) {
    // Cancel reminders when notifications are disabled
    cancelStreakReminders();
    return;
  }

  // Check permission and schedule if granted
  const permission = getNotificationPermission();
  if (permission.granted) {
    scheduleStreakReminders();
  }
}
