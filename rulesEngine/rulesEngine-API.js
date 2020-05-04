// API for the rulesEngine server

// Current machine url: 172.31.47.144

const express = require('express');
const bodyParser = require('body-parser');
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

// Get a scene from the database
function read_Scene(id) {
    return scenes[id];
}

// Get all scenes from the database
function read_All_Scenes() {
    return scenes;
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
app.use(bodyParser.urlencoded({extended: true}));

// Returns all scenes images
app.get('/scenes', function(req, res) {
    var data = read_All_Scenes();

    res.json(data);
});

// Return one scene image
app.get('/scenes/:id', function(req, res) {
    var id = req.params.id;
    var scene = read_Scene(id);

    res.json(scene);
});

// Request a new scene
app.post('/scenes', (req, res) => {
    var urls = req.body.urls;
    var conditions = req.body.conditions;

    console.log('body:\n', req.body);
    console.log('urls:\n', urls);
    console.log('conditions:\n', conditions);

    var id = new_Scene();

    // add_Scene(id, urls, conditions);

    res.json(id);
});

// Update a scene
app.put('/scenes/:id', (req, res) => {
    var id = req.params.id;
    var urls = req.body.urls;
    var conditions = req.body.conditions;

    add_Scene(id, urls, conditions);
});

// Delete a scene
app.delete('/scenes/:id', (req, res) => {
    var id = req.params.id;

    delete_Scene(id);
});


app.listen(DEFAULT_PORT, () => {
    console.log('Server running on port ', DEFAULT_PORT);
});
