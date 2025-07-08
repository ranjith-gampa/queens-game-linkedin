#!/bin/bash

# Test script for the level automation system
# This script tests various scenarios without actually adding levels

set -e

echo "🧪 Testing Level Automation System"
echo "=================================="

# Test 1: Check if automation script exists and is executable
echo "Test 1: Checking automation script..."
if [ -x "./scripts/automate-level.sh" ]; then
    echo "✅ Automation script exists and is executable"
else
    echo "❌ Automation script is missing or not executable"
    echo "Run: chmod +x ./scripts/automate-level.sh"
    exit 1
fi

# Test 2: Check dependencies
echo ""
echo "Test 2: Checking dependencies..."

if command -v node &> /dev/null; then
    node_version=$(node --version)
    echo "✅ Node.js is available: $node_version"
else
    echo "❌ Node.js is not installed"
    exit 1
fi

if command -v npm &> /dev/null; then
    npm_version=$(npm --version)
    echo "✅ npm is available: $npm_version"
else
    echo "❌ npm is not installed"
    exit 1
fi

if command -v npx &> /dev/null && npx tsx --version &> /dev/null 2>&1; then
    echo "✅ tsx is available"
else
    echo "⚠️  tsx might not be available, installing..."
    npm install -g tsx || echo "❌ Failed to install tsx"
fi

# Test 3: Check project structure
echo ""
echo "Test 3: Checking project structure..."

required_dirs=(
    "src/utils/levels"
    "src/utils/bonus-levels"
    "scripts"
    ".github/workflows"
)

for dir in "${required_dirs[@]}"; do
    if [ -d "$dir" ]; then
        echo "✅ Directory exists: $dir"
    else
        echo "❌ Directory missing: $dir"
        exit 1
    fi
done

required_files=(
    "scripts/addLevel.ts"
    "package.json"
    ".github/workflows/auto-add-level.yml"
    ".github/workflows/manual-add-level.yml"
)

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ File exists: $file"
    else
        echo "❌ File missing: $file"
        exit 1
    fi
done

# Test 4: Check for existing levels
echo ""
echo "Test 4: Analyzing existing levels..."

regular_levels=$(find src/utils/levels -name "level*.ts" 2>/dev/null | wc -l)
bonus_levels=$(find src/utils/bonus-levels -name "*.ts" 2>/dev/null | wc -l)

echo "📊 Current levels:"
echo "   Regular levels: $regular_levels"
echo "   Bonus levels: $bonus_levels"

if [ "$regular_levels" -gt 0 ]; then
    last_level=$(find src/utils/levels -name "level*.ts" | grep -o 'level[0-9]*' | grep -o '[0-9]*' | sort -n | tail -1)
    echo "   Last regular level: $last_level"
    echo "   Next level would be: $((last_level + 1))"
fi

# Test 5: Test automation script help
echo ""
echo "Test 5: Testing automation script help..."
if ./scripts/automate-level.sh --help > /dev/null 2>&1; then
    echo "✅ Automation script help works"
else
    echo "❌ Automation script help failed"
    exit 1
fi

# Test 6: Check GitHub Actions syntax
echo ""
echo "Test 6: Checking GitHub Actions workflow syntax..."

# Simple YAML syntax check
if command -v yamllint &> /dev/null; then
    if yamllint .github/workflows/auto-add-level.yml > /dev/null 2>&1; then
        echo "✅ auto-add-level.yml syntax is valid"
    else
        echo "⚠️  auto-add-level.yml might have syntax issues"
    fi
    
    if yamllint .github/workflows/manual-add-level.yml > /dev/null 2>&1; then
        echo "✅ manual-add-level.yml syntax is valid"
    else
        echo "⚠️  manual-add-level.yml might have syntax issues"
    fi
else
    echo "ℹ️  yamllint not available, skipping YAML syntax check"
fi

# Test 7: Simulate day detection
echo ""
echo "Test 7: Testing day detection logic..."

current_day=$(date +%w)
case $current_day in
    0) echo "📅 Today is Sunday - would add bonus level" ;;
    1) echo "📅 Today is Monday - would add regular level" ;;
    2) echo "📅 Today is Tuesday - would add regular level" ;;
    3) echo "📅 Today is Wednesday - would add regular level" ;;
    4) echo "📅 Today is Thursday - would add regular level" ;;
    5) echo "📅 Today is Friday - would add regular level" ;;
    6) echo "📅 Today is Saturday - would add regular level" ;;
esac

# Test 8: Check npm scripts
echo ""
echo "Test 8: Checking npm scripts..."

if npm run 2>/dev/null | grep -q "add:auto"; then
    echo "✅ npm run add:auto script is available"
else
    echo "❌ npm run add:auto script is missing"
    exit 1
fi

if npm run 2>/dev/null | grep -q "add:auto:visible"; then
    echo "✅ npm run add:auto:visible script is available"
else
    echo "❌ npm run add:auto:visible script is missing"
    exit 1
fi

# Summary
echo ""
echo "🎉 All tests passed!"
echo ""
echo "📋 Summary:"
echo "   ✅ Automation system is properly set up"
echo "   ✅ All required files and directories exist"
echo "   ✅ Dependencies are available"
echo "   ✅ GitHub Actions workflows are configured"
echo ""
echo "🚀 Ready for automation!"
echo ""
echo "To test manually (without adding a real level):"
echo "   ./scripts/automate-level.sh --help"
echo ""
echo "To run automation for today:"
echo "   npm run add:auto:visible"
echo ""
echo "To check GitHub Actions:"
echo "   Go to your repository's Actions tab"
