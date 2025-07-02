import React, { useState, useEffect } from 'react';
import Button from '@/components/Button';
import StreakDisplay from '@/components/StreakDisplay';
import { 
  getStreakData, 
  updateStreak, 
  updateStreakWithDate,
  resetStreak,
  debugWeeklyProgress,
  repairWeeklyProgress,
  recalculateWeeklyProgress,
  validateStreakData,
  getPacificDateString,
  getPacificDayOfWeek,
  getLevelNumberFromDate,
  forceHistoricalStreakCalculation,
  StreakData,
  saveStreakData
} from '@/utils/streak';
import { 
  getNotificationPermission, 
  requestNotificationPermission, 
  scheduleStreakReminders,
  cancelStreakReminders 
} from '@/utils/notifications';
import { getDailyLevelNumber } from '@/utils/getDailyLevel';
import { getUserProfile } from '@/utils/localStorage';

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
  const [customLevel, setCustomLevel] = useState('');
  const [simulationDate, setSimulationDate] = useState('');

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

  const simulateWinForLevel = () => {
    try {
      if (!customLevel || isNaN(Number(customLevel))) {
        addTestResult('❌ Please enter a valid level number');
        return;
      }
      
      const levelNumber = Number(customLevel);
      
      // Determine if this level is a daily level
      let isDaily = false;
      if (simulationDate) {
        // If a specific date is provided, check if the level matches the expected daily level for that date
        const expectedLevelForDate = getLevelNumberFromDate(simulationDate);
        isDaily = levelNumber === expectedLevelForDate;
      } else {
        // If no date is provided, check against today's daily level
        const dailyLevelNumber = getDailyLevelNumber();
        isDaily = levelNumber === dailyLevelNumber;
      }
      
      // Use custom date if provided, otherwise use current date
      const updatedData = updateStreakWithDate(customLevel, isDaily, simulationDate || undefined);
      setStreakData(updatedData);
      
      const dateNote = simulationDate ? ` on ${simulationDate}` : '';
      const expectedLevel = simulationDate ? getLevelNumberFromDate(simulationDate) : getDailyLevelNumber();
      addTestResult(`✅ Simulated win for level ${levelNumber}${isDaily ? ' (daily level)' : ' (regular level)'}${dateNote} (expected daily level: ${expectedLevel})`);
    } catch (error) {
      addTestResult(`❌ Simulate win for level failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
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

  const debugCurrentState = () => {
    try {
      const currentData = getStreakData();
      const currentLevel = getDailyLevelNumber();
      const now = new Date();
      const pacificTime = new Date(now.toLocaleString("en-US", {timeZone: "America/Los_Angeles"}));
      const currentDate = pacificTime.toISOString().split('T')[0];
      const dayOfWeek = pacificTime.getDay();
      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      
      addTestResult('=== CURRENT STREAK STATE DEBUG ===');
      addTestResult(`Current streak count: ${currentData.currentStreak}`);
      addTestResult(`Current date: ${currentDate}`);
      addTestResult(`Current day: ${dayNames[dayOfWeek]} (${dayOfWeek})`);
      addTestResult(`Last played date: ${currentData.lastPlayedDate}`);
      addTestResult(`Last played level: ${currentData.lastPlayedLevel}`);
      addTestResult(`Weekly progress: [${currentData.weeklyProgress.map((v, i) => v ? dayNames[i] : '').filter(Boolean).join(', ')}]`);
      
      // Check if already played today
      const alreadyPlayedToday = currentData.lastPlayedLevel === currentLevel && currentData.lastPlayedDate === currentDate;
      addTestResult(`Already played today: ${alreadyPlayedToday}`);
      
      // Check week boundary logic
      if (currentData.lastPlayedDate) {
        const lastPlayedDate = new Date(currentData.lastPlayedDate + 'T00:00:00-08:00');
        const startOfLastPlayedWeek = new Date(lastPlayedDate);
        startOfLastPlayedWeek.setDate(lastPlayedDate.getDate() - lastPlayedDate.getDay());
        
        const now = new Date();
        const pacificTime = new Date(now.toLocaleString("en-US", {timeZone: "America/Los_Angeles"}));
        const startOfCurrentWeek = new Date(pacificTime);
        startOfCurrentWeek.setDate(pacificTime.getDate() - pacificTime.getDay());
        
        const sameWeek = startOfCurrentWeek.getTime() === startOfLastPlayedWeek.getTime();
        addTestResult(`Same week as last played: ${sameWeek}`);
        addTestResult(`Start of current week: ${startOfCurrentWeek.toISOString().split('T')[0]}`);
        addTestResult(`Start of last played week: ${startOfLastPlayedWeek.toISOString().split('T')[0]}`);
      }
      
      const trueCount = currentData.weeklyProgress.filter(Boolean).length;
      addTestResult(`Days marked in weekly progress: ${trueCount}`);
      addTestResult(`Issue detected: ${trueCount !== currentData.currentStreak && currentData.currentStreak > 0 ? 'YES - MISMATCH!' : 'NO'}`);
      
    } catch (error) {
      addTestResult(`❌ Debug failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const repairWeeklyProgressData = () => {
    try {
      const repairedData = repairWeeklyProgress();
      setStreakData(repairedData);
      addTestResult('✅ Weekly progress data repaired');
      addTestResult(`New streak count: ${repairedData.currentStreak}`);
      const trueCount = repairedData.weeklyProgress.filter(Boolean).length;
      addTestResult(`New weekly progress count: ${trueCount}`);
    } catch (error) {
      addTestResult(`❌ Repair failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const clearCorruptedData = () => {
    try {
      localStorage.removeItem('queensGameStreak');
      addTestResult('✅ Cleared all streak data - starting fresh');
      setStreakData(getStreakData());
    } catch (error) {
      addTestResult(`❌ Clear failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const validateCurrentData = () => {
    try {
      const currentData = getStreakData();
      const validation = validateStreakData(currentData);
      
      addTestResult('=== STREAK DATA VALIDATION ===');
      addTestResult(`Data is valid: ${validation.isValid}`);
      
      if (!validation.isValid) {
        addTestResult('❌ Issues detected:');
        validation.issues.forEach(issue => {
          addTestResult(`   - ${issue}`);
        });
      } else {
        addTestResult('✅ No issues detected');
      }
      
    } catch (error) {
      addTestResult(`❌ Validation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const debugStreakFlow = () => {
    try {
      addTestResult('=== COMPREHENSIVE STREAK FLOW DEBUG ===');
      
      // 1. Check localStorage data
      const rawData = localStorage.getItem('queensGameStreak');
      addTestResult(`1. Raw localStorage data: ${rawData ? 'exists' : 'null'}`);
      if (rawData) {
        const parsedRaw = JSON.parse(rawData);
        addTestResult(`   Raw streak count: ${parsedRaw.currentStreak}`);
        addTestResult(`   Raw weekly progress: [${parsedRaw.weeklyProgress}]`);
        const rawTrueCount = parsedRaw.weeklyProgress.filter(Boolean).length;
        addTestResult(`   Raw true count: ${rawTrueCount}`);
      }
      
      // 2. Check getStreakData() result
      const processedData = getStreakData();
      addTestResult(`2. Processed data (after getStreakData):`);
      addTestResult(`   Processed streak count: ${processedData.currentStreak}`);
      addTestResult(`   Processed weekly progress: [${processedData.weeklyProgress}]`);
      const processedTrueCount = processedData.weeklyProgress.filter(Boolean).length;
      addTestResult(`   Processed true count: ${processedTrueCount}`);
      
      // 3. Check React state
      addTestResult(`3. React component state:`);
      addTestResult(`   State streak count: ${streakData.currentStreak}`);
      addTestResult(`   State weekly progress: [${streakData.weeklyProgress}]`);
      const stateTrueCount = streakData.weeklyProgress.filter(Boolean).length;
      addTestResult(`   State true count: ${stateTrueCount}`);
      
      // 4. Check for data flow inconsistencies
      addTestResult(`4. Data flow analysis:`);
      const rawVsProcessed = rawData ? JSON.parse(rawData).currentStreak === processedData.currentStreak : 'no raw data';
      const processedVsState = processedData.currentStreak === streakData.currentStreak;
      addTestResult(`   Raw → Processed consistent: ${rawVsProcessed}`);
      addTestResult(`   Processed → State consistent: ${processedVsState}`);
      
      // 5. Auto-repair detection
      if (rawData) {
        const rawParsed = JSON.parse(rawData);
        const rawTrueCount = rawParsed.weeklyProgress.filter(Boolean).length;
        const autoRepairTriggered = rawTrueCount > 7 || (rawTrueCount > rawParsed.currentStreak && rawParsed.currentStreak > 0);
        addTestResult(`   Auto-repair would trigger: ${autoRepairTriggered}`);
        if (autoRepairTriggered) {
          addTestResult(`   Reason: ${rawTrueCount > 7 ? 'More than 7 days marked' : 'Weekly count > streak count'}`);
        }
      }
      
      // 6. Current date/level context
      const currentDate = getPacificDateString();
      const currentLevel = getDailyLevelNumber();
      addTestResult(`5. Current context:`);
      addTestResult(`   Current date: ${currentDate}`);
      addTestResult(`   Current level: ${currentLevel}`);
      addTestResult(`   Already played today: ${processedData.lastPlayedDate === currentDate && processedData.lastPlayedLevel === currentLevel}`);
      
    } catch (error) {
      addTestResult(`❌ Debug streak flow failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const testHistoricalStreak = async () => {
    try {
      addTestResult('🔄 Testing historical streak calculation...');
      
      // Check user profile first
      const userProfile = getUserProfile();
      if (!userProfile || !userProfile.userId || userProfile.userId === 'anonymous') {
        addTestResult('❌ No user profile found - historical calculation requires a valid user profile');
        return;
      }
      
      addTestResult(`👤 User profile found: ${userProfile.username} (${userProfile.userId})`);
      
      // Force historical calculation
      const historicalData = await forceHistoricalStreakCalculation();
      
      if (historicalData) {
        addTestResult('✅ Historical streak calculation successful!');
        addTestResult(`   Calculated streak: ${historicalData.currentStreak} days`);
        addTestResult(`   Last played level: ${historicalData.lastPlayedLevel}`);
        addTestResult(`   Last played date: ${historicalData.lastPlayedDate}`);
        addTestResult(`   Weekly progress: [${historicalData.weeklyProgress.map(p => p ? '✓' : '✗').join(',')}]`);
        
        // Update the display
        setStreakData(historicalData);
      } else {
        addTestResult('❌ Historical calculation returned null (no completion records found or calculation failed)');
      }
    } catch (error) {
      addTestResult(`❌ Historical calculation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const testDatabaseSync = async () => {
    try {
      addTestResult('=== DATABASE SYNC TEST ===');
      
      // Get current local data
      const localData = getStreakData();
      addTestResult(`Current local data: streak=${localData.currentStreak}, sync=${localData.dbSyncCompleted}`);
      
      // Temporarily reset sync flag to test migration
      const unsyncedData = { ...localData, dbSyncCompleted: false };
      saveStreakData(unsyncedData);
      addTestResult('✅ Temporarily reset dbSyncCompleted flag');
      
      // Run initialization (this should trigger database sync)
      const { initializeStreakData } = await import('@/utils/streak');
      const syncedData = await initializeStreakData();
      
      addTestResult(`After sync: streak=${syncedData.currentStreak}, sync=${syncedData.dbSyncCompleted}`);
      setStreakData(syncedData);
      
    } catch (error) {
      addTestResult(`❌ Database sync test failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const testTimezoneConversion = () => {
    try {
      addTestResult('=== TIMEZONE CONVERSION TEST ===');
      
      // Test current time conversion
      const now = new Date();
      const currentUTC = now.toISOString();
      const currentPacific = getPacificDateString();
      
      addTestResult(`Current UTC time: ${currentUTC}`);
      addTestResult(`Current Pacific date: ${currentPacific}`);
      
      // Test specific UTC timestamps that might cause date boundary issues
      const testCases = [
        // UTC timestamp that's early morning next day but should be previous day in Pacific
        new Date('2025-07-02T07:00:00.000Z'), // 7 AM UTC = 12 AM Pacific (midnight)
        new Date('2025-07-02T08:00:00.000Z'), // 8 AM UTC = 1 AM Pacific
        new Date('2025-07-01T10:00:00.000Z'), // 10 AM UTC = 3 AM Pacific
        new Date('2025-07-01T16:00:00.000Z'), // 4 PM UTC = 9 AM Pacific
        new Date('2025-07-01T23:59:59.000Z'), // 11:59 PM UTC = 4:59 PM Pacific
      ];
      
      testCases.forEach((testDate, index) => {
        const { convertUTCToPacificDateString } = require('@/utils/streak');
        const pacificDate = convertUTCToPacificDateString(testDate);
        addTestResult(`Test ${index + 1}: ${testDate.toISOString()} -> ${pacificDate}`);
      });
      
    } catch (error) {
      addTestResult(`❌ Timezone conversion test failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const testWeeklyProgressDbSync = async () => {
    try {
      addTestResult('=== WEEKLY PROGRESS DATABASE SYNC TEST ===');
      
      // 1. Check current state
      const currentLocal = getStreakData();
      addTestResult(`1. Current state: streak=${currentLocal.currentStreak}, weekly=[${currentLocal.weeklyProgress.map(p => p ? '✓' : '✗').join(',')}]`);
      
      // 2. Create a scenario with low local streak but reset DB sync flag
      const testLocalData = {
        ...currentLocal,
        currentStreak: 1,
        weeklyProgress: [false, true, false, false, false, false, false], // Only Monday marked
        dbSyncCompleted: false // This will trigger database sync
      };
      
      addTestResult(`2. Setting up test scenario: local streak=1, weekly=[${testLocalData.weeklyProgress.map(p => p ? '✓' : '✗').join(',')}]`);
      saveStreakData(testLocalData);
      
      // 3. Force database sync by calling initializeStreakData
      addTestResult('3. Triggering database sync...');
      const { initializeStreakData } = await import('@/utils/streak');
      const syncedData = await initializeStreakData();
      
      // 4. Check the result
      addTestResult(`4. After DB sync: streak=${syncedData.currentStreak}, weekly=[${syncedData.weeklyProgress.map(p => p ? '✓' : '✗').join(',')}]`);
      
      // 5. Validate the weekly progress consistency
      const weeklyCount = syncedData.weeklyProgress.filter(Boolean).length;
      const isConsistent = weeklyCount <= 7 && (weeklyCount <= syncedData.currentStreak || syncedData.currentStreak === 0);
      
      addTestResult(`5. Weekly progress validation:`);
      addTestResult(`   Days marked: ${weeklyCount}`);
      addTestResult(`   Streak count: ${syncedData.currentStreak}`);
      addTestResult(`   Is consistent: ${isConsistent ? '✅ YES' : '❌ NO'}`);
      
      if (!isConsistent) {
        addTestResult(`   ⚠️ ISSUE: Weekly progress shows ${weeklyCount} days but streak is ${syncedData.currentStreak}`);
      }
      
      // 6. Update the display
      setStreakData(syncedData);
      
      // 7. Restore original state if needed
      addTestResult('6. Test completed - to restore original state, click "Refresh Data"');
      
    } catch (error) {
      addTestResult(`❌ Weekly progress DB sync test failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const debugWeeklyProgressLogic = () => {
    try {
      addTestResult('=== WEEKLY PROGRESS LOGIC DEBUG ===');
      
      const currentData = getStreakData();
      const currentDate = getPacificDateString();
      const currentDayOfWeek = getPacificDayOfWeek();
      
      addTestResult(`Current streak: ${currentData.currentStreak}`);
      addTestResult(`Current date: ${currentDate}`);
      addTestResult(`Current day of week: ${currentDayOfWeek} (0=Sun, 1=Mon, etc.)`);
      addTestResult(`Last played date: ${currentData.lastPlayedDate}`);
      addTestResult(`Weekly progress: [${currentData.weeklyProgress.map((p, i) => `${i}:${p ? 'T' : 'F'}`).join(', ')}]`);
      
      // Calculate what the weekly progress SHOULD be for a streak of this length
      if (currentData.currentStreak > 0 && currentData.lastPlayedDate) {
        addTestResult('\n--- Expected Weekly Progress Calculation ---');
        
        const lastPlayedDate = new Date(currentData.lastPlayedDate + 'T00:00:00-08:00');
        const lastPlayedDayOfWeek = lastPlayedDate.getDay();
        
        addTestResult(`Last played day of week: ${lastPlayedDayOfWeek}`);
        
        // Calculate start of current week
        const today = new Date();
        const pacificToday = new Date(today.toLocaleString("en-US", {timeZone: "America/Los_Angeles"}));
        const startOfCurrentWeek = new Date(pacificToday);
        startOfCurrentWeek.setDate(pacificToday.getDate() - pacificToday.getDay());
        
        // Calculate start of last played week
        const startOfLastPlayedWeek = new Date(lastPlayedDate);
        startOfLastPlayedWeek.setDate(lastPlayedDate.getDate() - lastPlayedDate.getDay());
        
        const isInCurrentWeek = startOfCurrentWeek.getTime() === startOfLastPlayedWeek.getTime();
        addTestResult(`Is last played date in current week: ${isInCurrentWeek}`);
        
        if (isInCurrentWeek) {
          addTestResult('\n--- Building Expected Weekly Progress ---');
          const expectedWeekly = [false, false, false, false, false, false, false];
          
          // Mark consecutive days working backwards from last played date
          for (let i = 0; i < Math.min(currentData.currentStreak, 7); i++) {
            const streakDay = new Date(lastPlayedDate);
            streakDay.setDate(lastPlayedDate.getDate() - i);
            
            // Check if this day is still in current week
            const streakDayStart = new Date(streakDay);
            streakDayStart.setDate(streakDay.getDate() - streakDay.getDay());
            
            if (streakDayStart.getTime() === startOfCurrentWeek.getTime()) {
              const dayOfWeek = streakDay.getDay();
              expectedWeekly[dayOfWeek] = true;
              const dateString = streakDay.toISOString().split('T')[0];
              addTestResult(`   Day ${i}: ${dateString} (${dayOfWeek}) -> marked`);
            } else {
              addTestResult(`   Day ${i}: outside current week -> stopped`);
              break;
            }
          }
          
          addTestResult(`Expected weekly: [${expectedWeekly.map((p, i) => `${i}:${p ? 'T' : 'F'}`).join(', ')}]`);
          
          const actualCount = currentData.weeklyProgress.filter(Boolean).length;
          const expectedCount = expectedWeekly.filter(Boolean).length;
          
          addTestResult(`\nActual days marked: ${actualCount}`);
          addTestResult(`Expected days marked: ${expectedCount}`);
          addTestResult(`Match: ${actualCount === expectedCount ? '✅ YES' : '❌ NO'}`);
          
          if (actualCount !== expectedCount) {
            addTestResult('🔧 ISSUE: Weekly progress does not match expected calculation!');
          }
        } else {
          addTestResult('Last played date not in current week - weekly progress should be empty');
        }
      } else {
        addTestResult('No active streak or last played date - weekly progress should be empty');
      }
      
    } catch (error) {
      addTestResult(`❌ Weekly progress logic debug failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const simulateWeeklyProgressIssue = async () => {
    try {
      addTestResult('=== SIMULATING WEEKLY PROGRESS ISSUE ===');
      
      // 1. Get current state
      const beforeData = getStreakData();
      addTestResult(`1. Before: streak=${beforeData.currentStreak}, weekly=[${beforeData.weeklyProgress.map(p => p ? '✓' : '✗').join(',')}]`);
      
      // 2. Force a scenario with higher database streak but inconsistent weekly progress
      const testData = {
        ...beforeData,
        currentStreak: 1, // Local shows 1-day streak
        weeklyProgress: [false, true, false, false, false, false, false], // Monday marked
        dbSyncCompleted: false // Force database resync
      };
      
      addTestResult(`2. Setting test scenario: local streak=1, weekly=[${testData.weeklyProgress.map(p => p ? '✓' : '✗').join(',')}]`);
      saveStreakData(testData);
      
      // 3. Trigger database sync which should pull higher streak from DB
      addTestResult('3. Triggering database sync...');
      
      const { initializeStreakData } = await import('@/utils/streak');
      const afterData = await initializeStreakData();
      
      addTestResult(`4. After: streak=${afterData.currentStreak}, weekly=[${afterData.weeklyProgress.map(p => p ? '✓' : '✗').join(',')}]`);
      
      // 4. Analyze the result
      const weeklyCount = afterData.weeklyProgress.filter(Boolean).length;
      addTestResult(`5. Analysis:`);
      addTestResult(`   Streak count: ${afterData.currentStreak}`);
      addTestResult(`   Weekly days marked: ${weeklyCount}`);
      addTestResult(`   Ratio: ${weeklyCount}/${afterData.currentStreak}`);
      
      if (afterData.currentStreak > 1 && weeklyCount === 1) {
        addTestResult(`❌ ISSUE CONFIRMED: Multi-day streak (${afterData.currentStreak}) but only 1 day marked in weekly progress`);
        addTestResult(`   This means the weekly progress calculation is not working correctly`);
      } else if (weeklyCount === afterData.currentStreak || (afterData.currentStreak > 7 && weeklyCount <= 7)) {
        addTestResult(`✅ GOOD: Weekly progress matches expected pattern`);
      } else {
        addTestResult(`⚠️  UNEXPECTED: Unusual weekly progress pattern`);
      }
      
      // 5. Update display
      setStreakData(afterData);
      
    } catch (error) {
      addTestResult(`❌ Simulation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const debugWeeklyProgressDetailed = () => {
    try {
      addTestResult('=== DETAILED WEEKLY PROGRESS DEBUG ===');
      
      const currentData = getStreakData();
      const currentDate = getPacificDateString();
      const currentDayOfWeek = getPacificDayOfWeek();
      
      addTestResult(`Current state:`);
      addTestResult(`  Streak: ${currentData.currentStreak} days`);
      addTestResult(`  Last played: ${currentData.lastPlayedDate}`);
      addTestResult(`  Current date: ${currentDate}`);
      addTestResult(`  Current day: ${currentDayOfWeek} (0=Sun, 1=Mon, etc.)`);
      addTestResult(`  Weekly: [${currentData.weeklyProgress.map((p, i) => `${i}:${p ? 'T' : 'F'}`).join(', ')}]`);
      
      if (currentData.currentStreak > 1 && currentData.lastPlayedDate) {
        addTestResult(`\nCalculating expected weekly progress:`);
        
        // Simulate the logic from mergeStreakData
        const today = new Date();
        const pacificToday = new Date(today.toLocaleString("en-US", {timeZone: "America/Los_Angeles"}));
        const startOfCurrentWeek = new Date(pacificToday);
        startOfCurrentWeek.setDate(pacificToday.getDate() - pacificToday.getDay());
        
        addTestResult(`  Start of current week: ${startOfCurrentWeek.toISOString().split('T')[0]}`);
        
        const lastPlayedDateObj = new Date(currentData.lastPlayedDate + 'T00:00:00-08:00');
        addTestResult(`  Last played date obj: ${lastPlayedDateObj.toISOString()}`);
        
        // Build consecutive dates
        const consecutiveDates: string[] = [];
        for (let i = 0; i < currentData.currentStreak; i++) {
          const streakDate = new Date(lastPlayedDateObj);
          streakDate.setDate(lastPlayedDateObj.getDate() - i);
          
          // Use the same conversion function
          const { convertUTCToPacificDateString } = require('@/utils/streak');
          const dateString = convertUTCToPacificDateString(streakDate);
          consecutiveDates.push(dateString);
          
          addTestResult(`  Consecutive day ${i + 1}: ${dateString} (${streakDate.toISOString()})`);
        }
        
        // Check which dates fall in current week
        const expectedWeekly = [false, false, false, false, false, false, false];
        consecutiveDates.forEach((dateString) => {
          const streakDateObj = new Date(dateString + 'T00:00:00-08:00');
          const startOfStreakDateWeek = new Date(streakDateObj);
          startOfStreakDateWeek.setDate(streakDateObj.getDate() - streakDateObj.getDay());
          
          const isInCurrentWeek = startOfCurrentWeek.getTime() === startOfStreakDateWeek.getTime();
          const dayOfWeek = streakDateObj.getDay();
          
          addTestResult(`  Date ${dateString}: day=${dayOfWeek}, inCurrentWeek=${isInCurrentWeek}`);
          
          if (isInCurrentWeek) {
            expectedWeekly[dayOfWeek] = true;
            addTestResult(`    -> Marked day ${dayOfWeek}`);
          }
        });
        
        const expectedCount = expectedWeekly.filter(Boolean).length;
        const actualCount = currentData.weeklyProgress.filter(Boolean).length;
        
        addTestResult(`\nComparison:`);
        addTestResult(`  Expected weekly: [${expectedWeekly.map((p, i) => `${i}:${p ? 'T' : 'F'}`).join(', ')}]`);
        addTestResult(`  Actual weekly:   [${currentData.weeklyProgress.map((p, i) => `${i}:${p ? 'T' : 'F'}`).join(', ')}]`);
        addTestResult(`  Expected count: ${expectedCount}`);
        addTestResult(`  Actual count: ${actualCount}`);
        addTestResult(`  Match: ${expectedCount === actualCount ? '✅ YES' : '❌ NO'}`);
        
        if (expectedCount !== actualCount) {
          addTestResult(`🔧 ISSUE: Weekly progress calculation is not working as expected!`);
        }
      }
      
    } catch (error) {
      addTestResult(`❌ Detailed debug failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const testValidationLogicFix = async () => {
    try {
      addTestResult('=== VALIDATION LOGIC FIX TEST ===');
      addTestResult('Testing that weekly progress validation no longer over-corrects valid data');
      
      // 1. Store original data
      const originalData = getStreakData();
      addTestResult(`1. Saved original data: streak=${originalData.currentStreak}`);
      
      // 2. Create a test scenario: 3-day streak with 3 consecutive days in current week
      const today = new Date();
      const pacificToday = new Date(today.toLocaleString("en-US", {timeZone: "America/Los_Angeles"}));
      const todayString = pacificToday.toISOString().split('T')[0];
      const todayDayOfWeek = pacificToday.getDay();
      
      // Create weekly progress that has 3 consecutive days including today
      const weeklyProgress = [false, false, false, false, false, false, false];
      for (let i = 0; i < 3; i++) {
        const dayIndex = (todayDayOfWeek - i + 7) % 7;
        weeklyProgress[dayIndex] = true;
      }
      
      const testData = {
        ...originalData,
        currentStreak: 3,
        lastPlayedDate: todayString,
        weeklyProgress: weeklyProgress,
        dbSyncCompleted: true
      };
      
      addTestResult(`2. Test scenario: 3-day streak with ${weeklyProgress.filter(Boolean).length} days marked in weekly progress`);
      addTestResult(`   Weekly progress: [${weeklyProgress.map((p, i) => `${i}:${p ? 'T' : 'F'}`).join(', ')}]`);
      
      // 3. Save this data - this should NOT be auto-corrected anymore
      addTestResult('3. Saving data with validation logic...');
      saveStreakData(testData);
      
      // 4. Retrieve data to see if it was auto-corrected
      const retrievedData = getStreakData();
      const retrievedWeeklyCount = retrievedData.weeklyProgress.filter(Boolean).length;
      
      addTestResult(`4. Retrieved data: streak=${retrievedData.currentStreak}, weekly count=${retrievedWeeklyCount}`);
      addTestResult(`   Weekly progress: [${retrievedData.weeklyProgress.map((p, i) => `${i}:${p ? 'T' : 'F'}`).join(', ')}]`);
      
      // 5. Check if the validation logic preserved the correct data
      const wasAutoCorret = retrievedWeeklyCount !== 3;
      if (wasAutoCorret) {
        addTestResult(`❌ VALIDATION BUG: Data was auto-corrected from 3 days to ${retrievedWeeklyCount} days`);
        addTestResult(`   This indicates the validation logic is still too aggressive`);
      } else {
        addTestResult(`✅ VALIDATION FIX CONFIRMED: Data preserved correctly (3 days = 3 days)`);
        addTestResult(`   Weekly progress validation is now working properly`);
      }
      
      // 6. Test merge scenario by forcing database sync with different data
      addTestResult('5. Testing database merge scenario...');
      
      // Reset dbSyncCompleted flag to trigger merge during initialization
      const premergeData = {
        ...testData,
        dbSyncCompleted: false,
        currentStreak: 1 // Force merge by having lower local streak
      };
      saveStreakData(premergeData);
      
      // Trigger initialization which should call merge logic
      const { initializeStreakData } = await import('@/utils/streak');
      const mergedResult = await initializeStreakData();
      const mergedWeeklyCount = mergedResult.weeklyProgress.filter(Boolean).length;
      
      addTestResult(`   Merged result: streak=${mergedResult.currentStreak}, weekly count=${mergedWeeklyCount}`);
      
      if (mergedResult.currentStreak >= 3 && mergedWeeklyCount < 3) {
        addTestResult(`❌ MERGE BUG: Multi-day streak but weekly progress was over-corrected during merge`);
      } else {
        addTestResult(`✅ MERGE FIX CONFIRMED: Database merge preserved proper weekly progress`);
      }
      
      // 7. Restore original data
      saveStreakData(originalData);
      setStreakData(originalData);
      addTestResult('6. Restored original data');
      
    } catch (error) {
      addTestResult(`❌ Validation logic test failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const testConsecutiveDaysFix = async () => {
    try {
      addTestResult('=== CONSECUTIVE DAYS FIX TEST ===');
      addTestResult('Testing that consecutive streak days are properly marked in weekly progress');
      
      // Store original data
      const originalData = getStreakData();
      addTestResult(`1. Saved original data: streak=${originalData.currentStreak}`);
      
      // Test scenario: Simulate a user completing levels on consecutive days
      const today = new Date();
      const pacificToday = new Date(today.toLocaleString("en-US", {timeZone: "America/Los_Angeles"}));
      const todayString = pacificToday.toISOString().split('T')[0];
      
      addTestResult(`2. Today is: ${todayString} (day ${pacificToday.getDay()})`);
      
      // Reset to clean state
      resetStreak();
      addTestResult('3. Reset to clean state');
      
      // Simulate playing yesterday (to create a 2-day streak when we play today)
      const yesterdayDate = new Date(pacificToday);
      yesterdayDate.setDate(pacificToday.getDate() - 1);
      const yesterdayString = yesterdayDate.toISOString().split('T')[0];
      
      addTestResult(`4. Simulating play on yesterday: ${yesterdayString}`);
      
      // Set up a scenario where we played yesterday
      const yesterdayData = {
        currentStreak: 1,
        lastPlayedLevel: 100,
        lastPlayedDate: yesterdayString,
        weeklyProgress: [false, false, false, false, false, false, false],
        badges: { threeDays: false, fiveDays: false, sevenDays: false, thirtyOneDays: false, fiftyDays: false, oneHundredDays: false, oneHundredFiftyDays: false, twoHundredDays: false, threeSixtyFiveDays: false },
        notificationsEnabled: false,
        dbSyncCompleted: true
      };
      
      // Mark yesterday in weekly progress
      yesterdayData.weeklyProgress[yesterdayDate.getDay()] = true;
      saveStreakData(yesterdayData);
      
      addTestResult(`5. Set up yesterday's state: streak=1, yesterday marked in weekly progress`);
      
      // Now simulate playing today (this should create a 2-day streak)
      addTestResult('6. Simulating playing today to create 2-day streak...');
      const { updateStreakOnLevelCompletion } = await import('@/utils/streak');
      const todayResult = updateStreakOnLevelCompletion();
      
      addTestResult(`7. After playing today:`);
      addTestResult(`   Streak count: ${todayResult.currentStreak}`);
      addTestResult(`   Last played: ${todayResult.lastPlayedDate}`);
      
      const markedDays = todayResult.weeklyProgress.filter(Boolean).length;
      const markedDaysList = todayResult.weeklyProgress.map((marked, i) => marked ? i : null).filter(i => i !== null);
      
      addTestResult(`   Weekly progress: ${markedDays} days marked`);
      addTestResult(`   Marked days: [${markedDaysList.join(', ')}] (0=Sun, 1=Mon, etc.)`);
      
      // Check if both consecutive days are marked
      const yesterdayDayOfWeek = yesterdayDate.getDay();
      const todayDayOfWeek = pacificToday.getDay();
      
      const yesterdayMarked = todayResult.weeklyProgress[yesterdayDayOfWeek];
      const todayMarked = todayResult.weeklyProgress[todayDayOfWeek];
      
      addTestResult(`8. Validation:`);
      addTestResult(`   Expected: Both yesterday (day ${yesterdayDayOfWeek}) and today (day ${todayDayOfWeek}) should be marked`);
      addTestResult(`   Yesterday marked: ${yesterdayMarked ? '✅' : '❌'}`);
      addTestResult(`   Today marked: ${todayMarked ? '✅' : '❌'}`);
      
      if (todayResult.currentStreak === 2 && yesterdayMarked && todayMarked && markedDays === 2) {
        addTestResult('✅ SUCCESS: Consecutive days fix is working correctly!');
        addTestResult('   - 2-day streak created');
        addTestResult('   - Both consecutive days marked in weekly progress');
        addTestResult('   - No over-correction by validation logic');
      } else {
        addTestResult('❌ ISSUE: Consecutive days fix is not working properly');
        if (todayResult.currentStreak !== 2) {
          addTestResult(`   - Expected 2-day streak, got ${todayResult.currentStreak}`);
        }
        if (!yesterdayMarked || !todayMarked) {
          addTestResult(`   - Missing day markers: yesterday=${yesterdayMarked}, today=${todayMarked}`);
        }
        if (markedDays !== 2) {
          addTestResult(`   - Expected 2 days marked, got ${markedDays}`);
        }
      }
      
      // Test with a longer streak that spans the week boundary
      addTestResult('9. Testing week boundary scenario...');
      
      // Create a 5-day streak that crosses into this week
      const fiveDaysAgo = new Date(pacificToday);
      fiveDaysAgo.setDate(pacificToday.getDate() - 4); // 5 days total including today
      
      const weekBoundaryData = {
        currentStreak: 5,
        lastPlayedLevel: 100,
        lastPlayedDate: todayString,
        weeklyProgress: [false, false, false, false, false, false, false],
        badges: { threeDays: true, fiveDays: true, sevenDays: false, thirtyOneDays: false, fiftyDays: false, oneHundredDays: false, oneHundredFiftyDays: false, twoHundredDays: false, threeSixtyFiveDays: false },
        notificationsEnabled: false,
        dbSyncCompleted: true
      };
      
      // Manually calculate which days should be marked (working backwards from today)
      let expectedMarkedCount = 0;
      const startOfCurrentWeek = new Date(pacificToday);
      startOfCurrentWeek.setDate(pacificToday.getDate() - pacificToday.getDay());
      
      for (let i = 0; i < 5; i++) {
        const testDate = new Date(pacificToday);
        testDate.setDate(pacificToday.getDate() - i);
        
        const testWeekStart = new Date(testDate);
        testWeekStart.setDate(testDate.getDate() - testDate.getDay());
        
        if (testWeekStart.getTime() === startOfCurrentWeek.getTime()) {
          weekBoundaryData.weeklyProgress[testDate.getDay()] = true;
          expectedMarkedCount++;
        }
      }
      
      saveStreakData(weekBoundaryData);
      
      const boundaryResult = getStreakData();
      const boundaryMarkedCount = boundaryResult.weeklyProgress.filter(Boolean).length;
      
      addTestResult(`   5-day streak: ${boundaryMarkedCount} days marked in current week (expected: ${expectedMarkedCount})`);
      
      if (boundaryMarkedCount === expectedMarkedCount && boundaryResult.currentStreak === 5) {
        addTestResult('✅ Week boundary test passed');
      } else {
        addTestResult('❌ Week boundary test failed');
      }
      
      // Restore original data
      saveStreakData(originalData);
      setStreakData(originalData);
      addTestResult('10. Restored original data');
      
    } catch (error) {
      addTestResult(`❌ Consecutive days test failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const testRecalculateWeeklyProgress = async () => {
    try {
      addTestResult('=== RECALCULATE WEEKLY PROGRESS TEST ===');
      addTestResult('Testing retroactive fix of weekly progress for existing streaks');
      
      // Store original data
      const originalData = getStreakData();
      addTestResult(`1. Current state: streak=${originalData.currentStreak}, weekly progress has ${originalData.weeklyProgress.filter(Boolean).length} days marked`);
      
      // Show current weekly progress
      const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const currentProgress = originalData.weeklyProgress.map((marked, i) => `${weekDays[i]}:${marked ? '✅' : '❌'}`).join(' ');
      addTestResult(`   Current weekly progress: ${currentProgress}`);
      
      if (originalData.currentStreak === 0) {
        addTestResult('⚠️ No current streak to recalculate. Creating a test scenario...');
        
        // Create a test scenario with a streak but missing weekly progress
        const testData = {
          currentStreak: 3,
          lastPlayedLevel: 100,
          lastPlayedDate: getPacificDateString(),
          weeklyProgress: [false, false, false, false, false, false, false], // Intentionally all false
          badges: { threeDays: true, fiveDays: false, sevenDays: false, thirtyOneDays: false, fiftyDays: false, oneHundredDays: false, oneHundredFiftyDays: false, twoHundredDays: false, threeSixtyFiveDays: false },
          notificationsEnabled: false,
          dbSyncCompleted: true
        };
        
        saveStreakData(testData);
        addTestResult('2. Created test scenario: 3-day streak with empty weekly progress');
      }
      
      // Run the recalculation
      addTestResult('3. Running recalculateWeeklyProgress()...');
      const updatedData = recalculateWeeklyProgress();
      
      addTestResult('4. ✅ Recalculation completed');
      
      const updatedProgress = updatedData.weeklyProgress.map((marked: boolean, i: number) => `${weekDays[i]}:${marked ? '✅' : '❌'}`).join(' ');
      addTestResult(`   Updated weekly progress: ${updatedProgress}`);
      addTestResult(`   Days now marked: ${updatedData.weeklyProgress.filter(Boolean).length}`);
      
      // Update our local state
      setStreakData(updatedData);
      
      addTestResult('✅ SUCCESS: Weekly progress has been recalculated!');
      addTestResult('   This function can help fix existing user data that was created before the consecutive days fix.');
      
    } catch (error) {
      addTestResult(`❌ Recalculation test failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
            <div className="flex gap-1">
              <input
                type="number"
                placeholder="Level #"
                value={customLevel}
                onChange={(e) => setCustomLevel(e.target.value)}
                className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm"
                min="1"
              />
              <Button 
                onClick={simulateWinForLevel} 
                className="text-sm px-2"
                disabled={!customLevel || isNaN(Number(customLevel))}
              >
                Win
              </Button>
            </div>
            <div className="flex gap-1">
              <input
                type="date"
                placeholder="Date (optional)"
                value={simulationDate}
                onChange={(e) => setSimulationDate(e.target.value)}
                className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm"
              />
              <Button 
                onClick={() => setSimulationDate('')} 
                className="text-sm px-2"
                disabled={!simulationDate}
              >
                Clear
              </Button>
            </div>
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
            <Button onClick={() => { debugWeeklyProgress(); addTestResult('✅ Debug info logged to console'); }} className="w-full text-sm">Debug Weekly Progress</Button>
            <Button onClick={debugWeeklyProgressLogic} className="w-full text-sm">🔍 Debug Weekly Logic</Button>
            <Button onClick={debugWeeklyProgressDetailed} className="w-full text-sm">🔍 Debug Weekly Detailed</Button>
            <Button onClick={debugCurrentState} className="w-full text-sm">Debug Current State</Button>
            <Button onClick={debugStreakFlow} className="w-full text-sm">🔍 Debug Streak Flow</Button>
            <Button onClick={validateCurrentData} className="w-full text-sm">🔍 Validate Data</Button>
            <Button onClick={repairWeeklyProgressData} className="w-full text-sm">🔧 Repair Weekly Progress</Button>
            <Button onClick={testHistoricalStreak} className="w-full text-sm">📊 Test Historical Streak Calculation</Button>
            <Button onClick={testDatabaseSync} className="w-full text-sm">🔄 Test Database Sync Migration</Button>
            <Button onClick={testWeeklyProgressDbSync} className="w-full text-sm">🔄 Test Weekly Progress DB Sync</Button>
            <Button onClick={testValidationLogicFix} className="w-full text-sm">✅ Test Validation Fix</Button>
            <Button onClick={testConsecutiveDaysFix} className="w-full text-sm">🔗 Test Consecutive Days Fix</Button>
            <Button onClick={testRecalculateWeeklyProgress} className="w-full text-sm">🔄 Recalculate Weekly Progress</Button>
            <Button onClick={simulateWeeklyProgressIssue} className="w-full text-sm">🐛 Simulate Weekly Progress Issue</Button>
            <Button onClick={testTimezoneConversion} className="w-full text-sm">🌍 Test Timezone Conversion</Button>
            <Button onClick={clearTestResults} className="w-full text-sm">Clear Results</Button>
            <Button onClick={clearCorruptedData} className="w-full text-sm text-red-600">
              Clear Corrupted Data
            </Button>
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
