import React, { useState } from 'react';
import { testNotificationNow, testStreakReminders, testNotificationPermission, testScheduledNotifications } from '@/utils/notificationTesting';
import { getNotificationPermission } from '@/utils/notifications';

const NotificationTestPanel: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [testResults, setTestResults] = useState<string[]>([]);
  
  const permission = getNotificationPermission();
  
  const addTestResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const handleTestNow = () => {
    testNotificationNow();
    addTestResult('Immediate test notification sent');
  };

  const handleTestStreakReminders = () => {
    testStreakReminders();
    addTestResult('Streak reminder notifications sent (2 notifications with 2s delay)');
  };

  const handleTestPermission = async () => {
    addTestResult('Testing permission flow...');
    await testNotificationPermission();
    addTestResult('Permission flow test completed');
  };

  const handleTestScheduled = () => {
    testScheduledNotifications();
    addTestResult('Started scheduled notification test (3 notifications every 10s)');
  };

  const clearResults = () => {
    setTestResults([]);
  };

  // Only show in development
  if (import.meta.env.PROD) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isVisible ? (
        <button
          onClick={() => setIsVisible(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg font-medium"
        >
          🔔 Test Notifications
        </button>
      ) : (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl p-4 w-80 max-h-96 overflow-y-auto">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-lg">Notification Testing</h3>
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              ×
            </button>
          </div>
          
          <div className="mb-3 p-2 bg-gray-100 dark:bg-gray-700 rounded text-xs">
            <div><strong>Permission:</strong> {permission.granted ? '✅ Granted' : permission.denied ? '❌ Denied' : '⏳ Default'}</div>
            <div><strong>Supported:</strong> {'Notification' in window ? '✅ Yes' : '❌ No'}</div>
          </div>
          
          <div className="space-y-2 mb-3">
            <button
              onClick={handleTestNow}
              className="w-full bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded text-sm"
            >
              Test Now
            </button>
            <button
              onClick={handleTestStreakReminders}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded text-sm"
            >
              Test Streak Reminders
            </button>
            <button
              onClick={handleTestPermission}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-sm"
            >
              Test Permission Flow
            </button>
            <button
              onClick={handleTestScheduled}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded text-sm"
            >
              Test Scheduled (10s intervals)
            </button>
          </div>
          
          {testResults.length > 0 && (
            <div className="border-t pt-3">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-sm">Test Results</h4>
                <button
                  onClick={clearResults}
                  className="text-xs text-red-500 hover:text-red-700"
                >
                  Clear
                </button>
              </div>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {testResults.map((result, index) => (
                  <div key={index} className="text-xs text-gray-600 dark:text-gray-400 p-1 bg-gray-50 dark:bg-gray-700 rounded">
                    {result}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="mt-3 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded text-xs text-yellow-800 dark:text-yellow-200">
            <strong>Note:</strong> Notifications may not work in all browsers or if browser settings block them. Check browser console for errors.
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationTestPanel;
