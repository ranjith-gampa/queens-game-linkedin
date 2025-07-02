// Test script to verify weekly progress fix
console.log('Testing weekly progress fix...');

// Simulate having a 2-day streak from database but weekly progress showing only 1 day
async function testWeeklyProgressFix() {
  try {
    // 1. Clear existing data
    localStorage.removeItem('queensGameStreak');
    console.log('1. Cleared existing streak data');
    
    // 2. Import functions
    const { getStreakData, saveStreakData, getPacificDateString, initializeStreakData } = 
      await import('./src/utils/streak.ts');
    
    // 3. Create a scenario where local data has 1-day streak, weekly progress has 1 day marked
    const currentDate = getPacificDateString();
    const testLocalData = {
      currentStreak: 1,
      lastPlayedLevel: 426, // Example level
      lastPlayedDate: currentDate,
      weeklyProgress: [false, true, false, false, false, false, false], // Only Monday marked
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
      dbSyncCompleted: false // This will trigger database sync
    };
    
    console.log('2. Created test local data with 1-day streak and 1 day marked in weekly progress');
    saveStreakData(testLocalData);
    
    // 4. Trigger initialization (this should sync with database)
    console.log('3. Triggering database sync via initializeStreakData...');
    const syncedData = await initializeStreakData();
    
    console.log('4. Results after database sync:');
    console.log(`   Current streak: ${syncedData.currentStreak}`);
    console.log(`   Last played date: ${syncedData.lastPlayedDate}`);
    console.log(`   Weekly progress: [${syncedData.weeklyProgress.map((p, i) => `${i}:${p ? 'T' : 'F'}`).join(', ')}]`);
    
    const weeklyCount = syncedData.weeklyProgress.filter(Boolean).length;
    console.log(`   Days marked in weekly progress: ${weeklyCount}`);
    console.log(`   Expected match: ${weeklyCount} should be <= ${syncedData.currentStreak}`);
    
    if (weeklyCount <= syncedData.currentStreak || syncedData.currentStreak === 0) {
      console.log('✅ SUCCESS: Weekly progress is consistent with streak count');
    } else {
      console.log('❌ FAILURE: Weekly progress does not match streak count');
    }
    
    // 5. Test the specific scenario: 2-day streak should show 2 days in weekly progress (if both in current week)
    if (syncedData.currentStreak === 2 && weeklyCount === 1) {
      console.log('⚠️  ISSUE REPRODUCED: 2-day streak but only 1 day marked in weekly progress');
      console.log('This indicates the weekly progress calculation is still not working correctly');
    }
    
  } catch (error) {
    console.error('Test failed:', error);
  }
}

// Run the test
testWeeklyProgressFix();
