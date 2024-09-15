#!/usr/bin/env node

const { execSync } = require('child_process');
const readline = require('readline');

const runCommand = (command) => {
    try {
        execSync(`${command}`, { stdio: 'inherit' });
    } catch (error) {
        console.error(`Failed to execute ${command}`);
        return false;
    }
    return true;
};

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const askProjectName = () => {
    return new Promise((resolve) => {
        rl.question('Please enter the project name: ', (name) => {
            rl.close();
            resolve(name);
        });
    });
};

const main = () => {
    let repoName = process.argv[2];

    const getRepoName = () => {
        if (!repoName) {
            return askProjectName();
        }
        return Promise.resolve(repoName);
    };

    getRepoName()
        .then((name) => {
            repoName = name;
            const gitCheckoutCommand = `git clone --depth 1 https://github.com/DevWithEasy/Express-Javascript-Starter ${repoName}`;
            const installDepsCommand = `cd ${repoName} && npm install`;

            console.log('Creating project...');
            const checkedout = runCommand(gitCheckoutCommand);
            if (!checkedout) process.exit(-1);

            console.log('Installing dependencies...');
            const installed = runCommand(installDepsCommand);
            if (!installed) process.exit(-1);

            console.log('Project setup is complete!');
            console.log(`cd ${repoName} && npm start`);

            // Exit the process when setup is complete
            process.exit(0);
        })
        .catch((error) => {
            console.error(error);
            process.exit(1); // Exit with an error code
        });
};

main();