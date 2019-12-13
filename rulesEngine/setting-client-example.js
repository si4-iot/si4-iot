const redis = require('redis');

var client = redis.createClient();

client.on('connect', () => {
    console.log('Client connected');
});

client.on('message', (channel, message) => {
    console.log('Setting client got message');
    console.log('Channel:', channel);
    console.log('Message:', message);
});

client.subscribe('si4-iot/setting01');
