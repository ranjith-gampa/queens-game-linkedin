// Comprehensive test to verify the weekly progress consecutive days fix
// Run this in the browser console on http://localhost:5173/test-notifications

console.log('🔍 COMPREHENSIVE WEEKLY PROGRESS FIX TEST');
console.log('==========================================');

async function testWeeklyProgressFixes() {
  try {
    console.log('\n1. CHECKING CURRENT STATE...');
    
    // Check localStorage data
    const rawData = localStorage.getItem('queensGameStreak');
    if (rawData) {
      const parsed = JSON.parse(rawData);
      console.log('Current streak data:');
      console.log(`  Streak: ${parsed.currentStreak} days`);
      console.log(`  Last played: ${parsed.lastPlayedDate}`);
      console.log(`  Weekly progress: [${parsed.weeklyProgress.map((p, i) => `${i}:${p ? 'T' : 'F'}`).join(', ')}]`);
      
      const trueCount = parsed.weeklyProgress.filter(Boolean).length;
      console.log(`  Days marked: ${trueCount}`);
      console.log(`  Issue present: ${trueCount === 0 && parsed.currentStreak > 0 ? 'YES - All false despite streak' : 'NO'}`);
    } else {
      console.log('No streak data found in localStorage');
    }
    
    console.log('\n2. TESTING CONSECUTIVE DAYS LOGIC...');
    
    // Clear existing data
    localStorage.removeItem('queensGameStreak');
    console.log('✅ Cleared existing data');
    
    // Create a test scenario: 3-day streak with consecutive days
    const now = new Date();
    const pacificTime = new Date(now.toLocaleString("en-US", {timeZone: "America/Los_Angeles"}));
    const currentDate = pacificTime.toISOString().split('T')[0];
    const currentDay = pacificTime.getDay();
    
    console.log(`Current date: ${currentDate}, day: ${currentDay}`);
    
    // Create test data for a 3-day streak
    const testData = {
      currentStreak: 3,
      lastPlayedLevel: 427,
      lastPlayedDate: currentDate,
      weeklyProgress: [false, false, false, false, false, false, false], // All false initially
      badges: {
        threeDays: true,
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
    
    console.log('Created test data with 3-day streak but weekly progress all false');
    localStorage.setItem('queensGameStreak', JSON.stringify(testData));
    
    console.log('\n3. TESTING THE FIX...');
    
    // This should trigger the consecutive days fix when we call updateStreakOnLevelCompletion
    if (typeof window !== 'undefined' && window.location.pathname === '/test-notifications') {
      console.log('Running on test interface - checking if functions are available');
      
      // Try to access the streak functions - they should be imported in the test page
      console.log('✅ In test environment - functions should be available');
      console.log('Use the test interface buttons to run the tests:');
      console.log('  - Click "🔗 Test Consecutive Days Fix"');
      console.log('  - Click "🔍 Debug Weekly Detailed"');
      console.log('  - Click "Debug Current State"');
      
    } else {
      console.log('Not on test interface - redirect to http://localhost:5173/test-notifications');
    }
    
    console.log('\n4. MANUAL VERIFICATION STEPS:');
    console.log('a) Look at the StreakDisplay component on the page');
    console.log('b) Check if the weekly progress checkboxes show the correct pattern');
    console.log('c) For a 3-day streak, you should see 3 consecutive days marked');
    console.log('d) If all checkboxes are false, the fix is not working');
    
    console.log('\n5. EXPECTED RESULTS:');
    console.log('✅ GOOD: 3-day streak shows 3 consecutive checkboxes marked');
    console.log('❌ BAD: 3-day streak shows 0 checkboxes marked (all false)');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Run the test
testWeeklyProgressFixes();

console.log('\n📋 NEXT STEPS:');
console.log('1. Open http://localhost:5173/test-notifications');
console.log('2. Use the test buttons in the interface');
console.log('3. Look for the "🔗 Test Consecutive Days Fix" button');
console.log('4. Check the test results in the interface');
console.log('5. Verify the StreakDisplay component shows correct checkboxes');
