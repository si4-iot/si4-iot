// var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var express = require("express");
var myParser = require("body-parser");
// var messenger = require('messenger');
var childProcess = require('child_process');

CLI_PATH = '../../thingweb.node-wot/packages/cli/dist/cli.js';
IMG_GENERATOR_PATH = 'image-generator.js';
IMG_GENERATOR2_PATH = 'image-generator2.js';
CLI_FLAGS = '--clientOnly';

var urls = process.argv.slice(2);

var app = express();
app.use(myParser.json({ extended: true }));
app.post("/", function (request, response) {
    process.send(request.body);
});
console.log('Resultset awaiting TD response...');
app.listen(8000);

console.log('searching tds');
// for (url of urls) {
//     var child = childProcess.fork(CLI_PATH, [CLI_FLAGS, IMG_GENERATOR_PATH]);
//     // var child = childProcess.fork(IMG_GENERATOR_PATH, [url]);
// }

for (n of [0, 1]) {
    if (n == 0) {
        var child = childProcess.fork(CLI_PATH, [CLI_FLAGS, IMG_GENERATOR_PATH]);
    } else {
        var child = childProcess.fork(CLI_PATH, [CLI_FLAGS, IMG_GENERATOR2_PATH]);
    }
    // var child = childProcess.fork(IMG_GENERATOR_PATH, tdurls);
}
