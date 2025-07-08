#!/bin/bash

# Enhanced script for automated level addition with better error handling
# This script wraps the TypeScript addLevel script for use in CI/CD

set -e  # Exit on any error

# Function to log with timestamp
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

# Function to check if running in CI
is_ci() {
    [ "$CI" = "true" ] || [ "$GITHUB_ACTIONS" = "true" ]
}

# Function to check system dependencies
check_dependencies() {
    log "Checking dependencies..."
    
    # Check if Node.js is available
    if ! command -v node &> /dev/null; then
        log "ERROR: Node.js is not installed"
        exit 1
    fi
    
    # Check if npm/yarn is available
    if ! command -v npm &> /dev/null && ! command -v yarn &> /dev/null; then
        log "ERROR: Neither npm nor yarn is installed"
        exit 1
    fi
    
    # Check if tsx is available
    if ! command -v tsx &> /dev/null && ! npx tsx --version &> /dev/null; then
        log "ERROR: tsx is not available"
        exit 1
    fi
    
    log "Dependencies check passed"
}

# Function to check if level already exists
check_level_exists() {
    local level_type="$1"
    local identifier="$2"
    
    if [ "$level_type" = "regular" ]; then
        if [ -f "src/utils/levels/level${identifier}.ts" ]; then
            log "Level $identifier already exists"
            return 0
        fi
    elif [ "$level_type" = "bonus" ]; then
        if [ -f "src/utils/bonus-levels/${identifier}.ts" ]; then
            log "Bonus level for $identifier already exists"
            return 0
        fi
    fi
    
    return 1
}

# Function to get next level number
get_next_level_number() {
    local last_level=$(find src/utils/levels -name "level*.ts" 2>/dev/null | grep -o 'level[0-9]*' | grep -o '[0-9]*' | sort -n | tail -1)
    if [ -z "$last_level" ]; then
        echo "1"
    else
        echo $((last_level + 1))
    fi
}

# Function to get today's date for bonus levels
get_bonus_date() {
    if is_ci; then
        # In CI, use Pacific timezone
        TZ=America/Los_Angeles date +%Y-%m-%d
    else
        # Local development
        date +%Y-%m-%d
    fi
}

# Function to run the level addition script
run_level_script() {
    local level_type="$1"
    local identifier="$2"
    local headless="${3:-true}"
    
    log "Starting level addition process..."
    
    if [ "$level_type" = "regular" ]; then
        log "Adding regular level $identifier"
        npx tsx ./scripts/addLevel.ts --level "$identifier" --headless="$headless"
    elif [ "$level_type" = "bonus" ]; then
        log "Adding bonus level"
        npx tsx ./scripts/addLevel.ts --bonus --headless="$headless"
    else
        log "ERROR: Invalid level type: $level_type"
        exit 1
    fi
}

# Function to verify the level was created successfully
verify_level_created() {
    local level_type="$1"
    local identifier="$2"
    
    if [ "$level_type" = "regular" ]; then
        if [ ! -f "src/utils/levels/level${identifier}.ts" ]; then
            log "ERROR: Level file was not created: src/utils/levels/level${identifier}.ts"
            return 1
        fi
        log "Regular level $identifier created successfully"
    elif [ "$level_type" = "bonus" ]; then
        # For bonus levels, check if any new file was created in bonus-levels directory
        local bonus_files=$(find src/utils/bonus-levels -name "*.ts" -newer scripts/addLevel.ts 2>/dev/null | wc -l)
        if [ "$bonus_files" -eq 0 ]; then
            log "ERROR: No new bonus level file was created"
            return 1
        fi
        log "Bonus level created successfully"
    fi
    
    return 0
}

# Main function
main() {
    local level_type="${1:-auto}"
    local identifier="$2"
    local headless="${3:-true}"
    
    log "Starting automated level addition"
    log "Level type: $level_type"
    log "Identifier: $identifier"
    log "Headless: $headless"
    log "Working directory: $(pwd)"
    
    # Check dependencies
    check_dependencies
    
    # Determine level type and identifier if auto
    if [ "$level_type" = "auto" ]; then
        local day_of_week
        if is_ci; then
            day_of_week=$(TZ=America/Los_Angeles date +%w)
        else
            day_of_week=$(date +%w)
        fi
        
        if [ "$day_of_week" = "0" ]; then
            # Sunday - add both regular and bonus levels
            log "Sunday detected - will add both regular and bonus levels"
            
            # First add regular level
            local regular_identifier=$(get_next_level_number)
            log "Adding regular level $regular_identifier first..."
            
            if ! check_level_exists "regular" "$regular_identifier"; then
                if run_level_script "regular" "$regular_identifier" "$headless"; then
                    log "Regular level $regular_identifier added successfully"
                    if ! verify_level_created "regular" "$regular_identifier"; then
                        log "ERROR: Regular level verification failed"
                        exit 1
                    fi
                else
                    log "ERROR: Failed to add regular level $regular_identifier"
                    exit 1
                fi
            else
                log "Regular level $regular_identifier already exists"
            fi
            
            # Then add bonus level
            local bonus_identifier=$(get_bonus_date)
            log "Adding bonus level for $bonus_identifier..."
            
            if ! check_level_exists "bonus" "$bonus_identifier"; then
                if run_level_script "bonus" "$bonus_identifier" "$headless"; then
                    log "Bonus level for $bonus_identifier added successfully"
                    if ! verify_level_created "bonus" "$bonus_identifier"; then
                        log "ERROR: Bonus level verification failed"
                        exit 1
                    fi
                else
                    log "ERROR: Failed to add bonus level for $bonus_identifier"
                    exit 1
                fi
            else
                log "Bonus level for $bonus_identifier already exists"
            fi
            
            log "Sunday automation completed - both levels processed"
            exit 0
        else
            level_type="regular"
            identifier=$(get_next_level_number)
        fi
        
        log "Auto-determined: $level_type level with identifier $identifier"
    fi
    
    # Validate inputs
    if [ "$level_type" = "regular" ] && [ -z "$identifier" ]; then
        identifier=$(get_next_level_number)
        log "Using next level number: $identifier"
    fi
    
    if [ "$level_type" = "bonus" ] && [ -z "$identifier" ]; then
        identifier=$(get_bonus_date)
        log "Using current date for bonus level: $identifier"
    fi
    
    # Check if level already exists
    if check_level_exists "$level_type" "$identifier"; then
        log "Level already exists, skipping creation"
        exit 0
    fi
    
    # Run the level addition script
    if run_level_script "$level_type" "$identifier" "$headless"; then
        log "Level script completed successfully"
    else
        log "ERROR: Level script failed"
        exit 1
    fi
    
    # Verify the level was created
    if verify_level_created "$level_type" "$identifier"; then
        log "Level creation verified successfully"
    else
        log "ERROR: Level creation verification failed"
        exit 1
    fi
    
    log "Automated level addition completed successfully"
}

# Parse command line arguments
if [ $# -eq 0 ]; then
    # No arguments, run in auto mode
    main "auto"
elif [ "$1" = "--help" ] || [ "$1" = "-h" ]; then
    echo "Usage: $0 [level_type] [identifier] [headless]"
    echo ""
    echo "Arguments:"
    echo "  level_type: 'auto', 'regular', or 'bonus' (default: auto)"
    echo "  identifier: level number for regular, date for bonus (auto-determined if not provided)"
    echo "  headless: true/false for browser mode (default: true)"
    echo ""
    echo "Auto mode behavior:"
    echo "  Monday-Saturday: Adds regular level only"
    echo "  Sunday: Adds BOTH regular level AND bonus level"
    echo ""
    echo "Examples:"
    echo "  $0                           # Auto-determine based on day of week"
    echo "  $0 regular 432              # Add regular level 432"
    echo "  $0 bonus 2024-01-07         # Add bonus level for specific date"
    echo "  $0 regular 432 false        # Add regular level 432 with visible browser"
    exit 0
else
    main "$@"
fi
