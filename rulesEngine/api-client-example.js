const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const xhr = new XMLHttpRequest();

// Destination IP
const ADRESS = '192.168.0.108';
// const ADRESS = '18.216.2.4';
//const ADRESS = "localhost"

// Test machines IPs
// const TEST = '192.168.15.5'
const TEST = "localhost"
// const TEST = '192.168.0.108' // Lucas, pode colocar seu ip aqui para fazer os testes

// array of disired things urls
var urls = ["http://"+TEST+":8080/counter", "http://"+TEST+":8080/sensor"];
const url_device1 = "http://ec2-3-18-220-42.us-east-2.compute.amazonaws.com:8080/device_101a4202";
const url_device2 = "http://ec2-3-18-220-42.us-east-2.compute.amazonaws.com:8080/device_102a3096";
const url_device3 = "http://ec2-3-18-220-42.us-east-2.compute.amazonaws.com:8080/device_102a1759";
const url_device4 = "http://ec2-3-18-220-42.us-east-2.compute.amazonaws.com:8080/device_103a1599";
const url_device5 = "http://ec2-3-18-220-42.us-east-2.compute.amazonaws.com:8080/device_103a3343";
const url_device6 = "http://ec2-3-18-220-42.us-east-2.compute.amazonaws.com:8080/device_104a9248";
const url_device7 = "http://ec2-3-18-220-42.us-east-2.compute.amazonaws.com:8080/device_106a8455";
const url_device8 = "http://ec2-3-18-220-42.us-east-2.compute.amazonaws.com:8080/device_112a8832";
const url_device9 = "http://ec2-3-18-220-42.us-east-2.compute.amazonaws.com:8080/device_113a6082";
const url_device10 = "http://ec2-3-18-220-42.us-east-2.compute.amazonaws.com:8080/device_114a2276";

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
            console.log('Got response:\n');
            console.log(xhr.responseText);
        }
        else {
            console.log('Error: status not ok');
            console.log('or timeout event ocured...');
        }
    }
}

// xhr.open("POST", "http://172.31.47.144:3000/scenes", true);
/*xhr.open("POST", "http://"+ADRESS+":3000/scenes", true);
// POST
xhr.open("POST", "http://"+ADRESS+":3000/scenes", true);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send(JSON.stringify({
    urls: urls,
    conditions: conditions

}));*/

xhr.open("POST", "http://"+ADRESS+":3000/thingdescription",true); // teste do POST para envio da url do TD
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send(JSON.stringify({
    url_device: url_device10
}));

// GET
// xhr.open("GET", "http://"+ADRESS+":3000/scenes", true);
// xhr.setRequestHeader('Content-Type', 'application/json');
// xhr.send();
