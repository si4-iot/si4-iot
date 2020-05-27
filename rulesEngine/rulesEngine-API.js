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

// Conditions forms
const cond_forms = [
    'conditions', 'condition',
    'rules', 'rule',
    'condicoes', 'condicao',
    'regras', 'regra'
]

// URLs forms
const urls_forms = [
    'urls', 'url',
]

//---------- Auxiliar functions ---------- //

// Update database
function save_Scenes() {
    var jsonContent = JSON.stringify(scenes);

    fs.writeFile("./scenes.json", jsonContent, 'utf8', function (err) {
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
    var error_flag = false;
    var error_log = '';

    var scene = read_Scene(id);

    // Error handling
    if(!scene) return res.status(204).json();
    if(!scene.urls) {
        error_flag = true;
        error_log + 'URLs missing. ';
    }
    if(!scene.conditions) {
        error_flag = true;
        error_log + 'Conditions missing. ';
    }
    if(error_flag) return res.status(500).json(error_log + 'Please set all missing information with a PUT request.');

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

    var id = new_Scene();

    add_Scene(id, urls, conditions);

    res.status(201).json(id);
});

// Update a scene
app.put('/scenes/:id', (req, res) => {
    var id = req.params.id;
    var urls = req.body.urls;
    var conditions = req.body.conditions;

    var scene = read_Scene(id);
    if(!scene) return res.status(204).json();

    add_Scene(id, urls, conditions);

    res.end();
});

// Delete a scene
app.delete('/scenes/:id', (req, res) => {
    var id = req.params.id;

    var scene = read_Scene(id);
    if(!scene) return res.status(204).json();

    delete_Scene(id);

    res.end();
});


app.listen(DEFAULT_PORT, () => {
    console.log('Server running on port ', DEFAULT_PORT);
});




/********+ LUCAS SUA PARTE COMEÇA AQUI +********/ 

//configurando o mongodb
const MongoClient = require('mongodb').MongoClient;
//const assert = require('assert');
// URL de conexão
const url = 'mongodb://localhost:27017';
// Nome do banco de dados
const dbName = 'si4-iot';
// Nome da Coleção
const dbCollection = 'TD';
// Create a new MongoClient
const client = new MongoClient(url);
//configurando a conexão http
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const xhr = new XMLHttpRequest();

//---------- Funcoes auxiliares ----------------
function processRequest(e) {
    if (xhr.readyState == 4 && xhr.status == 200) 
    {
        response = JSON.parse(xhr.responseText);
        connect_db(response);
    }
}

function connect_db(response) {
    
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);
        dbo.collection(dbCollection).insertOne(response, function(err, res) {
          if (err) throw err;
          console.log("documento inserido");
          db.close();
        });
      });

}

function filter_db(string_busca) {

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);
        console.info(JSON.stringify(string_busca) + ' agora funcionou');
        dbo.collection(dbCollection).find(string_busca, { projection: { _id: 0 }}).toArray(function(err, result) {
            
            if (err) throw err;
            let data = JSON.stringify(result, null, 2);
            fs.writeFileSync('TDs.json', data);
            console.log('Arquivo Salvo');

            db.close();
        });
    });

}

//--------------------- API Config ---------------------------------

// Retorna uma lista de url_devices que atendem aos critérios da string de busca
app.post('/thingdescription/:filtro', (req, res) => {
    string_busca = req.body.string_busca;
    console.info(string_busca);

    filter_db(string_busca);

    res.status(200).send('conectado com sucesso');
});

// Recebe a URL, faz a requisição do TD e o persiste em um banco de dados
app.post('/thingdescription', (req, res) => {
    url_device = req.body.url_device;

    xhr.open('GET', url_device, true);
    xhr.send();

    xhr.onreadystatechange = processRequest;
    res.status(200).send('conectado com sucesso');

});

