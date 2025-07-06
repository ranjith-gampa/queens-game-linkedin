# Bonus Level Automation - Implementation Summary

## Overview
Enhanced the existing `addLevel.ts` script to support both regular numbered levels and bonus date-based levels.

## New Features Added

### 1. **Bonus Level Support**
- **Command**: `npx tsx ./scripts/addLevel.ts --bonus`
- **URL**: Automatically navigates to `https://www.linkedin.com/games/queens?bonus=true`
- **Date Logic**: Automatically calculates the next Sunday date based on existing bonus levels
- **File Structure**: Creates files in `src/utils/bonus-levels/YYYY-MM-DD.ts` format

### 2. **Automatic Date Calculation**
- Scans existing bonus levels in `src/utils/bonusLevels.ts`
- Finds the latest date and adds 7 days for the next bonus level
- Follows the weekly Sunday schedule pattern

### 3. **Enhanced CLI Interface**
```bash
# Regular levels (existing functionality)
npx tsx ./scripts/addLevel.ts --level 432

# Bonus levels (new functionality)
npx tsx ./scripts/addLevel.ts --bonus

# Show available automation steps
npx tsx ./scripts/addLevel.ts --show-steps
```

### 4. **npm Script Integration**
Added convenient npm scripts:
```json
{
  "add:level": "npx tsx ./scripts/addLevel.ts",
  "add:bonus": "npx tsx ./scripts/addLevel.ts --bonus"
}
```

## Technical Implementation

### Date Management Functions
- `getNextSundayDate()`: Calculates next Sunday from current date
- `getLastBonusLevelDate()`: Scans existing bonus levels to find latest date
- `getNextBonusLevelDate()`: Adds 7 days to last bonus level date
- `formatDateForVariableName()`: Converts YYYY-MM-DD to YYYYMMDD for variable names

### File Management Functions
- `createBonusLevelFile()`: Creates individual bonus level files with proper `path` field injection
- `updatePreviousBonusLevelFile()`: Removes `isNew: true` flag from the previous bonus level file
- `updateBonusLevelsFile()`: Updates the main bonusLevels.ts registry file

### Code Generation Fixes
- **Path Field Injection**: Automatically adds `path: "/bonus-level/YYYY-MM-DD"` field to generated bonus levels
- **Variable Name Normalization**: Converts any `const levelXXXX` (including special characters) to `const level` for consistency
- **Export Statement Fix**: Ensures `export default level` instead of `export default levelXXXX`
- **Previous Level Update**: Automatically removes `isNew: true` from the previous bonus level when adding a new one

## Enhanced Automation Steps

### Bonus Level Process:
1. **Navigate** to bonus game URL (`https://www.linkedin.com/games/queens?bonus=true`)
2. **Start** the game if needed
3. **Capture** screenshot of the game board
4. **Navigate** to level builder
5. **Upload** screenshot to level builder
6. **Select** LinkedIn level type
7. **Set** level name (YYYY-MM-DD format)
8. **Generate** and copy the level code
9. **Create** bonus level file with path field and proper formatting
10. **Update** previous bonus level file (remove `isNew` flag)
11. **Update** bonus levels registry file (add import and export)
12. **Complete** - bonus level ready for play

## File Structure Impact

### Regular Levels (unchanged)
```
src/utils/levels/level432.ts
src/utils/levels.ts (updated with new import/export)
```

### Bonus Levels (new)
```
src/utils/bonus-levels/2025-07-06.ts
src/utils/bonusLevels.ts (updated with new import/export)
```

## Example Usage

### Current State
- Last bonus level: `2025-06-29`
- Next calculated bonus level: `2025-07-06` (today)

### Commands
```bash
# Add regular level 432
npm run add:level -- --level 432

# Add today's bonus level (2025-07-06)
npm run add:bonus

# Run with visible browser for debugging
npm run add:bonus -- --headless=false
```

## Benefits
1. **Automation**: No manual date calculation required
2. **Consistency**: Maintains weekly Sunday schedule automatically
3. **Error Prevention**: Validates date logic and prevents duplicates
4. **Unified Tool**: Single script handles both level types
5. **Easy Usage**: Simple npm scripts for common operations

## Testing Status
✅ Date calculation logic verified
✅ CLI argument parsing works
✅ Navigation to bonus URL successful
✅ Script compilation successful
✅ npm script integration complete
✅ Code transformation logic tested
✅ Path field injection working
✅ Variable name normalization working (including special characters)
✅ Previous bonus level update working
✅ `isNew` flag management working

## Fixed Issues
- **Path Field Missing**: Level builder template doesn't include required `path` field for bonus levels
- **Variable Naming**: Generated code uses invalid variable names with special characters
- **Export Statements**: Export uses invalid variable names instead of generic `level`
- **Previous Level Flag**: Previous bonus level's `isNew` flag wasn't being updated to false

These issues are now automatically resolved by the script's code transformation and file management logic.
