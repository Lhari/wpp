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
        console.log('installing')
        break

    case 'remove':
    case 'r':
        console.log('remove package')
        break

    case 'update':
    case 'u':
        console.log('update package, if no package is given, update all packages')
        break
    
    case 'list':
    case 'l':
        
        // let dependencies = JSON.parse()
        
        let dependencyObj = []
        for(let [key, value] of (Object.entries(wpPackage.dependencies))) {
            dependencyObj.push({name: key, version: value})
        }
        console.log('')
        console.log(`Listing all dependencies (${dependencyObj.length})`)
        console.table(dependencyObj)
        break

    case 'help':
    case 'h':
    case '-h':
    case '--help':
        console.log('help')
        break

    default:

        console.log('Unknown command, use -h or --help for help')
        
        break;
}

