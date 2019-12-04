//Define o modelo de dados -- SCHEMA
//Pacotes usados:
const mongoose = require('mongoose');
//Criando referencia para o schema:
const Schema = mongoose.Schema;

//Descrição do schema no formato JSON:
let Description = new Schema({
    '@context': { 
        type: Schema.Types.Mixed,
        required: false
    },
    '@type': {
        type: String,
        required: false
    },
    actions: {
        type: Schema.Types.Mixed,
        required: false
    },
    description: { 
        type: String,
        required: false
    },
    events:{
        type: Schema.Types.Mixed,
        required: false
    },
    forms: {
        type: Schema.Types.Mixed,
        required: false
    },
    id: {
        type: String,
        required: false
    },
    properties: {
        type : Schema.Types.Mixed,
        required: false
    },
    security: { 
        type: Schema.Types.Mixed,
        required: false
    },
    securityDefinitions: {
        type: Schema.Types.Mixed,
        required: true
    },
    support: {
        type: String,
        required: false
    },
    title: {
        type: String,
        required: false
    } 
});

//Exportando o schema
module.exports = Description = mongoose.model('Description', Description);