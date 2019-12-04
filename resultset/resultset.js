// var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var express = require("express");
var myParser = require("body-parser");
// var mqtt = require('mqtt');

IMG_GETTER_PATH = 'td-image-getter.js';
// CLI_PATH = '../../thingweb.node-wot/packages/cli/dist/cli.js';
// IMG_GENERATOR_PATH = 'image-generator.js';
// CLI_FLAGS = '--clientOnly';

// urls for testing
const myurl = ["http://localhost:8080/counter", "http://localhost:8080/sensor"];
// const myurl = ["http://localhost:8080/counter"];
// const myurl = ["http://localhost:8080/sensor"];
// const myurl = ["http://localhost:8080/counter", "http://localhost:8080/sensor", "inviable-example"];
// const myurl = [];

ResultSet(myurl).then((img) => {
    console.log('Resultset ended successfuly');
    console.log('images get:', img);
    // for (const i of img) {
    //     for (const [name, property] of Object.entries(i.properties)) {
    //         console.log(name, property.value);
    //     }
    // }
}, (cause) => {
    console.log('Rejected:', cause);
}).catch((err) => { console.error("Resultset failed:", err); });

function ResultSet(tdurls) {
    return new Promise(async (resolve, reject) => {
        var tdImgs = [];                 // TDs awaited images
        var nAwaitedTDs = tdurls.length; // number of urls
        var nReceivedTDs = 0;            // number of received images

        if (nAwaitedTDs == 0) {
            reject('No TDs to search');
        }

        // Creating a child process that will search for the TDs
        // The child will send each received image back to the current process
        const childProcess = require('child_process');
        var child = childProcess.fork(IMG_GETTER_PATH, tdurls);

        // Received images handler
        child.on('message', img => {
            nReceivedTDs++; // incrementing number of received images
            console.log('TD', nReceivedTDs, 'of', nAwaitedTDs, 'image received.');
            tdImgs.push(img); // adding image to the array of images
            if (nReceivedTDs >= nAwaitedTDs) { // program stop condition
                child.kill('SIGINT');          // interrupting child execution
                resolve(tdImgs);               // returning the images
            }
        });

        // // Possible time limiter implementation ( NOT TESTED! )
        // setTimeout(() => {
        //     child.kill('SIGINT'); // interrupting child execution
        //     resolve(tdImgs);      // returning the images
        // }, execTime);
    });
}
