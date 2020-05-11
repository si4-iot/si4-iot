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
const char* SSID = "Lucas Giovani";                // SSID / nome da rede WiFi que deseja se conectar
const char* PASSWORD = "59456797";   // Senha da rede WiFi que deseja se conectar
WiFiClient wifiClient;                        
 
//MQTT Server
const char* BROKER_MQTT = "mqtt.eclipse.org"; //URL do broker MQTT que se deseja utilizar
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
  digitalWrite(D2, HIGH);

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
  DynamicJsonDocument descri(4096);
  char buffer[512];
  char msg[4096];
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

    JsonObject dhT11 = obj.createNestedObject("dht11");
    sensors_event_t event1;
    dht1.temperature().getEvent(&event1);
    dhT11["temperatura"] = event1.temperature;
    dht1.humidity().getEvent(&event1);
    dhT11["umidade"] = event1.relative_humidity;

    size_t n = serializeJson(obj, buffer);
    MQTT.publish(doc["topico"], buffer, n);

  }
  else if(doc["acao"] == 3){ // Envia informações do sensor ligado ao pino D5 caso receba o valor 3

    JsonObject dhT22 = obj.createNestedObject("dht22");
    sensors_event_t event2;
    dht2.temperature().getEvent(&event2);
    dhT22["temperatura"] = event2.temperature;
    dht2.humidity().getEvent(&event2);
    dhT22["umidade"] = event2.relative_humidity;
    
    size_t n = serializeJson(obj, buffer);
    MQTT.publish(doc["topico"], buffer, n);
    
  }

 else if(doc["acao"] == "info"){

   descri["@context"] = "https://www.w3.org/2019/wot/td/v1";
   descri["title"] = "LedTempHumMqtt";
   descri["id"] = "urn:dev:ic:flow:jsonTemperatureHumiditySensorMQTT";
   
   JsonObject secudef = descri.createNestedObject("securityDefinitions");
   JsonObject nosec = secudef.createNestedObject("nosec_sc");
   nosec["scheme"] = "nosec";

   descri["security"] = "nosec_sc";

   JsonObject proper = descri.createNestedObject("properties");
   JsonObject subs = proper.createNestedObject("subscription");
   subs["description"] = "topic that the device receive messages of another dispositive";
   subs["contentType"] = "string";
   
   JsonArray enume = subs.createNestedArray("enum");
   JsonObject nestedEnume = enume.createNestedObject();
   nestedEnume["topico"] = "user-provided topic";
   nestedEnume["acao"] = "number that represents a action";
   JsonObject nestedEnume2 = enume.createNestedObject();
   nestedEnume2["topico"] = "user-provided topic";
   nestedEnume2["acao"] = "info";

   JsonArray forms = subs.createNestedArray("forms");
   JsonObject nestedForms = forms.createNestedObject();
   nestedForms["op"] = "readproperty";
   nestedForms["href"] = "mqtt://mqtt.eclipse.org/SalgadoRecebe";
   nestedForms["contentType"] = "application/json";
   nestedForms["cov:methodName"] = "subscribe";

   JsonObject act = descri.createNestedObject("actions");
   JsonObject ledoff = act.createNestedObject("LED-Off");
   ledoff["description"] = "Turn off the led and receive a confirmation message by the topic of your choice";
   ledoff["contentType"] = "application/json";
   JsonArray enume2 = ledoff.createNestedArray("enum");
   JsonObject nestedEnume3 = enume2.createNestedObject();
   nestedEnume3["topico"] = "user-provided topic";
   nestedEnume3["acao"] = 0;

   JsonArray forms2 = ledoff.createNestedArray("forms");
   JsonObject nestedForms4 = forms2.createNestedObject();
   nestedForms4["href"] = "mqtt://mqtt.eclipse.org/SalgadoRecebe";
   nestedForms4["type"] = "application/json";
   nestedForms4["cov:methodName"] = "publish";

   JsonObject ledon = act.createNestedObject("LED-On");
   ledon["description"] = "Turn on the led and receive a confirmation message by the topic of your choice";
   ledon["contentType"] = "application/json";
   JsonArray enume3 = ledon.createNestedArray("enum");
   JsonObject nestedEnume5 = enume3.createNestedObject();
   nestedEnume5["topico"] = "user-provided topic";
   nestedEnume5["acao"] = 1;

   JsonArray forms3 = ledon.createNestedArray("forms");
   JsonObject nestedForms6 = forms3.createNestedObject();
   nestedForms6["href"] ="mqtt://mqtt.eclipse.org/SalgadoRecebe";
   nestedForms6["type"] = "application/json";
   nestedForms6["cov:methodName"] = "publish";

   JsonObject dht11 = act.createNestedObject("dht11");
   dht11["description"] = "Send to a topic chose by the user the current temperature and humidity of the sensor dht11";
   dht11["contentType"] = "application/json";
   JsonArray enume4 = dht11.createNestedArray("enum");
   JsonObject nestedEnume7 = enume4.createNestedObject();
   nestedEnume7["topico"] = "user-provided topic";
   nestedEnume7["acao"] = 2;

   JsonArray forms4 = dht11.createNestedArray("forms");
   JsonObject nestedForms8 = forms4.createNestedObject();
   nestedForms8["href"] = "mqtt://mqtt.eclipse.org/SalgadoRecebe";
   nestedForms8["type"] = "application/json";
   nestedForms8["cov:methodName"] = "publish";

   JsonObject dht22 = act.createNestedObject("dht22");
   dht22["description"] = "Send to a topic chose by the user the current temperature and humidity of the sensor dht22";
   dht22["contentType"] = "application/json";
   JsonArray enume5 = dht22.createNestedArray("enum");
   JsonObject nestedEnume9 = enume5.createNestedObject();
   nestedEnume9["topico"] = "user-provided topic";
   nestedEnume9["acao"] = 3;

   JsonArray forms5 = dht22.createNestedArray("forms");
   JsonObject nestedForms10 = forms5.createNestedObject();
   nestedForms10["href"] = "mqtt://mqtt.eclipse.org/SalgadoRecebe";
   nestedForms10["type"] = "application/json";
   nestedForms10["cov:methodName"] = "publish";
   
    size_t n = serializeJson(descri, msg);
    MQTT.publish(doc["topico"], msg, n);

   }
}
