const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const xhr = new XMLHttpRequest();

// Destination Adress
const ADRESS = 'ec2-3-135-214-58.us-east-2.compute.amazonaws.com';
// const ADRESS = "localhost"

// Test machines Adress
// const TEST = 'http://192.168.15.17'
// const TEST = "http://localhost"

// array of disired things urls
// var urls = [TEST+":8080/counter", TEST+":8080/sensor"];
var urls = require('./urls.json'); // Recuperando urls filtradas no api-td-client.js

// filtering conditions (in json-rules-engines format)
var conditions = {
    all: [{
        fact: 'properties',
        path: '$.gps.value[0]',
        operator: 'greaterThanInclusive',
        value: -40
    }, {
        fact: 'properties',
        path: '$.gps.value[0]',
        operator: 'lessThanInclusive',
        value: -18
    }, {
        fact: 'properties',
        path: '$.gps.value[1]',
        operator: 'greaterThanInclusive',
        value: -40
    }, {
        fact: 'properties',
        path: '$.gps.value[1]',
        operator: 'lessThanInclusive',
        value: -18
    }, {
        fact: 'properties',
        path: '$.carbon_dioxide.value',
        operator: 'greaterThanInclusive',
        value: 0
    }]
}

// var conditions = {
//     any: [{
//         all: [{
//             fact: 'properties',
//             path: '$.temperature.value',
//             operator: 'greaterThanInclusive',
//             value: 0
//         }, {
//             fact: 'properties',
//             path: '$.temperature.value',
//             operator: 'lessThan',
//             value: 100
//         }]
//     },
//     {
//         fact: 'properties',
//         path: '$.count.value',
//         operator: 'greaterThanInclusive',
//         value: 0
//     }]
// }

xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
        console.log('status: ', xhr.status);
        if (xhr.status == 200 || xhr.status == 201) {
            console.log('Warnings:')
            console.log(xhr.getResponseHeader('Warning'));
            console.log('Got response:');
            console.log(xhr.responseText);
        }
        else {
            console.log('Error: status not ok');
            console.log('or timeout event ocured...');
            console.log(xhr.responseText);
        }
    }
}

// POST
// xhr.open("POST", "http://"+ADRESS+":3000/scenes", true);
// xhr.setRequestHeader('Content-Type', 'application/json');
// xhr.send(JSON.stringify({
//     urls: urls,
//     condicoes: conditions,
//     timeout: 30000 // 30 seconds
// }));

// var id = "8e6e09ca";
var id = '75238e08';

// GET
xhr.open("GET", "http://" + ADRESS + ":3000/scenes/" + id, true);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send();

// GET ALL
// xhr.open("GET", "http://" + ADRESS + ":3000/scenes/", true);
// xhr.setRequestHeader('Content-Type', 'application/json');
// xhr.send();

// GET images
// xhr.open("GET", "http://" + ADRESS + ":3000/scenes/images/" + id, true);
// xhr.setRequestHeader('Content-Type', 'application/json');
// xhr.send();

// PUT
// xhr.open("PUT", "http://"+ADRESS+":3000/scenes/"+id, true);
// xhr.setRequestHeader('Content-Type', 'application/json');
// xhr.send(JSON.stringify({
//     // urls: urls,
//     conditions: conditions,
//     // timeout: 30000 // 30 seconds
// }));

// DELETE
// xhr.open("DELETE", "http://"+ADRESS+":3000/scenes/" + id, true);
// xhr.setRequestHeader('Content-Type', 'application/json');
// xhr.send();
