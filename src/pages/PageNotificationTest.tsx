import React, { useState, useEffect } from 'react';
import Button from '@/components/Button';
import StreakDisplay from '@/components/StreakDisplay';
import { 
  getStreakData, 
  updateStreak, 
  resetStreak,
  StreakData 
} from '@/utils/streak';
import { 
  getNotificationPermission, 
  requestNotificationPermission, 
  scheduleStreakReminders,
  cancelStreakReminders 
} from '@/utils/notifications';
import { getDailyLevelNumber } from '@/utils/getDailyLevel';

const PageNotificationTest: React.FC = () => {
  // Security check - only allow in development
  if (!import.meta.env.DEV) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Access Denied</h1>
        <p>This page is only available in development mode.</p>
      </div>
    );
  }

  const [streakData, setStreakData] = useState<StreakData>(getStreakData());
  const [notificationPermission, setNotificationPermission] = useState(getNotificationPermission());
  const [testResults, setTestResults] = useState<string[]>([]);
  const [isServiceWorkerReady, setIsServiceWorkerReady] = useState(false);
  const [scheduledTime, setScheduledTime] = useState('');
  const [activeTimeouts, setActiveTimeouts] = useState<number[]>([]);

  useEffect(() => {
    // Check service worker status
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(() => {
        setIsServiceWorkerReady(true);
        addTestResult('✅ Service Worker is ready');
      }).catch(() => {
        addTestResult('❌ Service Worker failed to load');
      });
    } else {
      addTestResult('❌ Service Worker not supported');
    }
  }, []);

  const addTestResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const clearTestResults = () => {
    setTestResults([]);
  };

  const refreshStreakData = () => {
    setStreakData(getStreakData());
    setNotificationPermission(getNotificationPermission());
  };

  const testBasicNotification = async () => {
    try {
      if (notificationPermission.granted) {
        new Notification('Test Basic Notification', {
          body: 'This is a basic browser notification test',
          icon: '/favicon.ico',
          badge: '/favicon.ico'
        });
        addTestResult('✅ Basic notification sent');
      } else {
        addTestResult('❌ Notification permission not granted');
      }
    } catch (error) {
      addTestResult(`❌ Basic notification failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const testServiceWorkerNotification = async () => {
    try {
      if (!isServiceWorkerReady) {
        addTestResult('❌ Service Worker not ready');
        return;
      }

      const registration = await navigator.serviceWorker.ready;
      await registration.showNotification('Test Service Worker Notification', {
        body: 'This notification comes from the service worker',
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        tag: 'test-sw-notification'
      });
      addTestResult('✅ Service Worker notification sent');
    } catch (error) {
      addTestResult(`❌ Service Worker notification failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const testScheduledNotification = () => {
    try {
      if (!notificationPermission.granted) {
        addTestResult('❌ Notification permission not granted');
        return;
      }

      if (!scheduledTime) {
        addTestResult('❌ Please set a scheduled time first');
        return;
      }

      const now = new Date();
      const [hours, minutes] = scheduledTime.split(':').map(Number);
      const scheduledDateTime = new Date();
      scheduledDateTime.setHours(hours, minutes, 0, 0);

      if (scheduledDateTime <= now) {
        scheduledDateTime.setDate(scheduledDateTime.getDate() + 1);
      }

      const timeUntilNotification = scheduledDateTime.getTime() - now.getTime();
      const timeUntilMinutes = Math.round(timeUntilNotification / (1000 * 60));

      addTestResult(`⏰ Notification scheduled for ${scheduledTime} (in ${timeUntilMinutes} minutes)`);

      const timeoutId = window.setTimeout(() => {
        new Notification('Scheduled Test Notification', {
          body: `This notification was scheduled for ${scheduledTime}`,
          icon: '/favicon.ico',
          badge: '/favicon.ico'
        });
        addTestResult(`✅ Scheduled notification triggered at ${new Date().toLocaleTimeString()}`);
        setActiveTimeouts(prev => prev.filter(id => id !== timeoutId));
      }, timeUntilNotification);

      setActiveTimeouts(prev => [...prev, timeoutId]);
    } catch (error) {
      addTestResult(`❌ Schedule notification failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const clearScheduledNotifications = () => {
    try {
      activeTimeouts.forEach(timeoutId => {
        window.clearTimeout(timeoutId);
      });
      setActiveTimeouts([]);
      addTestResult('✅ All scheduled notifications cleared');
    } catch (error) {
      addTestResult(`❌ Clear scheduled failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const requestPermission = async () => {
    try {
      const granted = await requestNotificationPermission();
      if (granted) {
        addTestResult('✅ Notification permission granted');
        setNotificationPermission(getNotificationPermission());
      } else {
        addTestResult('❌ Notification permission denied');
      }
    } catch (error) {
      addTestResult(`❌ Permission request failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const simulateWin = () => {
    try {
      const currentLevel = getDailyLevelNumber();
      updateStreak(currentLevel.toString(), true);
      setStreakData(getStreakData());
      addTestResult(`✅ Simulated win for daily level ${currentLevel}`);
    } catch (error) {
      addTestResult(`❌ Simulate win failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const simulateStreakBreak = () => {
    try {
      resetStreak();
      addTestResult('✅ Streak reset (simulated streak break)');
      setStreakData(getStreakData());
    } catch (error) {
      addTestResult(`❌ Simulate streak break failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const scheduleReminders = () => {
    try {
      scheduleStreakReminders();
      addTestResult('✅ Streak reminders scheduled (9am & 9pm Pacific)');
    } catch (error) {
      addTestResult(`❌ Schedule reminders failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const cancelReminders = () => {
    try {
      cancelStreakReminders();
      addTestResult('✅ Streak reminders cancelled');
    } catch (error) {
      addTestResult(`❌ Cancel reminders failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleNotificationToggle = (enabled: boolean) => {
    const newStreakData = { ...streakData, notificationsEnabled: enabled };
    setStreakData(newStreakData);
    addTestResult(`✅ Notifications ${enabled ? 'enabled' : 'disabled'}`);
  };

  const enableServiceWorker = () => {
    try {
      localStorage.setItem('pwaOfflineSupportEnabled', 'true');
      addTestResult('✅ Service Worker enabled in localStorage');
      addTestResult('🔄 Please refresh the page to activate Service Worker');
    } catch (error) {
      addTestResult(`❌ Enable Service Worker failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Notification Testing Page</h1>
      
      {/* Current Status */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-3">Current Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div><strong>Daily Level:</strong> {getDailyLevelNumber()}</div>
          <div>
            <strong>Notification Permission:</strong> 
            <span className={`ml-2 px-2 py-1 rounded ${
              notificationPermission.granted ? 'bg-green-200 text-green-800' :
              notificationPermission.denied ? 'bg-red-200 text-red-800' :
              'bg-yellow-200 text-yellow-800'
            }`}>
              {notificationPermission.granted ? 'Granted' : 
               notificationPermission.denied ? 'Denied' : 'Default'}
            </span>
          </div>
          <div>
            <strong>Service Worker:</strong> 
            <span className={`ml-2 px-2 py-1 rounded ${
              isServiceWorkerReady ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
            }`}>
              {isServiceWorkerReady ? 'Ready' : 'Not Ready'}
            </span>
            {!isServiceWorkerReady && (
              <Button onClick={enableServiceWorker} className="ml-2 text-xs px-2 py-1">
                Enable & Refresh
              </Button>
            )}
          </div>
          <div><strong>Current Streak:</strong> {streakData.currentStreak} days</div>
          <div><strong>Active Scheduled:</strong> {activeTimeouts.length} notifications</div>
        </div>
      </div>

      {/* Scheduled Notification Testing */}
      <div className="bg-white dark:bg-gray-900 rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-3">Scheduled Notification Testing</h2>
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <label htmlFor="scheduledTime" className="text-sm font-medium">Schedule Time:</label>
            <input
              id="scheduledTime"
              type="time"
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            />
          </div>
          <Button 
            onClick={testScheduledNotification}
            className="text-sm"
            disabled={!notificationPermission.granted || !scheduledTime}
          >
            Schedule Test Notification
          </Button>
          <Button 
            onClick={clearScheduledNotifications}
            className="text-sm"
            disabled={activeTimeouts.length === 0}
          >
            Clear All ({activeTimeouts.length})
          </Button>
        </div>
        <div className="text-xs text-gray-600 dark:text-gray-400">
          Set a time and click "Schedule Test Notification" to test notifications at a specific time.
        </div>
      </div>

      {/* Streak Display Component */}
      <div className="bg-white dark:bg-gray-900 rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-3">Streak Display Component</h2>
        <StreakDisplay 
          streakData={streakData}
          onNotificationToggle={handleNotificationToggle}
        />
      </div>

      {/* Test Controls */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Test Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <div className="space-y-2">
            <h3 className="font-semibold text-sm">Permission</h3>
            <Button onClick={requestPermission} className="w-full text-sm" disabled={notificationPermission.granted}>
              Request Permission
            </Button>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-sm">Basic Notifications</h3>
            <Button onClick={testBasicNotification} className="w-full text-sm" disabled={!notificationPermission.granted}>
              Test Basic Notification
            </Button>
            <Button onClick={testServiceWorkerNotification} className="w-full text-sm" disabled={!notificationPermission.granted || !isServiceWorkerReady}>
              Test SW Notification
            </Button>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-sm">Streak Simulation</h3>
            <Button onClick={simulateWin} className="w-full text-sm">Simulate Daily Win</Button>
            <Button onClick={simulateStreakBreak} className="w-full text-sm">Reset Streak</Button>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-sm">Reminder Scheduling</h3>
            <Button onClick={scheduleReminders} className="w-full text-sm" disabled={!notificationPermission.granted}>
              Schedule Reminders
            </Button>
            <Button onClick={cancelReminders} className="w-full text-sm">Cancel Reminders</Button>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-sm">Utilities</h3>
            <Button onClick={refreshStreakData} className="w-full text-sm">Refresh Data</Button>
            <Button onClick={clearTestResults} className="w-full text-sm">Clear Results</Button>
          </div>
        </div>
      </div>

      {/* Test Results */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold">Test Results</h2>
          <Button onClick={clearTestResults} className="text-sm">Clear</Button>
        </div>
        <div className="bg-black text-green-400 p-3 rounded font-mono text-sm max-h-60 overflow-y-auto">
          {testResults.length === 0 ? (
            <div className="text-gray-500">No test results yet. Run some tests!</div>
          ) : (
            testResults.map((result, index) => (
              <div key={index} className="mb-1">{result}</div>
            ))
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4 mt-6">
        <h2 className="text-xl font-semibold mb-3">Testing Instructions</h2>
        <ol className="list-decimal list-inside space-y-2 text-sm">
          <li>If Service Worker shows "Not Ready", click "Enable & Refresh" and refresh the page</li>
          <li>Click "Request Permission" to enable notifications</li>
          <li>Test basic notifications to ensure browser support works</li>
          <li>Use the scheduled notification feature to test specific times</li>
          <li>Simulate daily wins to test streak tracking</li>
          <li>Toggle notifications in the StreakDisplay component</li>
        </ol>
        <div className="mt-4 p-3 bg-yellow-100 dark:bg-yellow-900 rounded">
          <strong>Note:</strong> The scheduled notification feature lets you test notifications at any specific time.
        </div>
      </div>
    </div>
  );
};

export default PageNotificationTest;
