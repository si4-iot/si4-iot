const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Super = new Schema({
    url: {
        type: String
    }
});


//Exportando o schema
module.exports = mongoose.model('Super', Super);