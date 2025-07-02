# Test Scripts

This folder contains test scripts for development and debugging purposes. These files are excluded from the production build.

## Structure

### `streak-fix/`
Contains Node.js test scripts for the streak functionality fix:

- **`test-consecutive-days-comprehensive.js`** - Comprehensive test for consecutive days streak calculation
- **`test-weekly-progress-fix.js`** - Test script for weekly progress array fixes
- **`validate-weekly-progress-fix.js`** - Validation script to check if the streak fixes are working correctly

### `browser-console/`
Contains JavaScript files meant to be run in the browser console during development:

- **`check-current-state.js`** - Quick script to inspect current streak state in localStorage
- **`comprehensive-test.js`** - Full test scenario simulation for browser testing
- **`test-console.js`** - General console testing utilities

## Usage

### Node.js Scripts (streak-fix/)
Run these from the project root:
```bash
node tests/streak-fix/test-consecutive-days-comprehensive.js
node tests/streak-fix/validate-weekly-progress-fix.js
```

### Browser Console Scripts (browser-console/)
1. Open the app in development mode: `npm run dev`
2. Navigate to the test interface: `http://localhost:5173/test-notifications`
3. Open browser console (F12)
4. Copy and paste the contents of any script from `browser-console/` folder
5. Run the functions as needed

For example:
```javascript
// After pasting comprehensive-test.js
runComprehensiveWeeklyProgressTest();  // Run full test scenario
validateWeeklyProgressFix();           // Quick validation check
```

## Weekly Progress Fix Testing

### Test Interface Buttons
The test interface at `/test-notifications` has special buttons for testing the streak functionality:

1. **🔗 Test Consecutive Days Fix** - Tests if consecutive days are properly marked in weekly progress
2. **✅ Test Validation Fix** - Tests that validation logic doesn't over-correct valid data
3. **🔄 Recalculate Weekly Progress** - Tests the fix for existing user data created before the fix
4. **🔍 Debug Weekly Detailed** - Shows detailed debugging information about weekly progress

### Issue Background
The streak system has been fixed to properly mark all consecutive streak days in the weekly progress checkboxes. Previously, only the current day was being marked, which didn't match user expectations for a LinkedIn-style streak display.

### The Fix
1. **Core Fix**: `updateStreakOnLevelCompletion()` and `updateStreakWithDate()` now mark all consecutive streak days that fall within the current week
2. **Validation Fix**: Validation logic has been updated to only trigger when `trueCount > 7` (impossible scenario)
3. **Existing Users Fix**: Added `recalculateWeeklyProgress()` to retroactively fix weekly progress for existing streaks

## Development Only

These test scripts are:
- Excluded from production builds
- Only available in development environment
- Used for debugging and validating streak functionality fixes

## Related

For the main test interface, visit `/test-notifications` page in development mode.

For more details on the streak fix, see `/docs/fixes/weekly-progress-consecutive-days-fix.md`.
