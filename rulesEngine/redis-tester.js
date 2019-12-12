const redis = require('redis');

var settings = ['si4-iot/setting01'];
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
        operator: 'equal',
        value: 0
    }]
}

var publisher = redis.createClient();

publisher.hset('si4-iot/setting01', 'urls', JSON.stringify(urls));
publisher.hset('si4-iot/setting01', 'conditions', JSON.stringify(conditions));
publisher.expire('si4-iot/setting01', 60);

// client.hgetall('si4-iot/setting01', function(err, object) {
//     console.log(object);
// });

publisher.publish('si4-iot/setting-change-notification', JSON.stringify(settings), () => {
    process.exit(0);
});
