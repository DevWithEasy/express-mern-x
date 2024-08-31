#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

// Define your repository URL
const repoUrl = 'https://github.com/DevWithEasy/express-mern-x';

// Clone the repository
execSync(`git clone ${repoUrl}`, { stdio: 'inherit' });

// Navigate into the cloned repository directory
const repoName = 'express-mern-x';

// Replace with your actual repo name
process.chdir(repoName);

// Install dependencies
console.log('Installing dependencies...');
execSync('npm install', { stdio: 'inherit' });

// Start the server (optional)
console.log('Starting the server...');
execSync('npm start', { stdio: 'inherit' });

console.log('Express.js server setup is complete!');
