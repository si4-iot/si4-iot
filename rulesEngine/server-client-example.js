// Exemple of a scene client

// Requested dependencies
const redis = require('redis');

// Criating a client
var client = redis.createClient();

// Connecting to redis server
client.on('connect', () => {
    console.log('Client connected');
});

// Handling messages
client.on('message', (channel, message) => {
    console.log('scene client got message');
    console.log('Channel:', channel);
    console.log('Message:', message);
});

// Subscribing to a scene
client.subscribe('si4-iot/scene01');
