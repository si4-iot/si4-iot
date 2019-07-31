#include <ArduinoJson.h>
#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>
#include <ESP8266WiFi.h> 
#include <PubSubClient.h>

//defines - mapeamento de pinos do NodeMCU
#define D0    16
#define D1    5
#define D2    4
#define D3    0
#define D4    2
#define D5    14
#define D6    12
#define D7    13
#define D8    15
#define D9    3
#define D10   1

//sendores de temperatura e umidade
#define DHTTYPE1    DHT11     // DHT 11
DHT_Unified dht1(D3, DHTTYPE1);
#define DHTTYPE2    DHT22     // DHT 22 (AM2302)
DHT_Unified dht2(D5, DHTTYPE2);
uint32_t delayMS;

//WiFi
const char* SSID = "LPRM-EXP";                // SSID / nome da rede WiFi que deseja se conectar
const char* PASSWORD = "lprm666!";   // Senha da rede WiFi que deseja se conectar
WiFiClient wifiClient;                        
 
//MQTT Server
const char* BROKER_MQTT = "iot.eclipse.org"; //URL do broker MQTT que se deseja utilizar
int BROKER_PORT = 1883;                      // Porta do Broker MQTT

#define ID_MQTT  "ESPSalgado1"            //Informe um ID unico e seu. Caso sejam usados IDs repetidos a ultima conexão irá sobrepor a anterior. 
//#define TOPIC_PUBLISH "SalgadoEnvia"    //Informe um Tópico único. Caso sejam usados tópicos em duplicidade, o último irá eliminar o anterior.
#define TOPIC_SUBSCRIBE "SalgadoRecebe" //Informe um Tópico único. Caso sejam usados tópicos em duplicidade, o último irá eliminar o anterior.
PubSubClient MQTT(wifiClient);        // Instancia o Cliente MQTT passando o objeto espClient

//Declaração das Funções
void mantemConexoes();  //Garante que as conexoes com WiFi e MQTT Broker se mantenham ativas
void conectaWiFi();     //Faz conexão com WiFi
void conectaMQTT();     //Faz conexão com Broker MQTT
void recebePacote(char* topic, byte* payload, unsigned int length);

void setup() {
  pinMode(D2, OUTPUT); // definindo o pino D2 para controlar o LED anexado

  Serial.begin(115200);

  dht1.begin(); // inicializando o dht11
  dht2.begin(); // inicializando o dht22
  sensor_t sensor1;
  sensor_t sensor2;
  dht1.temperature().getSensor(&sensor1);
  dht2.temperature().getSensor(&sensor2);
  dht1.humidity().getSensor(&sensor1);
  dht2.humidity().getSensor(&sensor2);
  delayMS = sensor1.min_delay / 1000;
  delayMS = sensor2.min_delay / 1000;
  
  conectaWiFi();
  MQTT.setServer(BROKER_MQTT, BROKER_PORT);
  MQTT.setCallback(recebePacote);   
}

void loop() {
  mantemConexoes();
  MQTT.loop();
}

void mantemConexoes() {
    if (!MQTT.connected()) {
       conectaMQTT(); 
    }
    
    conectaWiFi(); //se não há conexão com o WiFI, a conexão é refeita
}

void conectaWiFi() {

  if (WiFi.status() == WL_CONNECTED) {
     return;
  }
        
  Serial.print("Conectando-se na rede: ");
  Serial.print(SSID);
  Serial.println("  Aguarde!");

  WiFi.begin(SSID, PASSWORD); // Conecta na rede WI-FI  
  while (WiFi.status() != WL_CONNECTED) {
      delay(100);
      Serial.print(".");
  }
  
  Serial.println();
  Serial.print("Conectado com sucesso, na rede: ");
  Serial.print(SSID);  
  Serial.print("  IP obtido: ");
  Serial.println(WiFi.localIP()); 
}

void conectaMQTT() { 
    while (!MQTT.connected()) {
        Serial.print("Conectando ao Broker MQTT: ");
        Serial.println(BROKER_MQTT);
        if (MQTT.connect(ID_MQTT)) {
            Serial.println("Conectado ao Broker com sucesso!");
            MQTT.subscribe(TOPIC_SUBSCRIBE);
        } 
        else {
            Serial.println("Nao foi possivel se conectar ao broker.");
            Serial.println("Nova tentatica de conexao em 5s");
            delay(5000);
        }
    }
}

void recebePacote(char* topic, byte* payload, unsigned int length){

  StaticJsonDocument<256> doc;
  DynamicJsonDocument obj(256);
  DynamicJsonDocument descri(1024);
  char buffer[512];
  char msg[1024];
  deserializeJson(doc, payload, length);

  if (doc["acao"] == 0) {
    
    digitalWrite(D2, LOW);   // Desliga o LED caso receba o valor 0
    MQTT.publish(doc["topico"], "LED Off");
    
  }
  else if(doc["acao"] == 1) {
    
    digitalWrite(D2, HIGH);  // Liga o LED caso receba o valor 1
    MQTT.publish(doc["topico"], "LED On");
    
  }
  else if(doc["acao"] == 2){ // Envia informações do sensor ligado ao pino D3 caso receba o valor 2

    sensors_event_t event1;
    dht1.temperature().getEvent(&event1);
    obj["temperatura"] = event1.temperature;
    dht1.humidity().getEvent(&event1);
    obj["umidade"] = event1.relative_humidity;

    size_t n = serializeJson(obj, buffer);
    MQTT.publish(doc["topico"], buffer, n);

  }
  else if(doc["acao"] == 3){ // Envia informações do sensor ligado ao pino D5 caso receba o valor 3
    
    sensors_event_t event2;
    dht2.temperature().getEvent(&event2);
    obj["temperatura"] = event2.temperature;
    dht2.humidity().getEvent(&event2);
    obj["umidade"] = event2.relative_humidity;
    
    size_t n = serializeJson(obj, buffer);
    MQTT.publish(doc["topico"], buffer, n);
    
  }

 else if(doc["acao"] == "info"){

   JsonArray context = descri.createNestedArray("@context");
   JsonObject nestedContext = context.createNestedObject();
   context.add("https:www.w3.org/2019/wot/td/v1");// invertido
   nestedContext["cov"] = "http://www.example.org/coap-binding#"; //invertido
   
   descri["id"] = "ID";
   descri["title"] = "LedTempHum";
   descri["description"] = "Sensing led, temperature, humidity";
   descri["securityDefinitions"] = descri["nosec_sc"]; // não recebe o objeto como valor
   descri["nosec_sc"] = descri["scheme"]; // não recebe o objeto como valor
   descri["scheme"] = "nosec";
   
   descri["security"] = "nosec_sc";
   
   descri["properties"] = descri["status-led"];// todos do bloco abaixo tem que estar na hierarquia deste objeto
   descri["status-led"] = descri["description2"];
   descri["description2"] = "Shows the current status of the led (on or off)";// não consegui usar o mesmo nome
   descri["type"] = "string";
   JsonArray forms = descri.createNestedArray("forms");
   JsonObject nestedForms = forms.createNestedObject();
   nestedForms["op"] = "readproperty";
   nestedForms["href"] = "coaps://IP:PORT/ligthled";
   nestedForms["cov:methodName"] = "GET"; 
   
   descri["status-dht11"] = descri["description3"];// todos do bloco abaixo tem que estar na hierarquia deste objeto
   descri["description3"] = "Shows the current temperature and humidity of the sensor DHT11";
   descri["type"] = "string";
   JsonArray forms2 = descri.createNestedArray("forms2");
   JsonObject nestedForms2 = forms2.createNestedObject();
   nestedForms2["op"] = "readproperty";
   nestedForms2["href2"] = "coaps://IP:PORT/dht11";
   nestedForms2["cov:methodName"] = "GET";

   descri["status-dht22"] = descri["description4"];//// todos do bloco abaixo tem que estar na hierarquia deste objeto
   descri["description4"] = "Shows the current temperature and humidity of the sensor DHT22";
   descri["type"] = "string";
   JsonArray forms3 = descri.createNestedArray("forms3");
   JsonObject nestedForms3 = forms3.createNestedObject();
   nestedForms3["op"] = "readproperty";
   nestedForms3["href3"] = "coaps://IP:PORT/dht22";
   nestedForms3["cov:methodName"] = "GET";
   
   descri["actions"] = descri["toggle"]; // não recebe o objeto como valor
   descri["toggle"] = descri["description5"]; // não recebe o objeto como valor
   descri["description5"] = "Turn on or off the led";
   JsonArray forms4 = descri.createNestedArray("forms4");
   JsonObject nestedForms4 = forms4.createNestedObject();
   nestedForms4["href4"] = "coaps://IP:PORT/lightled";
   nestedForms4["cov:methodName2"] = "POST";
    
    size_t n = serializeJson(descri, msg);
    MQTT.publish(doc["topico"], msg, n);

 }
}
