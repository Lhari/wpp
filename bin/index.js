#! /usr/bin/env node
import chalk from 'chalk';
import * as fs from 'fs'
import * as path from 'path'

import { table } from './modules/table.mjs'
import { generateConfiguration } from './modules/create-wpkg.mjs'

const __dirname = path.resolve();

// read the package.json file
const pck = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json')));

// Get current directory
const currentLocation = process.cwd();
const folderName = currentLocation.includes('\\') ? currentLocation.split("\\").pop() : currentLocation.split("/").pop();

// get all arguments from argv, then strip the first two off
const args = process.argv.slice(2);
let wpPackage

// If the API is run and file doesn't exist, start out by forcing the file to be created.
if(!fs.existsSync(`${currentLocation}/wpkg.json`)) {
    generateConfiguration(folderName);
} else {
    wpPackage = JSON.parse(fs.readFileSync(`${currentLocation}/wpkg.json`));
    // read the contents of the wpkg.json file based on currentLocation, if the file exists

    switch(args[0]) {
        case '-v':
        case '--version':
        case 'version':

            if(args[1] === '--new-version') {

                if(args[2].match(/^[0-9]+\.[0-9]+\.[0-9]+$/) && args[2] !== wpPackage.version) {
                    // update the version number within the package.json file
                    wpPackage.version = args[2]
                    fs.writeFileSync(path.join(__dirname, 'wpkg.json'), JSON.stringify(wpPackage, null, 2))
                } else {
                    console.log(chalk.redBright('Please provide a valid version number'));

                }
            } else {
                // get the version from wpkg.json
                console.log(chalk.blueBright(`${chalk.cyanBright(wpPackage.version)}`))

            }

            
            break

        case 'install':
        case 'i':
            // If package is given, install the specific package, else loop over all dependencies and install them
            break

        case 'remove':
        case 'r':

            // If remove is set, require a package to be given. Delete package from wpkg.json, then remove the package from the WP install
            console.log('remove package')
            break

        case 'upgrade':
        case 'u':

            // If no package is given, simply upgrade all packages that aren't up to the version set within wpkg.json

            // if a package is given, extract the package name and version number from the process.argv array, update it within wpkg.json and install it
            console.log('update package, if no package is given, update all packages')
            break
        
        case 'list':
        case 'l':
        
            // List all dependencies, and their versions    
            let dependencyObj = []
            for(let [key, value] of (Object.entries(wpPackage.dependencies))) {
                dependencyObj.push({name: key, version: value})
            }

            // TODO: Add Chalk to make this look better
            console.log('')
            console.log(chalk.blueBright(`Listing all dependencies (${chalk.cyanBright(dependencyObj.length)})`))
            table(dependencyObj)
            break

        case 'help':
        case 'h':
        case '-h':
        case '--help':

            // Write out a helpful message, explaining how to utilize the full API
            console.log('help')
            break

        default:
            // Simply just warn people that they cannot use the command without some sort of parameter, after the first time.
            console.log('Unknown command, use -h or --help for help')
            
            break;
    }
}




