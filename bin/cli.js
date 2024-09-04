#!/usr/bin/env node

const {execSync} = require('child_process');

const runCommand = command =>{
    try {
        execSync(`${command}` ,{stdio : 'inherit'});
    } catch (error) {
        console.error(`Failed to execute ${command}`)
        return false;
    }
    return true;
}

const repoName = process.argv[2];
const gitCheckoutCommand = `git clone --depth 1 https://github.com/DevWithEasy/express-mern-x ${repoName}`;
const installDepsCommand = `cd ${repoName} && npm install`;

console.log('Creating project...')
const checkedout = runCommand(gitCheckoutCommand);
if (!checkedout) process.exit(-1);

console.log('Installing dependencies...')

const installed = runCommand(installDepsCommand);
if (!installed) process.exit(-1);

console.log('Project setup is complete!');
console.log('cd ${repoName} && npm install');