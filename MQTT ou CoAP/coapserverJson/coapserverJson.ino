/*
ESP-COAP Server
*/
#include <ESP8266WebServer.h>
#include <ESP8266WiFi.h>
#include <coap_server.h>

#include <ArduinoJson.h>

#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>

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

//Criamos uma variável do tipo ESP8266WebServer que já possui funções
//que auxiliam na criação das rotas que o ESP8266 vai responder
ESP8266WebServer server(80);

//sendores de temperatura e umidade
#define DHTTYPE1    DHT11     // DHT 11
DHT_Unified dht1(D3, DHTTYPE1);
#define DHTTYPE2    DHT22     // DHT 22 (AM2302)
DHT_Unified dht2(D5, DHTTYPE2);
uint32_t delayMS;

coapServer coap;

//WiFi connection info
const char* ssid = "VIVO-0821";
const char* password = "1234pin6789pin";

// LED STATE
bool LEDSTATE;

// CoAP server endpoint URL
void dht11(coapPacket *packet, IPAddress ip, int port,int obs) {
  Serial.println("dht11");

  char buffer[512];
  DynamicJsonDocument obj(200);

    obj["sensor"]="dht11";
    sensors_event_t event1;
    dht1.temperature().getEvent(&event1);
    obj["temperatura"] = event1.temperature;
    dht1.humidity().getEvent(&event1);
    obj["umidade"] = event1.relative_humidity;
    size_t n = serializeJson(obj, buffer);
     if(obs==1)
    coap.sendResponse(buffer);
   else
    coap.sendResponse(ip,port,buffer);

}

void dht22(coapPacket *packet, IPAddress ip, int port,int obs) {
  Serial.println("dht22");

  char buffer[512];
  DynamicJsonDocument obj(200);

    obj["sensor"]="dht22";
    sensors_event_t event2;
    dht1.temperature().getEvent(&event2);
    obj["temperatura"] = event2.temperature;
    dht1.humidity().getEvent(&event2);
    obj["umidade"] = event2.relative_humidity;
    size_t n = serializeJson(obj, buffer);
     if(obs==1)
    coap.sendResponse(buffer);
   else
    coap.sendResponse(ip,port,buffer);

}

void callback_lightled(coapPacket *packet, IPAddress ip, int port,int obs) {
  Serial.println("Lightled");

  // send response
  char p[packet->payloadlen + 1];
  memcpy(p, packet->payload, packet->payloadlen);
  p[packet->payloadlen] = NULL;

  String message(p);

  if (message.equals("off"))
    LEDSTATE = false;
  else if (message.equals("on"))
    LEDSTATE = true;

  if (LEDSTATE) {
    digitalWrite(D2, HIGH) ;
    if(obs==1)
     coap.sendResponse("On");
     else
    coap.sendResponse(ip, port, "On");
    
  } else {
    digitalWrite(D2, LOW) ;
    if (obs==1)
    coap.sendResponse("Off");
    else
    coap.sendResponse(ip, port, "Off");

  }
}

void descricao() {
  Serial.println("descri");

  String ip = WiFi.localIP().toString();

  DynamicJsonDocument descri(2048);
  char msg[2048];

   JsonArray context = descri.createNestedArray("@context");
   context.add("https://www.w3.org/2019/wot/td/v1");
   JsonObject nestedContext = context.createNestedObject();
   nestedContext["cov"] = "http://www.example.org/coap-binding#";

   descri["id"] = "urn:dev:ic:flow:jsonTemperatureHumiditySensorWeb";
   descri["title"] = "LedTempHum";
   descri["description"] = "Sensing led, temperature, humidity";
   
   JsonObject secudef = descri.createNestedObject("securityDefinitions");
   JsonObject nosec = secudef.createNestedObject("nosec_sc");
   nosec["scheme"] = "nosec";
   

   descri["security"] = "nosec_sc";
   
   JsonObject proper = descri.createNestedObject("properties");
   JsonObject sta = proper.createNestedObject("status-led");
   sta["description"] = "Shows the current status of the led";
   sta["contentType"] = "string";
   JsonArray resp = sta.createNestedArray("enum");
   resp.add("on");
   resp.add("off");
   JsonArray forms = sta.createNestedArray("forms");
   JsonObject nestedForms = forms.createNestedObject();
   nestedForms["op"] = "readproperty";
   nestedForms["href"] = "coaps://"+ip+":5683/ligthled";
   nestedForms["cov:methodName"] = "GET";

   JsonObject dhtsensor11 = proper.createNestedObject("status-dht11");
   dhtsensor11["description"] = "Shows the current temperature and humidity of the sensor DHT11";
   dhtsensor11["type"] = "application/json";
   JsonArray forms2 = dhtsensor11.createNestedArray("forms");
   JsonObject nestedForms2 = forms2.createNestedObject();
   nestedForms2["op"] = "readproperty";
   nestedForms2["href"] = "coaps://"+ip+":5683/dht11";
   nestedForms2["cov:methodName"] = "GET";

   JsonObject dhtsensor22 = proper.createNestedObject("status-dht22");
   dhtsensor22["description"] = "Shows the current temperature and humidity of the sensor DHT22";
   dhtsensor22["contentType"] = "application/json";
   JsonArray forms3 = dhtsensor22.createNestedArray("forms");
   JsonObject nestedForms3 = forms3.createNestedObject();
   nestedForms3["op"] = "readproperty";
   nestedForms3["href"] = "coaps://"+ip+":5683/dht22";
   nestedForms3["cov:methodName"] = "GET";
   
   JsonObject actions = descri.createNestedObject("actions");
   JsonObject toggle = actions.createNestedObject("toggle");
   toggle["description"] = "Turn on or off the led";
   toggle["contentType"] = "string";
   JsonArray resp1 = toggle.createNestedArray("enum");
   resp1.add("on");
   resp1.add("off");
   JsonArray forms4 = toggle.createNestedArray("forms");
   JsonObject nestedForms4 = forms4.createNestedObject();
   nestedForms4["href"] = "coaps://"+ip+":5683/lightled";
   nestedForms4["cov:methodName"] = "POST";

   //size_t n = serializeJsonPretty(descri, msg);
   size_t n = serializeJson(descri, msg);
   server.send (200, "application/json", msg);

}

void onNotFound() 
{
  server.send(404, "text/plain", "Not Found" );
}


void setup() {
  yield();
  //serial begin
  Serial.begin(115200);

  WiFi.begin(ssid, password);
  Serial.println(" ");

  // Connect to WiFi network
  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    //delay(500);
    yield();
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
  // Print the IP address
  Serial.println(WiFi.localIP());

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
  
  pinMode(D2, OUTPUT);
  digitalWrite(D2, HIGH);
  //LEDSTATE = true;


  // add server url endpoints.
  // can add multiple endpoint urls.

  coap.server(dht11, "dht11");
  coap.server(callback_lightled, "lightled");
  coap.server(dht22, "dht22");
 // coap.server(callback_text,"text");

  // start coap server/client
  coap.start();
  // coap.start(5683);

  // configurando o servidor htpp
  server.on("/info", HTTP_GET, descricao);
  server.onNotFound(onNotFound);
  //Inicializamos o server que criamos na porta 80
  server.begin();
  Serial.println("Servidor HTTP iniciado");
  
}

void loop() {
  
  coap.loop();
  server.handleClient();
  delay(1000);

}
