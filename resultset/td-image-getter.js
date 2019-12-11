// Dependencies
const express = require("express");
const myParser = require("body-parser");
const childProcess = require('child_process');

// image-generator.js relative path
IMG_GENERATOR_PATH = 'image-generator.js';

// Used thingweb.node's cli flags
CLI_FLAGS = '--clientOnly';

// Difining default used port.
// ATENTION: must be equally defined in both td-image-getter.js and image-generator.js files
DEFAULT_PORT = 8000;

const urls = process.argv.slice(2); // getting array of urls (and CLI_PATH)

// Getting relative path to thingweb.node's cli
CLI_PATH = urls.shift();

// Creating a express server to get the TDs images and to send the urls to the image generator
var app = express();
// Response with the urls when receive a request:
app.post("/url-request", function (request, response) {
    urls_json = JSON.stringify(urls);
    response.json(urls_json);
});
app.use(myParser.json({ extended: true }));
// Send received requests to resultset:
app.post("/", function (request, response) { // message handler
    process.send(request.body);              // sending image to parent process
});
console.log('Resultset awaiting TD response...');
app.listen(DEFAULT_PORT);

// Calling thingweb.node to build the TDs images
var child = childProcess.fork(CLI_PATH, [CLI_FLAGS, IMG_GENERATOR_PATH]);

// Terminating server when the child exited
child.on('exit', () => {
    process.kill(process.pid,'SIGINT');
});
