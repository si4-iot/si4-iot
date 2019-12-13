const redis = require('redis');

var urls = ["http://localhost:8080/counter", "http://localhost:8080/sensor"];
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
var settings = {
    'si4-iot/setting01': {
        'urls': urls,
        'conditions': conditions
    }
}

var publisher = redis.createClient();

publisher.publish('si4-iot/setting-change-notification', JSON.stringify(settings), () => {
    process.exit(0);
});
