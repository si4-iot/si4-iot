//Pacotes usados:
const express = require('express');
//Importando o modelo de dados - schema:
let Data = require('./td.model');

//Instancia do router atraves do router do express:
const tdRoutes = express.Router();


//ENDPOINTS:
//Funcao responsavel pelo retorno de todos os itens da base de dados:
tdRoutes.get('/', (req, res) => {
    console.log('Acesso ao metodo list');
    Data.find(function(err, data){
        if (err) {
            console.log(err);
        }else {
            res.json(data);
        }
    });
});

//Funcao responsavel pela execução de query no db:
tdRoutes.route('/search').post(function(req, res) {
    console.log('Acesso ao metodo search');
    var query = JSON.parse(req.body.consult);
    console.log(query)
    Data.find(query, function(err, data) {
        if (err) {
            console.log(err);
        }else {
            res.json(data);
        }
    });
});

//Funcao responsavel pelo retorno de um item especifico da base de dados -- parametro id:
tdRoutes.route('/:id').get(function(req, res) {
    console.log('Acesso ao método read');
    let id = req.params.id;
    Data.findById(id, function(err, data) {
        res.json(data);
    });
});

//Funcao responsavel pela adicição de um novo item na base de dados:
tdRoutes.route('/add').post (function(req, res) {
    console.log('Acesso ao método add');
    let data = new Data(req.body);
    console.log(data);
    data.save()
        .then(data => {
            res.status(200).json({'data': 'Dado adicionado com sucesso'});
        })
        .catch(err => {
            res.status(400).send('Falha ao adicionar novo dado');
        });
});

//Funcao responsavel pelo update de um item especifico da base de dados -- parametro id:
tdRoutes.route('/update/:id').post(function(req, res) {
    console.log('Acesso ao método edit');
    Data.findById(req.params.id, function(err, data) {
        if (!data)
            res.status(404).send('Dado nao encontrado');
        else
            data.id = req.body.id;
            data.title = req.body.title;
            
            data.save().then(data => {
                res.json('Dado alterado!');
            })
            .catch(err => {
                res.status(400).send("Update nao completado");
            });
    });
});

//Funcao responsavel pela delecao de um item especifico da base de dados -- parametro id:
tdRoutes.route('/delete/:id').get(function(req, res) {
    console.log('Acesso ao método delete');
    Data.findById(req.params.id, function(err, data) {
        if (!data)
            res.status(404).send('Dado nao encontrado');
        else
            data.uri = req.body.id;
            data.td = req.body.title;
            
            data.remove().then(data => {
                res.json('Dado removido!');
            })
            .catch(err => {
                res.status(400).send("Nao foi possivel remover dado");
            });
    });
});

module.exports = tdRoutes;