// var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var express = require("express");
var myParser = require("body-parser");
var childProcess = require('child_process');

CLI_PATH = '../../thingweb.node-wot/packages/cli/dist/cli.js';
IMG_GENERATOR_PATH = 'image-generator.js';
CLI_FLAGS = '--clientOnly';

// Difining default used ports.
// ATENTION: must be equally defined in both td-image-getter.js and image-generator.js files
DEFAULT_PORT = 8000;
// DEFAULT_URLS_SHIPPER_PORT = 7000;

// const urls = process.argv.slice(2); // getting array of urls
const urls = ["http://localhost:8080/counter", "http://localhost:8080/sensor"];

// Creating a express server to get the TDs images
var app = express();
app.post("/url-request", function (request, response) {
    urls_json = JSON.stringify(urls);
    response.json(urls_json);
});
app.use(myParser.json({ extended: true }));
app.post("/", function (request, response) { // message handler
    // process.send(request.body);              // sending image to parent process
    console.log(request.body);
});
console.log('Resultset awaiting TD response...');
app.listen(DEFAULT_PORT);

// Calling thingweb.node to build the TDs images
var child = childProcess.fork(CLI_PATH, [CLI_FLAGS, IMG_GENERATOR_PATH]);
