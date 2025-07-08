#!/bin/bash

# Production build automation script for adding levels in CI
# This uses a production build instead of the dev server for more reliable CI execution

set -e

MODE="${1:-auto}"
SCREENSHOT_PATH="${2:-}"
HEADLESS="${3:-true}"

echo "🏗️ Starting production build automation..."
echo "Mode: $MODE"
echo "Screenshot path: ${SCREENSHOT_PATH:-auto-detect}"
echo "Headless: $HEADLESS"

# Function to cleanup processes
cleanup() {
    echo "🧹 Cleaning up..."
    if [ ! -z "$PREVIEW_PID" ]; then
        echo "Stopping preview server (PID: $PREVIEW_PID)..."
        kill $PREVIEW_PID 2>/dev/null || true
        wait $PREVIEW_PID 2>/dev/null || true
    fi
}

trap cleanup EXIT

# Build the production version
echo "🏗️ Building production version..."
npm run build

# Start the preview server in the background
echo "🚀 Starting preview server..."
npm run preview -- --port 3000 --host 0.0.0.0 &
PREVIEW_PID=$!

echo "Preview server started with PID: $PREVIEW_PID"

# Wait for the preview server to be ready
echo "⏳ Waiting for preview server to be ready..."
MAX_ATTEMPTS=30
ATTEMPT=0

while [ $ATTEMPT -lt $MAX_ATTEMPTS ]; do
    if curl -s -f http://localhost:3000/ > /dev/null 2>&1; then
        echo "✅ Preview server is ready!"
        break
    fi
    
    ATTEMPT=$((ATTEMPT + 1))
    echo "Attempt $ATTEMPT/$MAX_ATTEMPTS - Server not ready yet, waiting..."
    sleep 2
done

if [ $ATTEMPT -eq $MAX_ATTEMPTS ]; then
    echo "❌ Preview server failed to start after $MAX_ATTEMPTS attempts"
    exit 1
fi

# Additional wait to ensure the server is fully ready
sleep 3

# Run the automation script
echo "🤖 Running level automation..."
if [ "$MODE" = "auto" ]; then
    # Determine what type of level to add based on the day
    day_of_week=$(TZ=America/Los_Angeles date +%w)
    if [ "$day_of_week" = "0" ]; then
        # Sunday - add both bonus and regular level
        echo "📅 Sunday detected - adding both bonus and regular levels"
        
        echo "🎁 Adding bonus level..."
        if [ "$HEADLESS" = "true" ]; then
            npx tsx ./scripts/addLevel.ts --bonus --headless=true
        else
            npx tsx ./scripts/addLevel.ts --bonus --headless=false
        fi
        
        echo "🎯 Adding regular level..."
        # Get the next level number
        NEXT_LEVEL=$(ls src/utils/levels/ | grep -E '^level[0-9]+\.ts$' | sed 's/level\([0-9]*\)\.ts/\1/' | sort -n | tail -1)
        NEXT_LEVEL=$((NEXT_LEVEL + 1))
        
        if [ "$HEADLESS" = "true" ]; then
            npx tsx ./scripts/addLevel.ts --level=$NEXT_LEVEL --headless=true
        else
            npx tsx ./scripts/addLevel.ts --level=$NEXT_LEVEL --headless=false
        fi
    else
        # Weekday - add regular level only
        echo "📅 Weekday detected - adding regular level only"
        
        # Get the next level number
        NEXT_LEVEL=$(ls src/utils/levels/ | grep -E '^level[0-9]+\.ts$' | sed 's/level\([0-9]*\)\.ts/\1/' | sort -n | tail -1)
        NEXT_LEVEL=$((NEXT_LEVEL + 1))
        
        if [ "$HEADLESS" = "true" ]; then
            npx tsx ./scripts/addLevel.ts --level=$NEXT_LEVEL --headless=true
        else
            npx tsx ./scripts/addLevel.ts --level=$NEXT_LEVEL --headless=false
        fi
    fi
else
    # Manual mode with specific parameters
    if [ "$HEADLESS" = "true" ]; then
        npx tsx ./scripts/addLevel.ts --mode="$MODE" --screenshot="$SCREENSHOT_PATH" --headless=true
    else
        npx tsx ./scripts/addLevel.ts --mode="$MODE" --screenshot="$SCREENSHOT_PATH" --headless=false
    fi
fi

echo "✅ Production build automation completed successfully!"
