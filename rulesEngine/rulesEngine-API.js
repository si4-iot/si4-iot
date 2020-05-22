// API for the rulesEngine server

// Current machine ip adress: 18.216.2.4

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const crypto = require('crypto');
const redis = require('redis');

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
    return crypto.randomBytes(DEFAULT_ID_SIZE / 2).toString('hex');
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
app.use(bodyParser.urlencoded({ extended: true }));

// Creating redis publisher
var publisher = redis.createClient();

// Returns all scenes in the database
app.get('/scenes', function (req, res) {
    var data = read_All_Scenes();

    res.json(data);
});

// Return selected scene's image
app.get('/scenes/:id', function (req, res) {
    var id = req.params.id;
    var scene = read_Scene(id);

    // Criating a redis client to receive the selected TDs from the rulesEngine server
    var client = redis.createClient();

    // Connecting to redis server
    client.on('connect', () => {
        console.log('Redis client connected');
    });

    // Redirecting rulesEngine server response
    client.on('message', (channel, message) => {
        console.log('Urls received.');
        console.log('Sending back to client...');
        res.json(message);
        console.log('Urls sent');
        client.quit();
    });

    // Subscribing to the scene
    client.subscribe('si4-iot/' + id);

    // Preparing rulesEngine server request
    var requested_Scene = {
        id: scene
    }
    // Publishing the scenes set to a rules engine server
    publisher.publish('si4-iot/scene-update-notification', JSON.stringify(requested_Scene));
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

//configurando o mongodb
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
// URL de conexão
const url = 'mongodb://localhost:27017';
// Nome do banco de dados
const dbName = 'si4-iot';
// Create a new MongoClient
const client = new MongoClient(url);

//configurando a conexão http
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const xhr = new XMLHttpRequest();
var response = "teste";

//---------- Funcoes auxiliares ----------------
function processRequest(e) {
    if (xhr.readyState == 4 && xhr.status == 200) 
    {
        response = JSON.parse(xhr.responseText);
        connect_db(response);
    }
}

function connect_db(response) {
    
    client.connect(function(err) {
        assert.equal(null, err);
        console.log("Connected successfully to server");
      
        const db = client.db(dbName);

        db.collection('TD').insertOne(response, function(err, r) {
            assert.equal(null, err);
            assert.equal(1, r.insertedCount);

        });
      
        client.close();
    });

}

// Retorna uma lista de url_devices que atendem aos critérios da string de busca
app.get('/thingdescription', function (req, res) {
    var string_busca = req.body.string_busca;
});

// Recebe a URL, faz a requisição do TD e o persiste em um banco de dados
app.post('/thingdescription', (req, res) => {
    url_device = req.body.url_device;

    console.log(url_device);

    xhr.open('GET', url_device, true);
    xhr.send();

    xhr.onreadystatechange = processRequest;

    res.sendStatus(200);//preci mexer melhor nas respostas, ele só está dizendo que deu certo o tempo todo
    
});

