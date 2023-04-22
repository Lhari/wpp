// add readline
const readline = require('readline');
const fs = require('fs');
const baseObj = {
    "name": "",
    "version": "1.0.0",
    "description": "",
    "author": ""
  }

  module.exports = function generateConfiguration(name) {

    // ask a readline question for each entry of the baseObj, if the answer is empty, use the default value
    // if the answer is not empty, use the answer
    // after all questions are answered, write the file to the current directory
    // console.log(baseObj);
    // console.log(name);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    rl.question(`project name: (${name})`, (answer) => {
        if (answer !== '') {
            baseObj.name = answer;
        }
        rl.question(`version: (${baseObj.version})`, (answer) => {
            if (answer !== '') {
                baseObj.version = answer;
            }
            rl.question('description: ', (answer) => {
                baseObj.description = answer;
                rl.question('author: ', (answer) => {
                    baseObj.author = answer;

                    // Ask if this is ok

                    rl.question(`Is this ok? `, (answer) => {
                        answer = answer.toLowerCase()
                        if (answer === 'y' || answer === 'yes') {
                            writeFile();
                        } else if(answer === 'n' || answer === 'no') {
                            console.log('Aborting');
                        } else {
                            console.log('Invalid answer');
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

baseObj.packages = {}

fs.writeFile('wpkg.json', JSON.stringify(baseObj, null, 2), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
});

}