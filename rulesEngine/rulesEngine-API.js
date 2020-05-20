// API for the rulesEngine server

// Current machine ip adress: 18.216.2.4

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const crypto = require('crypto');
const selectThings = require('./rulesEngine');

// Default configurations
const DEFAULT_PORT = 3000;
const DEFAULT_ID_SIZE = 8;

// Database start
const scenes = require('./scenes.json');

//---------- Auxiliar functions ---------- //

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
    return crypto.randomBytes(DEFAULT_ID_SIZE / 2).toString('hex');
}

// Add given scene to the database
function add_Scene(id, urls, conditions) {
    scenes[id] = {
        'urls': urls,
        'conditions': conditions
    }
    console.log('scenes:\n', scenes);

    save_Scenes();
}

// Delete given scene from the database
function delete_Scene(id) {
    delete scenes[id];

    save_Scenes();
}

//---------- API config ---------- //

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Returns all scenes in the database
app.get('/scenes', function (req, res) {
    var data = read_All_Scenes();

    res.json(data);
});

// Return selected scene's image
app.get('/scenes/:id', function (req, res) {
    var id = req.params.id;
    var scene = read_Scene(id);

    selectThings(scene.urls, scene.conditions).then(selectedTDs => {
        res.json(selectedTDs); // returning selected things
    }, cause => {
        console.log('selectThings rejected:', cause);
    }).catch(err => { console.error('selectThings failed:', err) });
});

// Request a new scene
app.post('/scenes', (req, res) => {
    var urls = req.body.urls;
    var conditions = req.body.conditions;

    console.log('POST message received.');
    console.log('urls:\n', urls);
    console.log('conditions:\n', conditions);

    var id = new_Scene();

    add_Scene(id, urls, conditions);

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




/********+ LUCAS SUA PARTE COMEÇA AQUI +********/ 


// Retorna uma lista de url_devices que atendem aos critérios da string de busca
app.get('/thingdescription', function (req, res) {
    string_busca = req.body.string_busca;
});

// Recebe a URL, faz a requisição do TD e o persiste em um banco de dados
app.post('/thingdescription', (req, res) => {
    url_divice = req.body.url_device;
});

