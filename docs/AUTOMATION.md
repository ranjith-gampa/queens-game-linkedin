# Level Automation Documentation

This document describes the automated level addition system for the Queens Game project.

## Overview

The project now includes automated level addition that runs daily at 00:00 AM Pacific Time. The system automatically:

- Adds regular levels on weekdays (Monday-Saturday)
- Adds **both regular AND bonus levels** on Sundays
- Commits and pushes changes to GitHub
- Triggers Vercel deployment automatically

## Components

### 1. GitHub Actions Workflows

#### `auto-add-level.yml`
- **Trigger**: Daily at 00:00 AM Pacific Time (08:00 UTC)
- **Purpose**: Automatically add new levels based on the day of the week
- **Features**:
  - Smart detection of level type (regular vs bonus)
  - Duplicate level detection
  - Error handling with issue creation
  - Debug artifact collection

#### `manual-add-level.yml`
- **Trigger**: Manual workflow dispatch
- **Purpose**: Allow manual level addition for testing or special cases
- **Features**:
  - Choice between regular and bonus levels
  - Custom level number specification
  - Headless/visible browser mode option

### 2. Enhanced Automation Script

#### `scripts/automate-level.sh`
- Wrapper script with enhanced error handling
- Dependency checking
- Level existence verification
- Support for both CI and local development

### 3. Original TypeScript Script

#### `scripts/addLevel.ts`
- Original level addition logic using Playwright
- Captures screenshots from LinkedIn
- Generates level files
- Updates project files

## Usage

### Automatic (Production)
The automation runs automatically every day at midnight Pacific Time. No manual intervention required.

### Manual Testing

#### Via npm scripts:
```bash
# Auto-determine level type (regular on weekdays, bonus on Sundays)
npm run add:auto

# Same as above but with visible browser (for debugging)
npm run add:auto:visible

# Traditional manual methods
npm run add:level -- --level 432
npm run add:bonus
```

#### Via shell script:
```bash
# Auto-determine level type
./scripts/automate-level.sh auto

# Add specific regular level
./scripts/automate-level.sh regular 432

# Add bonus level for today
./scripts/automate-level.sh bonus

# Add regular level with visible browser
./scripts/automate-level.sh regular 432 false
```

#### Via GitHub Actions:
1. Go to the Actions tab in your GitHub repository
2. Select "Add Level - Manual Trigger"
3. Click "Run workflow"
4. Choose your options and run

## Schedule Details

### Regular Levels (Monday-Saturday)
- **Time**: 00:00 AM Pacific Time
- **Frequency**: Daily
- **Action**: Adds the next sequential regular level

### Sundays (Double Addition)
- **Time**: 00:00 AM Pacific Time  
- **Frequency**: Weekly
- **Action**: Adds **both** the next sequential regular level AND a bonus level for the current Sunday date

## Error Handling

### Automatic Issue Creation
If the automation fails:
1. Debug artifacts (screenshots, logs) are uploaded
2. A GitHub issue is automatically created with:
   - Failure details
   - Link to the failed workflow run
   - Debug information

### Common Failure Scenarios
- LinkedIn website changes
- Level already exists
- Network connectivity issues
- Browser automation failures

## Monitoring

### Success Indicators
- New commit appears in the repository
- Vercel deployment is triggered
- New level files are created in the appropriate directories

### Failure Indicators
- No new commits after scheduled time
- GitHub issue created with "automation" label
- Failed workflow run in Actions tab

## Configuration

### Timezone
The automation uses Pacific Time (America/Los_Angeles) to match LinkedIn's daily reset schedule.

### Browser Mode
- **Production**: Headless mode (faster, no UI)
- **Development**: Can use visible mode for debugging

### File Paths
- Regular levels: `src/utils/levels/level{number}.ts`
- Bonus levels: `src/utils/bonus-levels/{date}.ts`
- Screenshots: `scripts/level-{number}-screenshot.png`

## Maintenance

### Updating the Schedule
Edit the cron expression in `.github/workflows/auto-add-level.yml`:
```yaml
schedule:
  - cron: '0 8 * * *'  # 00:00 AM Pacific = 08:00 UTC
```

### Disabling Automation
Comment out or remove the `schedule` trigger in the workflow file.

### Adding Manual Oversight
Set the PR workflow option to `true` in the workflow to create pull requests instead of direct commits:
```yaml
- name: Create PR instead of direct push (alternative approach)
  if: true  # Change this to true
```

## Troubleshooting

### Script Permissions
If you get permission errors:
```bash
chmod +x ./scripts/automate-level.sh
```

### Dependencies
Ensure all required packages are installed:
```bash
npm ci
npx playwright install chromium
```

### Testing Locally
Run the automation script locally to test:
```bash
./scripts/automate-level.sh auto
```

### Manual Backup
If automation fails, you can always fall back to manual level addition:
```bash
npx tsx ./scripts/addLevel.ts --level 432 --headless=false
```

## Security Considerations

- The automation uses GitHub's built-in `GITHUB_TOKEN`
- No external secrets or credentials are required
- All operations are performed within GitHub's secure environment
- Browser automation runs in isolated containers

## Future Enhancements

Potential improvements to consider:
- Slack/Discord notifications for failures
- Level quality validation before commit
- Automatic screenshot verification
- Multi-level batch processing
- Rollback capabilities for failed levels
