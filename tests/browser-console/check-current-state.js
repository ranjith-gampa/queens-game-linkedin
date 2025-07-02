// Quick browser console script to check current streak state
// Run this in the browser console at http://localhost:5175/test-notifications

function checkCurrentStreakState() {
  console.log('=== CURRENT STREAK STATE ===');
  
  try {
    // Get data from localStorage
    const streakData = JSON.parse(localStorage.getItem('queensGameStreak') || '{}');
    
    console.log('Raw localStorage data:', streakData);
    console.log('Current streak:', streakData.currentStreak || 0);
    console.log('Last played date:', streakData.lastPlayedDate || 'none');
    console.log('Weekly progress:', streakData.weeklyProgress || []);
    
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    if (streakData.weeklyProgress) {
      const progress = streakData.weeklyProgress.map((marked, i) => `${weekDays[i]}:${marked ? '✅' : '❌'}`).join(' ');
      console.log('Weekly progress formatted:', progress);
      console.log('Days marked:', streakData.weeklyProgress.filter(Boolean).length);
    }
    
    // Check current Pacific time
    const now = new Date();
    const pacificTime = new Date(now.toLocaleString("en-US", {timeZone: "America/Los_Angeles"}));
    const todayString = pacificTime.toISOString().split('T')[0];
    const dayOfWeek = pacificTime.getDay();
    
    console.log('Current Pacific date:', todayString);
    console.log('Current day of week:', `${dayOfWeek} (${weekDays[dayOfWeek]})`);
    
    // Analysis
    if (streakData.currentStreak > 0 && streakData.weeklyProgress) {
      const markedDays = streakData.weeklyProgress.filter(Boolean).length;
      if (markedDays === 0) {
        console.log('🚨 ISSUE DETECTED: Active streak but no days marked in weekly progress');
      } else if (streakData.currentStreak > markedDays) {
        console.log('⚠️ POTENTIAL ISSUE: Streak count higher than marked days (might be from previous weeks)');
      } else {
        console.log('✅ Weekly progress looks reasonable');
      }
    }
    
  } catch (error) {
    console.error('Error checking streak state:', error);
  }
}

// Run the check
checkCurrentStreakState();

// Also provide a function to easily test the recalculation
function testRecalculation() {
  console.log('=== TESTING RECALCULATION ===');
  
  // This assumes the streak utils are available (might need to import in real app)
  // For now just log what would happen
  console.log('To test recalculation, use the "🔄 Recalculate Weekly Progress" button in the test interface');
}

console.log('Available functions: checkCurrentStreakState(), testRecalculation()');
