const redis = require('redis');

var client = redis.createClient();

client.on('connect', () => {
    console.log('Client connected');
});

client.on('message', (chennel, message) => {
    console.log('Setting client got message');
    console.log('Channel:', channel);
    console.log('Message:', message);
});
