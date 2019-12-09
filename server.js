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


//Incluindo o router:
const tdRoutes = require('./tdRoutes');

//Criando o middleware:
app.use(bodyParser.json());

//Conectando com a base de dados Mongoose:
mongoose.connect('mongodb://127.0.0.1:27017/td', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//Incluindo o router:
app.use('/td', tdRoutes);

//Referrencia da conexao com o BD:
const connection = mongoose.connection;

// Servidor em modo estatico se estiver 'in production'
if (process.env.NODE_ENV === 'production') {
    console.log("Server in production!")
    //Pasta do estatico
    app.use(express.static('front-end/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'front-end', 'build', 'index.html'));
    });
}

//Porta usada pelo servidor:
const PORT = process.env.PORT || 4000;

//Callback ativado assim que a conexao for aberta com sucesso:
connection.once('open', function() {
    console.log("Conexao com a base dados MongoDB estabelecida com sucesso");
})

//Iniciando o servidor: 
app.listen(PORT, function() {
    console.log("Servidor alocado na porta: " + PORT);
});
