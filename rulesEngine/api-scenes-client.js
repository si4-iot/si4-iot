const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const xhr = new XMLHttpRequest();

// Destination IP
// const ADRESS = 'ec2-3-135-214-58.us-east-2.compute.amazonaws.com';
const ADRESS = "localhost"

// Test machines IPs
// const TEST = '192.168.15.10'
const TEST = "localhost"

// array of disired things urls
var urls = ["http://"+TEST+":8080/counter", "http://"+TEST+":8080/sensor"];
// filtering conditions (in json-rules-engines format)
var conditions = {
    any: [{
        all: [{
            fact: 'properties',
            path: '$.temperature.value',
            operator: 'greaterThanInclusive',
            value: 0
        }, {
            fact: 'properties',
            path: '$.temperature.value',
            operator: 'lessThan',
            value: 100
        }]
    },
    {
        fact: 'properties',
        path: '$.count.value',
        operator: 'greaterThanInclusive',
        value: 0
    }]
}

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
// }));

// var id = "142a2e1f"
var id = 'af9e1bbf'

// GET
xhr.open("GET", "http://"+ADRESS+":3000/scenes/"+id, true);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send();

// PUT
// xhr.open("PUT", "http://"+ADRESS+":3000/scenes/"+id, true);
// xhr.setRequestHeader('Content-Type', 'application/json');
// xhr.send(JSON.stringify({
//     // urls: urls,
//     conditions: conditions,
//     // timeout: 10000 // 10 seconds
// }));

// DELETE
// xhr.open("DELETE", "http://"+ADRESS+":3000/scenes/" + id, true);
// xhr.setRequestHeader('Content-Type', 'application/json');
// xhr.send();
