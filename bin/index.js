#! /usr/bin/env node
let fs = require("fs");

// import the generateConfiguration function from create-wpkg.js
const generateConfiguration = require("./create-wpkg");

// Get current directory
const currentLocation = process.cwd();

// Check if current location contains a wpkg.json file, if not, generate one
if (!fs.existsSync(`${currentLocation}/wpkg.json`)) {
    // Get the name of the folder
    const folderName = currentLocation.split("\\").pop();
    
    // Call the generateConfiguration function
    generateConfiguration(folderName);
} else {
    console.log("wpkg.json already exists");
}