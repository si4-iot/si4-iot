// Module responsible for update scenes

// Module dependencies
const redis = require('redis');
// const selectThings = require('./rulesEngine');

// Alternate function for API tests
function selectThings(urls, conditions) {
    return new Promise(async (resolve, reject) => {
        var ans = 'Server got update request.\nReceived info:\nurls:\n'+urls+'\nconditions:\n'+conditions;
        if(true) {
            resolve(ans);
        } else {
            reject('I shaw never reject.');
        }
        
    });
}

// Starting server that listen for scenes update notifications
var server = redis.createClient();
server.on('connect', () => {
    console.log('Server connected');
});
server.on('error', (err) => {
    server.quit();
    client.quit();
    console.error("Server can't connect:", err);
});

// Starting a client to send the scene changes to its listeners
var client = redis.createClient();
client.on('connect', () => {
    console.log('Client connected');
});
client.on('error', (err) => {
    server.quit();
    client.quit();
    console.error("Client can't connect:", err);
});

// Setting server actions
server.on('message', (channel, message) => {
    if (channel == 'si4-iot/scene-update-notification') { // on scene update notifications
        let scenes = JSON.parse(message);                 // get scenes
        for (const [name, info] of Object.entries(scenes)) {
            // Filtering scene things by the scene conditions
            selectThings(info.urls, info.conditions).then(selectedTDs => {
                client.publish(name, JSON.stringify(selectedTDs)); // publish selected things urls to the listeners
            }, cause => {
                console.log('selectThings rejected:', cause);
            }).catch(err => { console.error('selectThings failed:', err) });
        }
    }
});

// Subscribing server to scene update notification channel
server.subscribe('si4-iot/scene-update-notification');
