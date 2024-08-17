const fs = require('fs-extra');
const { execSync } = require('child_process');

// Build the React project
execSync('react-scripts build', { stdio: 'inherit' });

// Copy the build folder to the dist folder
fs.copySync('build', 'dist');

// Copy the public/manifest.json file to the dist folder
fs.copySync('public/manifest.json', 'dist/manifest.json');

// Copy the public/icon.png file to the dist folder
fs.copySync('public/icon.png', 'dist/icon.png');
