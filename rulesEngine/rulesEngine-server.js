const redis = require('redis');
const selectThings = require('./rulesEngine');

var server = redis.createClient();
server.on('connect', () => {
    console.log('Server connected');
});
server.on('error', (err) => {
    server.quit();
    client.quit();
    console.error("Server can't connect:", err);
});

var client = redis.createClient();
client.on('connect', () => {
    console.log('Client connected');
});
client.on('error', (err) => {
    server.quit();
    client.quit();
    console.error("Client can't connect:", err);
});

server.on('message', (channel, message) => {
    if (channel == 'si4-iot/setting-change-notification') {
        let settings = JSON.parse(message);
        for (const [name, info] of Object.entries(settings)) {
            selectThings(info.urls, info.conditions).then(selectedTDs => {
                client.publish(name, JSON.stringify(selectedTDs));
            }, cause => {
                console.log('selectThings rejected:', cause);
            }).catch(err => { console.error('selectThings failed:', err) });
        }
    }
});

server.subscribe('si4-iot/setting-change-notification');
