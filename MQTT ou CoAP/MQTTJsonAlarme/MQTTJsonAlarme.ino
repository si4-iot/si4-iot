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

// Json em formato de string contendo todo o TD
#define TD "{\"@context\":\"https:\/\/www.w3.org\/2019\/wot\/td\/v1\",\"title\":\"LedTempHumMqtt\",\"id\":\"urn:dev:ic:flow:jsonTemperatureHumiditySensorMQTT\",\"securityDefinitions\":{\"nosec_sc\":{\"scheme\":\"nosec\"}},\"security\":[\"nosec_sc\"],\"properties\":{\"subscription\":{\"description\":\"topic that the device receive messages of another dispositive\",\"contentType\":\"string\",\"enum\":[{\"topico\":\"user-provided topic\",\"acao\":\"number that represents a action\"},{\"topico\":\"user-provided topic\",\"acao\":\"info\"}],\"forms\":[{\"op\":\"readproperty\",\"href\":\"mqtt:\/\/mqtt.eclipse.org\/SalgadoRecebe\",\"contentType\":\"application\/json\",\"cov:methodName\":\"subscribe\"}]}},\"actions\":{\"LED-Off\":{\"description\":\"Turn off the led and receive a confirmation message by the topic of your choice\",\"contentType\":\"application\/json\",\"enum\":[{\"topico\":\"user-provided topic\",\"acao\":0}],\"forms\":[{\"href\":\"mqtt:\/\/mqtt.eclipse.org\/SalgadoRecebe\",\"type\":\"application\/json\",\"cov:methodName\":\"publish\"}]},\"LED-On\":{\"description\":\"Turn on the led and receive a confirmation message by the topic of your choice\",\"contentType\":\"application\/json\",\"enum\":[{\"topico\":\"user-provided topic\",\"acao\":1}],\"forms\":[{\"href\":\"mqtt:\/\/mqtt.eclipse.org\/SalgadoRecebe\",\"type\":\"application\/json\",\"cov:methodName\":\"publish\"}]},\"dht11\":{\"description\":\"Send to a topic chose by the user the current temperature and humidity of the sensor dht11\",\"contentType\":\"application\/json\",\"enum\":[{\"topico\":\"user-provided topic\",\"acao\":2}],\"forms\":[{\"href\":\"mqtt:\/\/mqtt.eclipse.org\/SalgadoRecebe\",\"type\":\"application\/json\",\"cov:methodName\":\"publish\",\"unit\":\"\u00b0C and % of humidity of the air\"}]},\"dht22\":{\"description\":\"Send to a topic chose by the user the current temperature and humidity of the sensor dht22\",\"contentType\":\"application\/json\",\"enum\":[{\"topico\":\"user-provided topic\",\"acao\":3}],\"forms\":[{\"href\":\"mqtt:\/\/mqtt.eclipse.org\/SalgadoRecebe\",\"type\":\"application\/json\",\"cov:methodName\":\"publish\",\"unit\":\"\u00b0C and % of humidity of the air\"}]}},\"events\":{\"overheating\":{\"description\":\"System detects critical temperature (overheating)\",\"data\":{\"type\":\"application\/json\"},\"forms\":[{\"href\":\"mqtt:\/\/mqtt.eclipse.org\/Alarme\",\"contentType\":\"application\/json\",\"op\":\"subscribeevent\"}]}}}"

//sendores de temperatura e umidade
#define DHTTYPE1    DHT11     // DHT 11
DHT_Unified dht1(D3, DHTTYPE1);
#define DHTTYPE2    DHT22     // DHT 22 (AM2302)
DHT_Unified dht2(D5, DHTTYPE2);
uint32_t delayMS;

//WiFi
//const char* SSID = "Lucas Giovani";                // SSID / nome da rede WiFi que deseja se conectar
//const char* PASSWORD = "59456797";   // Senha da rede WiFi que deseja se conectar
const char* SSID = "VIVO-0821";                // SSID / nome da rede WiFi que deseja se conectar
const char* PASSWORD = "1234pin6789pin";   // Senha da rede WiFi que deseja se conectar
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

#define TOPIC_ALARME "Alarme" // Topico ao qual será enviado as informações do alarme
#define limit 26 //temperatura limite do alarme
//buzzer state
bool buzzerstate;
int s = 0;

void setup() {
  pinMode(D2, OUTPUT); // definindo o pino D2 para controlar o LED anexado
  digitalWrite(D2, HIGH);

  pinMode(D1, OUTPUT); // definindo como saida o pino do buzzer

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
  buzzer();
  delay(1000);
}

void mantemConexoes() {
    if (!MQTT.connected()) {
       conectaMQTT(); 
    }
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

    yield();

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

    MQTT.publish(doc["topico"], TD);

   }
}

void buzzer(){

   DynamicJsonDocument obj(256);
   char msg[256];
   JsonObject alarme = obj.createNestedObject("alarme");

    sensors_event_t event2;
    dht2.temperature().getEvent(&event2);
    sensors_event_t event1;
    dht1.temperature().getEvent(&event1);

  if((event1.temperature > limit || event2.temperature > limit) && s == 0){
      
    s = 1;
    alarme["status"]="Alerta! alta temperatura detectada!";
    size_t n = serializeJson(obj, msg);
    MQTT.publish(TOPIC_ALARME, msg, n);
    
    }
    else if((event1.temperature < limit || event2.temperature < limit) && s == 1){
      if(buzzerstate == true){
          noTone(D1);
      }
      s = 0;
      alarme["status"]="Está tudo bem!";
      size_t n = serializeJson(obj, msg);
      MQTT.publish(TOPIC_ALARME, msg, n);
    }
    
    if(s == 1){
        if(buzzerstate == false){
        tone(D1, 1000);
        buzzerstate = true;
      }
      else{
        noTone(D1);
        buzzerstate = false;
      }
    }
  
}
