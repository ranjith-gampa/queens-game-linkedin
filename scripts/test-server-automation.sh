#!/bin/bash

# Test script to verify server startup and automation locally
# This simulates what happens in GitHub Actions

set -e

echo "🧪 Testing Server Startup and Automation"
echo "========================================"

# Function to cleanup on exit
cleanup() {
    if [ -n "$SERVER_PID" ] && kill -0 "$SERVER_PID" 2>/dev/null; then
        echo "🛑 Cleaning up: Stopping server (PID: $SERVER_PID)"
        kill "$SERVER_PID" 2>/dev/null || true
        sleep 2
        kill -9 "$SERVER_PID" 2>/dev/null || true
    fi
}

# Set up cleanup trap
trap cleanup EXIT

echo "Step 1: Installing dependencies..."
npm ci > /dev/null 2>&1 || echo "Dependencies already installed"

echo ""
echo "Step 2: Starting development server..."
npm run start &
SERVER_PID=$!
echo "📝 Server PID: $SERVER_PID"

echo ""
echo "Step 3: Waiting for server to be ready..."
timeout=60
while [ $timeout -gt 0 ]; do
    if curl -s http://localhost:3000 > /dev/null 2>&1; then
        echo "✅ Server is ready!"
        echo "🌐 Server response:"
        curl -s -I http://localhost:3000 | head -1
        break
    fi
    echo "⏱️  Waiting for server... ($timeout seconds remaining)"
    sleep 2
    timeout=$((timeout - 2))
done

if [ $timeout -le 0 ]; then
    echo "❌ Server failed to start within 60 seconds"
    echo "🔍 Process check..."
    ps aux | grep -E "(vite|node)" | grep -v grep || echo "No vite/node processes found"
    exit 1
fi

echo ""
echo "Step 4: Testing level builder accessibility..."
if curl -s http://localhost:3000/level-builder > /dev/null 2>&1; then
    echo "✅ Level builder is accessible"
else
    echo "❌ Level builder is not accessible"
    exit 1
fi

echo ""
echo "Step 5: Testing automation script help..."
if ./scripts/automate-level.sh --help > /dev/null 2>&1; then
    echo "✅ Automation script is working"
else
    echo "❌ Automation script failed"
    exit 1
fi

echo ""
echo "🎉 All tests passed!"
echo ""
echo "The server is running and accessible. You can now:"
echo "1. Test the level builder manually: http://localhost:3000/level-builder"
echo "2. Run the automation: ./scripts/automate-level.sh auto"
echo "3. Press Ctrl+C to stop the server when done"
echo ""
echo "Server will continue running until you stop this script..."

# Keep the script running so server stays up
wait $SERVER_PID
