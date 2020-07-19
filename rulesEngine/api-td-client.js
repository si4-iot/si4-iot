const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const xhr = new XMLHttpRequest();
var fs = require('fs');

// Destination IP
//const ADRESS = '10.0.0.105';
// const ADRESS = 'ec2-3-135-214-58.us-east-2.compute.amazonaws.com';
const ADRESS = "localhost"

// Test machines IPs
// const TEST = '192.168.15.5'
const TEST = "localhost"
// const TEST = '192.168.0.108' // Lucas, pode colocar seu ip aqui para fazer os testes

//ATENCAO, TANTO URL DE DEVICE UNICO QUANTO DE LISTA DE DEVICE DEVEM SER ESCRITOS COMO UMA LISTA JSON
//O CODIGO DE LEITURA DAS URLS APENAS LE NO FORMATO DE LISTA

// formato de url de device unico
const url_device = ["http://200.137.82.45:8126/device_1000a1880"];

// formato de url para lista de devices
const url_list = ["http://200.137.82.45:8126"];

// formato de lista de lista de urls
const urls_list = ["http://200.137.82.45:8126","http://200.137.82.45:8080","http://200.137.82.45:8081"]; 


//Exemplos de strings de busca no banco de dados mongodb, para mais informações ou métodos mais refinados de busca
//acesse https://docs.mongodb.com/manual/tutorial/query-documents/
var string_busca = {
    //exemplo de busca simples, por uma caracteristica nos documentos
    //"properties.gps.unit of measurement": "geo:Point" // elemento único de um documento
    //"properties.humidity.unit of measurement": "m3-lite:Humidity" // elemento único de um documento
    //"properties.gps.type":"geo:Point"
 
    //exemplo de busca composta simples, bucas duas caracteristicas independentes nos documentos
    /*$or:[
    {"properties.gps.unit of measurement": "geo:Point"},
    {"properties.humidity.unit of measurement": "m3-lite:Humidity"}
    ]*/

    //exemplo de buca simples, por mais de uma caracteristica em um mesmo documento
    /*"properties.gps.unit of measurement": "geo:Point",
    "properties.falldetector.unit of measurement": "saref:OnOffState"*/

    /*$or:[{"properties.gps":{$exists:true}, // o query {$exists:true} permite buscar pela existencia de campos nos ducumentos
    "properties.carbon_dioxide": {$exists:true}}, // assim é possivel fazer uma busca generia por propriedades sem especificar o tipo de sensor ou atuador
    {"properties.gps":{$exists:true},
    "properties.carbon_monoxide": {$exists:true}}
    ]*/
    
    /*"properties.gps":{$exists:true},
    "properties.carbon_dioxide": {$exists:true},
    "properties.engine": {$exists:true},*/
    //"properties.odometer": {$exists:true}, //opcional, não sei se seria tão interessante já que temos o engine
    //"properties.speed": {$exists:true}, //opcional, não sei se é mais interessante que o 'odometer' em relaçao ao engine

    //alguns sistemas detectam automaticamente a presença do carro, porém existem sistemas em que são feitas manualmente ou simplesmentes não sabem o local exato da vaga ocupada
    //muitos sistemas de estacionamento inteligente não possuem gps, pois a localização é fixa e incorporada as informaçõs da própria vaga
    //exemplos de sensores usados em sistemas de estacionamentos inteligentes
    //"properties.gps":{$exists:true}, //opcional 
    "properties.pressure":{$exists:true}, 
    "properties.weight":{$exists:true},
    "properties.magnetic":{$exists:true},
    "properties.ultrasonic":{$exists:true},
}

xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
        console.log('status: ', xhr.status);
        if (xhr.status == 200) {
            console.log('Resposta recebida:\n');
            //console.log(xhr.responseText);

            // Colocando todas as urls em um vetor
            urls = [];
            ans = JSON.parse(xhr.responseText);
            ans.forEach(element => {
                urls.push(element.url_device);
            });
            console.log(urls);
            // Salvando urls em urls.json
            var jsonContent = JSON.stringify(urls);
            fs.writeFile("../rulesEngine/urls.json", jsonContent, 'utf8', function (err) {
                if (err) {
                    console.log("Erro: urls nao puderam ser salvas.");
                return console.log(err);
                }
            });

        }
        else {
            console.log('Erro: status nao esta tudo bem');
            console.log('ou esgotou o tempo do evento...');
        }
    }
}

// Teste de envio da url a ser armazenada no banco de dados
/*xhr.open("POST", "http://"+ADRESS+":3000/thingdescription",true); 
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send(JSON.stringify({
    url_device: url_device
}));*/

// Teste de envio de lista de urls ou lista de listas de urls a ser armazenada no banco de dados
xhr.open("POST", "http://"+ADRESS+":3000/thingdescription/:lista",true); 
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send(JSON.stringify({
    url_list: urls_list
}));

//Teste de string de busca como filtro de busca no banco usando POST
/*xhr.open("GET", "http://"+ADRESS+":3000/thingdescription/:filtro",true);
xhr.setRequestHeader('Content-Type', JSON.stringify({//gambiarra das brabas
    string_busca: string_busca
}));
xhr.send();*/