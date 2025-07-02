// Comprehensive test script for the weekly progress fix
// Run this in the browser console after opening http://localhost:5175/test-notifications

async function runComprehensiveWeeklyProgressTest() {
  console.log('🧪 COMPREHENSIVE WEEKLY PROGRESS TEST');
  console.log('=====================================');
  
  // Helper to log with timestamp
  const log = (message) => {
    const time = new Date().toLocaleTimeString();
    console.log(`[${time}] ${message}`);
  };
  
  // Step 1: Check current state
  log('📊 Step 1: Checking current state...');
  const originalData = JSON.parse(localStorage.getItem('queensGameStreak') || '{}');
  log(`Current streak: ${originalData.currentStreak || 0}`);
  log(`Last played: ${originalData.lastPlayedDate || 'none'}`);
  log(`Weekly progress: ${JSON.stringify(originalData.weeklyProgress || [])}`);
  
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const markedDays = (originalData.weeklyProgress || []).filter(Boolean).length;
  log(`Days marked in weekly progress: ${markedDays}`);
  
  // Step 2: Test scenario - existing streak with missing weekly progress
  log('🔧 Step 2: Testing scenario with existing streak but missing weekly progress...');
  
  // Create a test scenario that simulates the real issue
  const now = new Date();
  const pacificTime = new Date(now.toLocaleString("en-US", {timeZone: "America/Los_Angeles"}));
  const todayString = pacificTime.toISOString().split('T')[0];
  
  const testScenarioData = {
    currentStreak: 4, // User has a 4-day streak
    lastPlayedLevel: 100,
    lastPlayedDate: todayString, // Last played today
    weeklyProgress: [false, false, false, false, false, false, false], // But weekly progress is empty (the bug)
    badges: { threeDays: true, fiveDays: false, sevenDays: false, thirtyOneDays: false, fiftyDays: false, oneHundredDays: false, oneHundredFiftyDays: false, twoHundredDays: false, threeSixtyFiveDays: false },
    notificationsEnabled: false,
    dbSyncCompleted: true
  };
  
  localStorage.setItem('queensGameStreak', JSON.stringify(testScenarioData));
  log('✅ Created test scenario: 4-day streak with empty weekly progress');
  
  // Step 3: Show the problem
  log('🚨 Step 3: Demonstrating the problem...');
  log('This simulates a user who had a streak before the consecutive days fix was deployed');
  log('Weekly progress shows all false despite having a 4-day streak');
  log(`Current weekly display: ${testScenarioData.weeklyProgress.map((marked, i) => `${weekDays[i]}:${marked ? '✅' : '❌'}`).join(' ')}`);
  
  // Step 4: Apply the recalculation fix
  log('🔄 Step 4: Applying recalculation fix...');
  // Since we can't import the actual function in console, we'll show what should happen
  log('In the test interface, you should click "🔄 Recalculate Weekly Progress" to see this in action');
  
  // Simulate what the fix should do
  const dayOfWeek = pacificTime.getDay();
  const expectedWeeklyProgress = [false, false, false, false, false, false, false];
  
  // Mark consecutive days working backwards from today
  for (let i = 0; i < Math.min(4, 7); i++) {
    const testDay = new Date(pacificTime);
    testDay.setDate(pacificTime.getDate() - i);
    const testDayOfWeek = testDay.getDay();
    expectedWeeklyProgress[testDayOfWeek] = true;
  }
  
  log('Expected result after recalculation:');
  log(`Weekly progress should be: ${expectedWeeklyProgress.map((marked, i) => `${weekDays[i]}:${marked ? '✅' : '❌'}`).join(' ')}`);
  log(`Days that should be marked: ${expectedWeeklyProgress.filter(Boolean).length}`);
  
  // Step 5: Test the consecutive days fix for new completions
  log('🆕 Step 5: Testing consecutive days fix for new level completions...');
  log('This tests that new level completions properly mark consecutive days');
  log('Use the "🔗 Test Consecutive Days Fix" button to test this scenario');
  
  // Restore original data
  localStorage.setItem('queensGameStreak', JSON.stringify(originalData));
  log('🔄 Restored original data');
  
  log('✅ Test complete! Use the test interface buttons to run actual tests');
  
  return {
    originalData,
    testScenarioData,
    expectedWeeklyProgress
  };
}

// Helper function to check if the fix worked
function validateWeeklyProgressFix() {
  console.log('🔍 VALIDATING WEEKLY PROGRESS FIX');
  console.log('=================================');
  
  const data = JSON.parse(localStorage.getItem('queensGameStreak') || '{}');
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  console.log(`Current streak: ${data.currentStreak || 0}`);
  console.log(`Weekly progress: ${(data.weeklyProgress || []).map((marked, i) => `${weekDays[i]}:${marked ? '✅' : '❌'}`).join(' ')}`);
  
  const markedDays = (data.weeklyProgress || []).filter(Boolean).length;
  console.log(`Days marked: ${markedDays}`);
  
  if (data.currentStreak > 0 && markedDays === 0) {
    console.log('❌ ISSUE: Active streak but no days marked in weekly progress');
    console.log('👉 Try using the "🔄 Recalculate Weekly Progress" button');
    return false;
  } else if (data.currentStreak > 0 && markedDays > 0) {
    console.log('✅ GOOD: Active streak with days marked in weekly progress');
    return true;
  } else {
    console.log('ℹ️ No active streak to validate');
    return true;
  }
}

console.log('🧪 Available test functions:');
console.log('- runComprehensiveWeeklyProgressTest() - Full test scenario');
console.log('- validateWeeklyProgressFix() - Quick validation check');
console.log('');
console.log('💡 Pro tip: Run these functions, then use the test interface buttons to see the fixes in action!');
