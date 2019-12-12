const redis = require('redis');
const selectThings = require('./rulesEngine');

var client = redis.createClient();
client.on('connect', () => {
    console.log('Redis connected');
});
client.on('error', (err) => {
    console.error('Redis error:', err);
});

client.on('message', (channel, message) => {
    // console.log('Channel:', channel);
    // console.log('Got message:', message);
    if (channel == 'si4-iot/setting-change-notification') {
        let settings = JSON.parse(message);
        for (setting of settings) {
            RefreshSetting(setting);
        }
    }
});

client.subscribe('si4-iot/setting-change-notification');

function RefreshSetting(setting) {
    client.hgetall(setting, function(err, results) {
        if (err) {
            console.error('Redis error:', err)
        } else {
            console.log('results:', results);
            let urls = JSON.parse(results.urls);
            let conditions = JSON.parse(results.conditions);
            selectThings(urls, conditions).then(selectedTDs => {
                client.publish(setting, JSON.stringify(selectedTDs));
            }, cause => {
                console.log('Rejected:', cause);
            }).catch(err => { console.error('Error:', err) });
        }
    });
}
