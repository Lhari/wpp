#! /usr/bin/env node
let fs = require("fs");
const package = require('../package.json');

// import the generateConfiguration function from create-wpkg.js
const generateConfiguration = require("./create-wpkg");

// Get current directory
const currentLocation = process.cwd();
const folderName = currentLocation.includes('\\') ? currentLocation.split("\\").pop() : currentLocation.split("/").pop();

// get all arguments from argv, then strip the first two off
const args = process.argv.slice(2);
let wpPackage


if(!fs.existsSync(`${currentLocation}/wpkg.json`)) {
    generateConfiguration(folderName);
} else {
    wpPackage = JSON.parse(fs.readFileSync(`${currentLocation}/wpkg.json`));
}



// read the contents of the wpkg.json file based on currentLocation, if the file exists

switch(args[0]) {
    case '-v':
    case '--version':
    case 'version':

        // get the version from package.json
        console.log(package.version);
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
        console.log(`Listing all dependencies (${dependencyObj.length})`)
        console.table(dependencyObj)
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

