// Testing utilities for notifications in development environment

import { showNotification, getNotificationPermission, requestNotificationPermission } from './notifications';

// Test notification immediately
export function testNotificationNow(title?: string, body?: string): void {
  const defaultTitle = 'Test Notification';
  const defaultBody = 'This is a test notification from Queens Game!';
  
  showNotification(title || defaultTitle, body || defaultBody);
}

// Test streak reminder notifications
export function testStreakReminders(): void {
  testNotificationNow(
    'Morning reminder: Don\'t lose your Queens Game win streak! 🏆',
    'Play today\'s level to keep your streak alive.'
  );
  
  setTimeout(() => {
    testNotificationNow(
      'Evening reminder: Keep your Queens Game streak going! 🌙',
      'You still have time to play today\'s level.'
    );
  }, 2000);
}

// Test notification permission flow
export async function testNotificationPermission(): Promise<void> {
  console.log('Testing notification permission flow...');
  
  const initialPermission = getNotificationPermission();
  console.log('Initial permission status:', initialPermission);
  
  if (!initialPermission.granted) {
    console.log('Requesting notification permission...');
    const granted = await requestNotificationPermission();
    console.log('Permission granted:', granted);
    
    if (granted) {
      console.log('Testing notification after permission granted...');
      testNotificationNow('Permission Granted!', 'Notifications are now enabled for Queens Game.');
    }
  } else {
    console.log('Permission already granted, testing notification...');
    testNotificationNow('Permission Already Granted', 'Notifications are working correctly.');
  }
}

// Test scheduled notifications (with shorter intervals for testing)
export function testScheduledNotifications(): void {
  console.log('Testing scheduled notifications with 10-second intervals...');
  
  let count = 1;
  const interval = setInterval(() => {
    testNotificationNow(
      `Scheduled Test #${count}`,
      `This is scheduled test notification #${count}`
    );
    
    count++;
    if (count > 3) {
      clearInterval(interval);
      console.log('Scheduled notification test completed');
    }
  }, 10000); // 10 seconds for testing
}

// Add testing functions to window for easy console access
declare global {
  interface Window {
    testNotifications: {
      testNow: typeof testNotificationNow;
      testStreakReminders: typeof testStreakReminders;
      testPermission: typeof testNotificationPermission;
      testScheduled: typeof testScheduledNotifications;
    };
  }
}

// Initialize testing functions in development
export function initializeNotificationTesting(): void {
  if (typeof window !== 'undefined' && import.meta.env.DEV) {
    window.testNotifications = {
      testNow: testNotificationNow,
      testStreakReminders: testStreakReminders,
      testPermission: testNotificationPermission,
      testScheduled: testScheduledNotifications,
    };
    
    console.log('🔔 Notification testing utilities loaded!');
    console.log('Use the following commands in the console:');
    console.log('- window.testNotifications.testNow() - Test immediate notification');
    console.log('- window.testNotifications.testStreakReminders() - Test streak reminder notifications');
    console.log('- window.testNotifications.testPermission() - Test permission flow');
    console.log('- window.testNotifications.testScheduled() - Test scheduled notifications');
  }
}
