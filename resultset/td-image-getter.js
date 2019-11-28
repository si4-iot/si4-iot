// var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var express = require("express");
var myParser = require("body-parser");
var childProcess = require('child_process');

CLI_PATH = '../../thingweb.node-wot/packages/cli/dist/cli.js';
IMG_GENERATOR_PATH = 'image-generator.js';
CLI_FLAGS = '--clientOnly';

DEFAULT_IMAGE_GETTER_PORT = 8000;
DEFAULT_URLS_SHIPPER_PORT = 7000;

var urls = process.argv.slice(2); // getting array of urls

// Creating a express server to get the TDs images
var app = express();
app.use(myParser.json({ extended: true }));
app.post("/", function (request, response) { // message handler
    process.send(request.body); // sending image to parent process
});
console.log('Resultset awaiting TD response...');
app.listen(DEFAULT_IMAGE_GETTER_PORT);

// Calling thingweb.node to build the TDs images
var child = childProcess.fork(CLI_PATH, [CLI_FLAGS, IMG_GENERATOR_PATH]);
