//Módulo responsável pelo servidor web
//Pacotes usados:
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

//Diretorio usado:
const path = require("path");

//Instancia do express:
const app = express();
//Porta usada pelo servidor:
const PORT = process.env.PORT || 4000;

// //Instancia do router atraves do router do express:
// const tdRoutes = express.Router();

//Importando o modelo de dados - schema:
let Data = require('./td.model');

//Criando o middleware:
app.use(cors());
app.use(bodyParser.json());

//Conectando com a base de dados Mongoose:
mongoose.connect('mongodb://127.0.0.1:27017/td', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
//Referrencia da conexao com o BD:
const connection = mongoose.connection;

//Callback ativado assim que a conexao for aberta com sucesso:
connection.once('open', function() {
    console.log("Conexao com a base dados MongoDB estabelecida com sucesso");
})


const tdRoutes = require('./tdRoutes');
app.use("/tdRoutes", tdRoutes);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('./../src/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, '../src', 'build', 'index.html'));
    });
}
// //Incluindo o router:
// app.use('/td', tdRoutes);

//Iniciando o servidor: 
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
