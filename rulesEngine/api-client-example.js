const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const xhr = new XMLHttpRequest();

// Destination IP
const ADRESS = '18.216.2.4';

// Test machines IPs
const TEST_1 = '192.168.15.5'

// array of disired things urls
var urls = ["http://"+TEST_1+":8080/counter", "http://"+TEST_1+":8080/sensor"];
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
        operator: 'greaterThan',
        value: 0
    }]
}

xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
        console.log('status: ', xhr.status);
        if (xhr.status == 200) {
            console.log('Got response:');
            console.log(xhr.responseText);
        }
        else {
            console.log('Error: status not ok');
            console.log('or timeout event ocured...');
        }
    }
}

// xhr.open("POST", "http://172.31.47.144:3000/scenes", true);
xhr.open("POST", "http://"+ADRESS+":3000/scenes", true);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send(JSON.stringify({
    urls: urls,
    conditions: conditions
}));
