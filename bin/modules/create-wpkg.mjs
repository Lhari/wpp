// add readline
import * as readline from 'readline';
import * as fs from 'fs';

import chalk from 'chalk'

const baseObj = {
    "name": "",
    "version": "1.0.0",
    "description": "",
    "author": ""
}




export function generateConfiguration(name) {

    // ask a readline question for each entry of the baseObj, if the answer is empty, use the default value
    // if the answer is not empty, use the answer
    // after all questions are answered, write the file to the current directory
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    rl.question(chalk.blueBright(`project name: (${chalk.cyanBright(name)})`), (answer) => {
        if (answer !== '') {
            baseObj.name = answer;
        }
        rl.question(chalk.blueBright(`version: (${chalk.cyanBright(baseObj.version)})`), (answer) => {
            if (answer !== '') {
                baseObj.version = answer;
            }
            rl.question(chalk.blueBright('description: '), (answer) => {
                baseObj.description = answer;
                rl.question(chalk.blueBright('author: '), (answer) => {
                    baseObj.author = answer;

                    // Ask if this is ok

                    rl.question(chalk.blueBright(`Is this ok? `), (answer) => {
                        answer = answer.toLowerCase()
                        if (answer === 'y' || answer === 'yes') {
                            writeFile();
                        } else if(answer === 'n' || answer === 'no') {
                            console.log(chalk.redBright('Config file was not created, please run the API again'));
                        } else {
                            console.log(chalk.redBright('Please answer yes or no'));
                        }

                    rl.close();
                });
            });
        });
    });

  })
}

function writeFile() {
// write the file

baseObj.dependencies = {}

fs.writeFile('wpkg.json', JSON.stringify(baseObj, null, 2), (err) => {
    if (err) throw err;
    console.log(chalk.greenBright('The configuration has been saved!'));
});

}