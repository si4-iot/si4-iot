// API for the rulesEngine server

const express = require('express');
const fs = require('fs');
const crypto = require('crypto');

// Default configurations
const DEFAULT_PORT = 3000;
const DEFAULT_ID_SIZE = 8;

// Database start
const scenes = require('./scenes.json');

//---------- Auxiliar functions ----------

// Update database
function save_Scenes() {
    var jsonContent = JSON.stringify(scenes);

    fs.writeFile("scenes.json", jsonContent, 'utf8', function (err) {
        if (err) {
            console.log("Error: data not saved.");
            return console.log(err);
        }
    });
}

// Random scene ID genarator
function new_Scene() {
    return crypto.randomBytes(DEFAULT_ID_SIZE/2).toString('hex');
}

// Add given scene to the database
function add_Scene(id, urls, conditions) {
    scenes[id] = {
        'urls': urls,
        'conditions': conditions
    }

    save_Scenes();
}

// Delete given scene from the database
function delete_Scene(id) {
    delete scenes[id];

    save_Scenes();
}

//---------- API config ----------

const app = express();
app.use(express.json());

// Returns all scenes images
app.get('/images', function(req, res) {
    res.json(scenes);
});

// Return one scene image
app.get('/images/:id', function(req, res) {
    var { id } = req.params;
    var scene = scenes[id];

    res.json(scene);
});

// Request a new scene
app.post('/images', (req, res) => {
    var urls = req.body.urls;
    var conditions = req.body.conditions;

    var id = new_Scene();

    add_Scene(id, urls, conditions);

    res.json(id);
});

// Update a scene
app.put('/images/:id', (req, res) => {
    var { id } = req.params;
    var urls = req.body.urls;
    var conditions = req.body.conditions;

    add_Scene(id, urls, conditions);
});

// Delete a scene
app.delete('/images/:id', (req, res) => {
    var { id } = req.params;

    delete_Scene(id);
});


app.listen(DEFAULT_PORT, () => {
    console.log('Server running');
});
