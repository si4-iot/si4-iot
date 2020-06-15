const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const xhr = new XMLHttpRequest();

// Destination IP
//const ADRESS = '10.0.0.105';
 const ADRESS = 'ec2-3-135-214-58.us-east-2.compute.amazonaws.com';
//const ADRESS = "localhost"

// Test machines IPs
// const TEST = '192.168.15.5'
const TEST = "localhost"
// const TEST = '192.168.0.108' // Lucas, pode colocar seu ip aqui para fazer os testes

// array of disired things urls
var urls = ["http://"+TEST+":8080/counter", "http://"+TEST+":8080/sensor"];
const url_device1 = "http://ec2-3-18-220-42.us-east-2.compute.amazonaws.com:8080/device_101a4202";
const url_device2 = "http://ec2-3-18-220-42.us-east-2.compute.amazonaws.com:8080/device_102a3096";
const url_device3 = "http://ec2-3-18-220-42.us-east-2.compute.amazonaws.com:8080/device_102a1759";
const url_device4 = "http://ec2-3-18-220-42.us-east-2.compute.amazonaws.com:8080/device_103a1599";
const url_device5 = "http://ec2-3-18-220-42.us-east-2.compute.amazonaws.com:8080/device_103a3343";
const url_device6 = "http://ec2-3-18-220-42.us-east-2.compute.amazonaws.com:8080/device_104a9248";
const url_device7 = "http://ec2-3-18-220-42.us-east-2.compute.amazonaws.com:8080/device_106a8455";
const url_device8 = "http://ec2-3-18-220-42.us-east-2.compute.amazonaws.com:8080/device_112a8832";
const url_device9 = "http://ec2-3-18-220-42.us-east-2.compute.amazonaws.com:8080/device_113a6082";
const url_device10 = "http://ec2-3-18-220-42.us-east-2.compute.amazonaws.com:8080/device_114a2276";

const url_list = [
    "http://ec2-3-18-220-42.us-east-2.compute.amazonaws.com:8080/device_114a3607",
    "http://ec2-3-18-220-42.us-east-2.compute.amazonaws.com:8080/device_117a2520",
    "http://ec2-3-18-220-42.us-east-2.compute.amazonaws.com:8080/device_118a8731",
    "http://ec2-3-18-220-42.us-east-2.compute.amazonaws.com:8080/device_117a6318",
    "http://ec2-3-18-220-42.us-east-2.compute.amazonaws.com:8080/device_11a9601",
    "http://ec2-3-18-220-42.us-east-2.compute.amazonaws.com:8080/device_121a1965",
    "http://ec2-3-18-220-42.us-east-2.compute.amazonaws.com:8080/device_120a8077",
    "http://ec2-3-18-220-42.us-east-2.compute.amazonaws.com:8080/device_120a6804",
    "http://ec2-3-18-220-42.us-east-2.compute.amazonaws.com:8080/device_122a1958",
    "http://ec2-3-18-220-42.us-east-2.compute.amazonaws.com:8080/device_107a8854"
];

//Exemplos de strings de busca no banco de dados mongodb, para mais informações ou métodos mais refinados de busca
//acesse https://docs.mongodb.com/manual/tutorial/query-documents/
var string_busca = {
    //exemplo de busca simples, por uma caracteristica nos documentos
    //"properties.gps.unit of measurement": "geo:Point" // elemento único de um documento
    //"properties.humidity.unit of measurement": "m3-lite:Humidity" // elemento único de um documento

    //exemplo de busca composta simples, bucas duas caracteristicas independentes nos documentos
    /*$or:[
    {"properties.gps.unit of measurement": "geo:Point"},
    {"properties.humidity.unit of measurement": "m3-lite:Humidity"}
    ]*/

    //exemplo de buca simples, por mais de uma caracteristica em um mesmo documento
    /*"properties.gps.unit of measurement": "geo:Point",
    "properties.falldetector.unit of measurement": "saref:OnOffState"*/

    $or:[{"properties.gps.unit of measurement": "geo:Point",
    "properties.carbon_dioxide.unit of measurement": "m3-lite:CO2"},
    {"properties.gps.unit of measurement": "m3-lite:GPSSensor",
    "properties.carbon_dioxide.unit of measurement": "m3-lite:CO2"}]
}

xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
        console.log('status: ', xhr.status);
        if (xhr.status == 200) {
            console.log('Resposta recebida:\n');
            console.log(xhr.responseText);
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
    url_device: url_device1
}));*/

// Teste de envio de lista de urls a ser armazenada no banco de dados
/*xhr.open("POST", "http://"+ADRESS+":3000/thingdescription/:lista",true); 
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send(JSON.stringify({
    url_list: url_list
}));*/

//Teste de string de busca como filtro de busca no banco usando POST
xhr.open("GET", "http://"+ADRESS+":3000/thingdescription/:filtro",true);
xhr.setRequestHeader('Content-Type', JSON.stringify({//gambiarra das brabas
    string_busca: string_busca
}));
xhr.send();

// por favor não usar esse trecho do código
/*xhr.setRequestHeader('Content-Type','application/json'); // nao esta funcionando. não sei o porque.
xhr.send(JSON.stringify({
    string_busca: string_busca
}));*/
