#!/bin/bash

echo "🚀 Starting Markdown to PDF Converter (Docker)"
echo "============================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to check if a port is in use
check_port() {
    lsof -i :$1 >/dev/null 2>&1
}

# Function to kill processes on a port
kill_port() {
    echo -e "${YELLOW}Killing existing processes on port $1...${NC}"
    lsof -ti :$1 | xargs kill -9 >/dev/null 2>&1
}

echo -e "${BLUE}Building and starting Docker services...${NC}"
docker compose up --build
