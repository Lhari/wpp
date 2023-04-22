#! /usr/bin/env node
let fs = require("fs");
const package = require('../package.json');

// import the generateConfiguration function from create-wpkg.js
const generateConfiguration = require("./create-wpkg");

// Get current directory
const currentLocation = process.cwd();

// get all arguments from argv, then strip the first two off
const args = process.argv.slice(2);

// read the contents of the wpkg.json file based on currentLocation
const wpPackage = JSON.parse(fs.readFileSync(`${currentLocation}/wpkg.json`));

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
        console.log(wpPackage.dependencies)
        break

    case 'help':
    case 'h':
    case '-h':
    case '--help':
        console.log('help')
        break

    case 'init':
        generateConfiguration(folderName);
        break
    default:
        if (!fs.existsSync(`${currentLocation}/wpkg.json`)) {
            // Get the name of the folder
            const folderName = currentLocation.split("\\").pop();
            
            // Call the generateConfiguration function
            generateConfiguration(folderName);
        } else {
            console.log('Unknown command, use -h or --help for help')
        }
        break;
}


// // Check if current location contains a wpkg.json file, if not, generate one