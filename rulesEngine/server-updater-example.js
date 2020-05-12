// Exemple of how to update/create a scene

// Required dependencies
const redis = require('redis');

// Setting requested variables
// array of disired things urls
var urls = ["http://localhost:8080/counter", "http://localhost:8080/sensor"];
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

// Building a set of scenes (in this example, containing just one scene)
var scenes = {
    'si4-iot/scene01': {
        'urls': urls,
        'conditions': conditions
    }
}

// Creating redis publisher
var publisher = redis.createClient();

// Publishing the scenes set to a rules engine server
publisher.publish('si4-iot/scene-update-notification', JSON.stringify(scenes), () => {
    process.exit(0);
});
