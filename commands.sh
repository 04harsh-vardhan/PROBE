#!/bin/bash

echo "Starting Node.js installation on Alpine Linux..."

# Update package list and install Node.js and npm
echo "Updating package list and installing Node.js..."
apk update && apk add --no-cache nodejs npm

# Verify if Node.js is installed
echo "Verifying Node.js installation..."
if ! command -v node &> /dev/null; then
  echo "Node.js binary not found as 'node'. Checking for 'nodejs' binary..."

  # Check if 'nodejs' binary exists and create a symlink
  if command -v nodejs &> /dev/null; then
    echo "'nodejs' binary found. Creating symlink as 'node'..."
    ln -s /usr/bin/nodejs /usr/bin/node
  else
    echo "Node.js installation failed. Exiting."
    exit 1
  fi
fi

# Verify the installed version of Node.js
NODE_VERSION=$(node -v 2>/dev/null)
if [ $? -eq 0 ]; then
  echo "Node.js installed successfully. Version: $NODE_VERSION"
else
  echo "Failed to verify Node.js version. Something went wrong."
  exit 1
fi

# Verify npm installation
NPM_VERSION=$(npm -v 2>/dev/null)
if [ $? -eq 0 ]; then
  echo "npm installed successfully. Version: $NPM_VERSION"
else
  echo "Failed to verify npm installation. Something went wrong."
  exit 1
fi

echo "Node.js and npm installation completed successfully!"

npm i
