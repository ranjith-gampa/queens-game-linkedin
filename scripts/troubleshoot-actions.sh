#!/bin/bash

# GitHub Actions Troubleshooting Script
# This script helps diagnose why automated workflows might not be triggering

echo "🔍 GitHub Actions Automation Troubleshooting"
echo "============================================="

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo "❌ Not in a git repository"
    exit 1
fi

echo ""
echo "📂 Repository Information:"
echo "   Current branch: $(git branch --show-current)"
echo "   Remote URL: $(git remote get-url origin 2>/dev/null || echo 'No origin remote')"

# Check if workflow file exists
echo ""
echo "📄 Workflow File Status:"
if [ -f ".github/workflows/auto-add-level.yml" ]; then
    echo "   ✅ Workflow file exists: .github/workflows/auto-add-level.yml"
    
    # Check if it's committed
    if git diff --quiet .github/workflows/auto-add-level.yml; then
        echo "   ✅ Workflow file is committed (no local changes)"
    else
        echo "   ⚠️  Workflow file has uncommitted changes"
        echo "      → Run: git add .github/workflows/auto-add-level.yml && git commit -m 'Update workflow schedule'"
    fi
    
    # Check if it's pushed
    if git diff --quiet origin/main .github/workflows/auto-add-level.yml 2>/dev/null; then
        echo "   ✅ Workflow file is pushed to origin/main"
    else
        echo "   ⚠️  Workflow file is not pushed to GitHub"
        echo "      → Run: git push origin main"
    fi
else
    echo "   ❌ Workflow file not found: .github/workflows/auto-add-level.yml"
    exit 1
fi

# Check current cron schedule
echo ""
echo "⏰ Cron Schedule Analysis:"
cron_line=$(grep "cron:" .github/workflows/auto-add-level.yml | head -1)
if [ -n "$cron_line" ]; then
    echo "   Current schedule: $cron_line"
    
    # Extract the cron expression
    cron_expr=$(echo "$cron_line" | sed "s/.*cron: *['\"]//; s/['\"].*//" | tr -d "'\"")
    echo "   Cron expression: $cron_expr"
    
    # Parse cron components
    IFS=' ' read -r minute hour day month dayofweek <<< "$cron_expr"
    echo "   Parsed: $minute minutes, $hour hours, $day day, $month month, $dayofweek day-of-week"
    
    # Convert UTC to Pacific Time
    hour_num=$((10#$hour))
    
    # Calculate Pacific times
    pst_hour=$(( (hour_num - 8 + 24) % 24 ))
    pdt_hour=$(( (hour_num - 7 + 24) % 24 ))
    
    echo ""
    echo "   🌍 UTC Time: $(printf "%02d:%02d" $hour_num $((10#$minute)))"
    echo "   🇺🇸 PST Time: $(printf "%02d:%02d" $pst_hour $((10#$minute))) (UTC-8, Nov-Mar)"
    echo "   🇺🇸 PDT Time: $(printf "%02d:%02d" $pdt_hour $((10#$minute))) (UTC-7, Mar-Nov)"
    
    # Current Pacific Time info
    current_pacific=$(TZ=America/Los_Angeles date '+%H:%M %Z')
    echo "   🕐 Current Pacific: $current_pacific"
    
    # Determine if we're in PDT or PST
    tz_name=$(TZ=America/Los_Angeles date '+%Z')
    if [ "$tz_name" = "PDT" ]; then
        target_time=$(printf "%02d:%02d PDT" $pdt_hour $((10#$minute)))
    else
        target_time=$(printf "%02d:%02d PST" $pst_hour $((10#$minute)))
    fi
    echo "   🎯 Target time: $target_time"
    
else
    echo "   ❌ No cron schedule found in workflow"
fi

# Check repository settings that might affect Actions
echo ""
echo "🔧 GitHub Actions Requirements:"
echo "   ✅ Repository must be public OR have GitHub Actions enabled for private repos"
echo "   ✅ Repository must have recent activity (GitHub disables workflows in inactive repos)"
echo "   ✅ Workflow file must be on the default branch (usually 'main' or 'master')"
echo "   ✅ No syntax errors in the workflow YAML file"

# Check for recent commits
echo ""
echo "📅 Recent Activity:"
last_commit=$(git log -1 --format="%cr" 2>/dev/null || echo "unknown")
echo "   Last commit: $last_commit"

if [ "$last_commit" != "unknown" ]; then
    # Convert relative time to check if it's been more than 60 days
    if echo "$last_commit" | grep -q "months\|years"; then
        echo "   ⚠️  Repository might be considered inactive by GitHub"
        echo "      → Make a commit or push to reactivate scheduled workflows"
    else
        echo "   ✅ Repository has recent activity"
    fi
fi

# Test manual trigger
echo ""
echo "🧪 Testing Options:"
echo "   1. Manual trigger test:"
echo "      → Go to: https://github.com/$(git remote get-url origin | sed 's/.*github.com[:/]//; s/\.git$//')/actions"
echo "      → Find 'Auto Add Daily Level' workflow"
echo "      → Click 'Run workflow' button"
echo ""
echo "   2. Verify workflow syntax:"
echo "      → Use: gh workflow list (requires GitHub CLI)"
echo "      → Or check the Actions tab for any error indicators"
echo ""
echo "   3. Check workflow runs:"
echo "      → Look for any failed runs in the Actions tab"
echo "      → Check if there are permission errors or other issues"

# Next steps
echo ""
echo "🚀 Next Steps:"
echo "   1. Commit and push any workflow changes"
echo "   2. Wait for the scheduled time (next run: $target_time)"
echo "   3. Check the Actions tab for execution"
echo "   4. Use manual trigger to test immediately"

echo ""
echo "✅ Troubleshooting complete!"
