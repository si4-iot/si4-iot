// API for the rulesEngine server

// Current machine ip adress: 18.216.2.4

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const crypto = require('crypto');
const selectThings = require('./rulesEngine');
const Resultset = require('../resultset');

// Default configurations
const DEFAULT_PORT = 3000;
const DEFAULT_ID_SIZE = 8;

// Database start
const scenes = require('./scenes.json');
const { info } = require('console');

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

    fs.writeFile("../rulesEngine/scenes.json", jsonContent, 'utf8', function (err) {
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
function new_Random_Id() {
    return crypto.randomBytes(DEFAULT_ID_SIZE / 2).toString('hex');
}

// Add given scene to the database
function add_Scene(id, urls, conditions, timeout) {
    scenes[id] = {
        'urls': urls,
        'conditions': conditions,
        'timeout': timeout
    }

    save_Scenes();
}

// Update given scene's urls
function update_Scene_Urls(id, urls) {
    scenes[id].urls = urls

    save_Scenes();
}

// Update given scene's conditions
function update_Scene_Cond(id, conditions) {
    scenes[id].conditions = conditions

    save_Scenes();
}

// Update given scene's timeout
function update_Scene_Timeout(id, timeout) {
    scenes[id].timeout = timeout

    save_Scenes();
}

// Delete given scene from the database
function delete_Scene(id) {
    delete scenes[id];

    save_Scenes();
}

// Read relevant parameters from body
// Return format: [ [, parameter] , error_flag, error_log]
function get_Body_Params(body) {
    var urls = undefined;
    var conditions = undefined;
    var timeout = body.timeout;

    for (const k of Object.keys(body)) {
        if (cond_forms.includes(k)) {
            if (!conditions) {
                conditions = body[k];
            } else {
                return [[], true, 'Multiple conditions fields defined.'];
            }
        }
        if (urls_forms.includes(k)) {
            if (!urls) {
                urls = body[k];
            } else {
                return [[], true, 'Multiple urls fields defined.'];
            }
        }
    }
    if (timeout != undefined && !Number.isInteger(timeout)) {
        return [[], true, 'Timeout format unexpected.'];
    }

    return [[urls, conditions, timeout], false, ''];
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

// Return selected scene's filtered urls
app.get('/scenes/:id', function (req, res) {
    var id = req.params.id;
    var error_flag = false;
    var error_log = '';

    var scene = read_Scene(id);

    // Error handling
    if (!scene) return res.status(204).json();
    if (!scene.urls) {
        error_flag = true;
        error_log += 'URLs missing. ';
    }
    if (!scene.conditions) {
        error_flag = true;
        error_log += 'Conditions missing. ';
    }
    if (error_flag) return res.status(500).json(error_log + 'Please set all missing information with a PUT request.');

    selectThings(scene.urls, scene.conditions, scene.timeout).then(([selectedTDs, missingTDs]) => {
        if (missingTDs) {
            res.set('Warning', "Some TDs could not be found or haven't replied in time").json(selectedTDs); // returning selected things
        } else {
            res.json(selectedTDs); // returning selected things
        }
    }, cause => {
        console.log('selectThings rejected:', cause);
        res.status(500).json(cause);
    }).catch(err => {
        console.error('selectThings failed:', err);
        res.status(500).json('Internal server error');
    });
});

// Return selected scene's urls images
app.get('/scenes/images/:id', function (req, res) {
    var id = req.params.id;
    var error_flag = false;
    var error_log = '';

    var scene = read_Scene(id);

    // Error handling
    if (!scene) return res.status(204).json();
    if (!scene.urls) {
        error_flag = true;
        error_log += 'URLs missing. ';
    }
    if (error_flag) return res.status(500).json(error_log + 'Please set all missing information with a PUT request.');

    // Getting TDs images
    Resultset(scene.urls, scene.timeout).then( ([imgs, missingTDs]) => {
        if (missingTDs) {
            res.set('Warning', "Some TDs could not be found or haven't replied in time").json(imgs); // returning images
        } else {
            res.json(imgs); // returning images
        }
    }, (cause) => { res.status(500).json(cause); })
        .catch((err) => {
            console.error(err);
            res.status(500).json(err);
        });
});

// Request a new scene
app.post('/scenes', (req, res) => {
    var [params, error_flag, error_log] = get_Body_Params(req.body);
    var urls = params[0];
    var conditions = params[1];
    var timeout = params[2];
    if (error_flag) return res.status(400).json(error_log);

    var id = new_Random_Id();

    add_Scene(id, urls, conditions, timeout);

    res.status(201).json(id);
});

// Update a scene
app.put('/scenes/:id', (req, res) => {
    var [params, error_flag, error_log] = get_Body_Params(req.body);
    var urls = params[0];
    var conditions = params[1];
    var timeout = params[2];
    if (error_flag) return res.status(400).json(error_log);
    if (!urls && !conditions && !timeout) return res.status(400).json('Request is empty');

    var id = req.params.id;
    var scene = read_Scene(id);
    if (!scene) return res.status(204).json();

    if (urls) update_Scene_Urls(id, urls);
    if (conditions) update_Scene_Cond(id, conditions);
    if (timeout) update_Scene_Timeout(id, timeout);

    res.end();
});

// Delete a scene
app.delete('/scenes/:id', (req, res) => {
    var id = req.params.id;

    var scene = read_Scene(id);
    if (!scene) return res.status(204).json();

    delete_Scene(id);

    res.end();
});


app.listen(DEFAULT_PORT, () => {
    console.log('Server running on port ', DEFAULT_PORT);
});




/********+ LUCAS SUA PARTE COMEÇA AQUI +********/

//configurando o mongodb
const MongoClient = require('mongodb').MongoClient;
// URL de conexão
const url = 'mongodb://localhost:27017';
// Nome do banco de dados
const dbName = 'si4-iot';
// Nome da Coleção
const dbCollection = 'TD';
//configurando a conexão http
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

//teste contador
var cont = 0;


//---------- Funcoes auxiliares ----------------
function gethttp(url_list) {// modificado para funcionar com um device ou uma lista de devices

    url_list.forEach(function (url_device) {
        
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url_device, true);
        xhr.send();
    
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                response = JSON.parse(xhr.responseText);
                response["url_device"] = url_device;
                cont++;
                connect_db(response);
            }
        };

    });

}

function connect_db(response) {

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);
        dbo.collection(dbCollection).insertOne(response, function (err, res) {
            if (err) throw err;
            db.close();
        });
    });
    console.log(cont + " documentos inseridos");

}

//--------------------- API Config ---------------------------------

// Recebe a URL, faz a requisição do TD e o persiste em um banco de dados
app.post('/thingdescription', (req, res) => {
    url_device = req.body.url_device;
    cont = 0;

    gethttp(url_device);
    res.status(200).send('conectado com sucesso');

});

// Recebe a URL, faz a requisição de uma lista de TDs e os persiste em um banco de dados
app.post('/thingdescription/:lista', (req, res) => {
    url_list = req.body.url_list;
    cont = 0;

    url_list.forEach(function (url_device) {

        const xhr = new XMLHttpRequest();
        xhr.open('GET', url_device, true);
        xhr.send();

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                response = JSON.parse(xhr.responseText);
                gethttp(response);
            }
        };

    });

    res.status(200).send('conectado com sucesso');

});

// Retorna uma lista de url_devices que atendem aos critérios da string de busca
app.get('/thingdescription/:filtro', (req, res) => {//do jeito que está ele não funciona como GET
    strAux = JSON.parse(req.header('Content-Type')); //gambiarra boa e de qualidade
    string_busca = strAux.string_busca;//gambiarra boa e de qualidade
    //console.log(string_busca);

    MongoClient.connect(url, function (err, db) {
        if (err) {
            res.status(500).send('houve um erro na comunicacao com o mongodb');
            throw err;
        }

        var dbo = db.db(dbName);
        dbo.collection(dbCollection).find(string_busca, { projection: { _id: 0, url_device: 1 } }).toArray(function (err, result) {
            if (err) {
                res.status(500).send('nao foi possivel fazer a busca no banco de dados');
                throw err;
            }

            let data = JSON.stringify(result, null, 2); // retorna um JSON identado e facil de ler
            //let data = JSON.stringify(result); // retorna um JSON em forma de string e dificil de ler
            //fs.writeFileSync('TDs.json', data);
            //console.log('Arquivo Salvo');
            db.close();
            res.status(200).send(data);

        });

    });

});