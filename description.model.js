//Define o modelo de dados -- SCHEMA
//Pacotes usados:
const mongoose = require('mongoose');
//Criando referencia para o schema:
const Schema = mongoose.Schema;

//Descrição do schema no formato JSON:
let Description = new Schema({
    name: {
        type: String
    },
    title: {
        type: String
    },
    desc: {
        type: String
    },
    body: {
        type: String
    }
});

//Exportando o schema
module.exports = mongoose.model('Description', Description);