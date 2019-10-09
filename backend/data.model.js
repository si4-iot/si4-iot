//Define o modelo de dados -- SCHEMA
//Pacotes usados:
const mongoose = require('mongoose');
//Criando referencia para o schema:
const Schema = mongoose.Schema;

//Descrição do schema no formato JSON:
let Data = new Schema({
    data_temperature: {
        type: String
    },
    data_humidity: {
        type: String
    }
});

//Exportando o schema
module.exports = mongoose.model('Data', Data);