//Módulo responsável pelo servidor web
//Pacotes usados:
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

//Instancia do express:
const app = express();
//Porta usada pelo servidor:
const PORT = 4000;
//Instancia do router atraves do router do express:
const routes = express.Router();

//Importando o modelo de dados - schema:
let Data = require('./super.model');

//Criando o middleware:
app.use(cors());
app.use(bodyParser.json());

//Conectando com a base de dados Mongoose:
mongoose.connect('mongodb://127.0.0.1:27017/super', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
//Referrencia da conexao com o BD:
const connection = mongoose.connection;

//Callback ativado assim que a conexao for aberta com sucesso:
connection.once('open', function() {
    console.log("Conexao com a base dados MongoDB estabelecida com sucesso");
})

//ENDPOINTS:
//Funcao responsavel pelo retorno de todos os itens da base de dados:
routes.route('/').get (function(req, res) {
    Data.find(function(err, data){
        if (err) {
            console.log(err);
        }else {
            res.json(data);
        }
    });
});

//Funcao responsavel pela execução de query no db:
routes.route('/search').post(function(req, res) {
    let query = req.body;
    console.log(query)
    Data.find(query, function(err, data) {
        res.json(data);
    });
});

//Funcao responsavel pelo retorno de um item especifico da base de dados -- parametro id:
routes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Data.findById(id, function(err, data) {
        res.json(data);
    });
});

//Funcao responsavel pela adicição de um novo item na base de dados:
routes.route('/add').post (function(req, res) {
    let data = new Data(req.body);
    data.save()
        .then(data => {
            res.status(200).json({'data': 'Dado adicionado com sucesso'});
        })
        .catch(err => {
            res.status(400).send('Falha ao adicionar novo dado');
        });
});

//Funcao responsavel pelo update de um item especifico da base de dados -- parametro id:
routes.route('/update/:id').post(function(req, res) {
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
routes.route('/delete/:id').get(function(req, res) {
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

//Incluindo o router:
app.use('/super', routes);

//Iniciando o servidor: 
app.listen(PORT, function() {
    console.log("Servidor rodando na porta: " + PORT);
});
