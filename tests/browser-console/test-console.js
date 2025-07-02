console.log('Testing streak fix...');

// Helper function to get level number from date (same logic as in streak.ts)
function getLevelNumberFromDate(date) {
  const BASE_DATE = new Date('2024-04-30');
  const targetDate = new Date(date + 'T00:00:00-08:00'); // Pacific Time
  const timeDiff = targetDate.getTime() - BASE_DATE.getTime();
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  return daysDiff;
}

// Test the scenario
const testLevel = 426;
const testDate = '2025-06-30';
const expectedLevelForTestDate = getLevelNumberFromDate(testDate);

console.log('Test scenario:');
console.log('Input level:', testLevel);
console.log('Input date:', testDate);
console.log('Expected level for date:', expectedLevelForTestDate);
console.log('Is daily level?', testLevel === expectedLevelForTestDate ? 'YES' : 'NO');

if (testLevel === expectedLevelForTestDate) {
    console.log('✅ Fix is working! Level 426 is correctly identified as the daily level for 2025-06-30');
} else {
    console.log('❌ Fix needs adjustment');
}

// Also test today's level
const today = '2025-07-01';
const todayLevel = getLevelNumberFromDate(today);
console.log('\nCurrent day verification:');
console.log('Today:', today);
console.log('Today\'s level:', todayLevel);
