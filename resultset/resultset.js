// Module responsible for the building of static images of the current state of a set of things

// Dependencies
const childProcess = require('child_process');

// Setting working directory to the current resultset.js directory
process.chdir(__dirname);

// thingweb.node's cli relative path
// ATENTION: this path is very likely unique for each machine. Please set it correctly
CLI_PATH = '../../thingweb.node-wot/packages/cli/dist/cli.js';

// td-image-getter.js relative path
IMG_GETTER_PATH = 'td-image-getter.js';

// Default timeout
const DEFAULT_TIMEOUT = 120000 // 2 minutes

// urls as program parameters
// const myurl = process.argv.slice(2);

// Test example:
// ----------------------------------------------- //
// urls for testing
// const myurl = ["http://localhost:8080/counter", "http://localhost:8080/sensor"];
// const myurl = ["http://localhost:8080/counter"];
// const myurl = ["http://localhost:8080/sensor"];
// const myurl = ["http://localhost:8080/counter", "http://localhost:8080/sensor", "inviable-example"];
// const myurl = [];

// ResultSet(myurl, undefined).then((img) => {
//     console.log('Resultset ended successfuly');
//     console.log('Number of images: ', img.length);
//     // for (const i of img) {
//     //     for (const [name, property] of Object.entries(i.properties)) {
//     //         console.log(name, property.value);
//     //     }
//     // }
// }, (cause) => {
//     console.log('Rejected:', cause);
// }).catch((err) => { console.error("Resultset failed:", err); });
// ----------------------------------------------- //

function ResultSet(tdurls, execTime) {
    return new Promise(async (resolve, reject) => {
        var tdImgs = [];                 // TDs awaited images
        var nAwaitedTDs = tdurls.length; // number of urls
        var nReceivedTDs = 0;            // number of received images
        execTime = typeof execTime  !== 'undefined' ?  execTime  : DEFAULT_TIMEOUT;

        if (nAwaitedTDs == 0) {
            reject('No TDs to search');
        }

        // Creating a child process that will search for the TDs
        // The child will send each received image back to the current process
        imgGetterParams = [CLI_PATH].concat(tdurls);
        var child = childProcess.fork(IMG_GETTER_PATH, imgGetterParams);

        // Received images handler
        child.on('message', img => {
            nReceivedTDs++; // incrementing number of received images
            console.log('TD', nReceivedTDs, 'of', nAwaitedTDs, 'image received.');
            tdImgs.push(img); // adding image to the array of images
            if (nReceivedTDs >= nAwaitedTDs) { // program stop condition
                child.kill('SIGTERM');         // interrupting child execution
                resolve(tdImgs);               // returning the images
                timer.unref();
            }
        });

        // Timeout event handler
        const timer = setTimeout(() => {
            child.kill('SIGTERM'); // interrupting child execution
            resolve(tdImgs);       // returning the images got so far
        }, execTime);
    });
}

module.exports = ResultSet;
