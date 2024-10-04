echo "Starting build process..."

echo "Installing dependencies..."
npm install

echo "Running tests..."
npm test

echo "Building the project..."
npm run build

echo "Build process completed successfully."
