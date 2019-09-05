import paho.mqtt.client as mqtt #import the client1
import time
import re
import json

print ('Iniciando Cliente MQTT')
broker_url = "iot.eclipse.org"
broker_port = 1883

data = ''
temp = 0
hum = 0
ok = True
ch = False

############
def on_connect(client, userdata, flags, rc):
    if rc==0:
        client.connected_flag=True
        print ('Conectado! OK')
    else:
        print ('Falha na conexao! Codigo de retorno: ',rc)

def on_disconnect(client, userdata, rc):
   print('Cliente desconectado!')

def on_message_DHT(client, userdata, message):
    print ('\nMensagem DHT recebida!')
    global data 
    global ok
    data = str(message.payload.decode("utf-8"))
    ok = False

def on_message_LED(client, userdata, message):
    print ('\nMensagem LED recebida! Status: ')
    print (str(message.payload.decode("utf-8")))
    global ok
    ok = False

def on_message_info(client, userdata, message):
    print ('\nMensagem Recebida!!! ')
    global ok
    ok = False

def on_message(client, userdata, message):
    print ('\nMensagem Recebida!!! ')
    global ok
    ok = False


############

def convert(data):
    n = [float(s) for s in re.findall(r'-?\d+\.?\d*', data)]
    return n[0]

############

print ('Criando uma nova instancia')
client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message


client.connected_flag=False


client.loop_start()
client.connect(broker_url, broker_port)
print('Conectando ...')
while not client.connected_flag: #wait in loop
    time.sleep(1)

#INICIO LOOP
while (ok == True):
    alvo = input('Descricao ou Requisicao (1:Descricao, 2:Requisicao): ')
    if (alvo == 1):
        client.publish(topic="SalgadoRecebe", payload="{\"acao\":\"info\",\"topico\":\"RecebeINFO\"}", qos=1, retain=True)
        print ('Publicado!')
        client.subscribe("RecebeINFO", qos=1)
        client.message_callback_add("RecebeINFO", on_message_info)
    else:
        sensor = input('Escolha sensor (1:DHT11, 2:DHT22, 3:LED): ')
        if (sensor == 1):
            ch = True
            client.publish(topic="SalgadoRecebe", payload="{\"acao\":2,\"topico\":\"RecebeDHT11\"}", qos=1, retain=True)
            print ('Publicado!')
            client.subscribe("RecebeDHT11", qos=1)
            client.message_callback_add("RecebeDHT11", on_message_DHT)
        elif (sensor == 2):
            ch = True
            client.publish(topic="SalgadoRecebe", payload="{\"acao\":3,\"topico\":\"RecebeDTH22\"}", qos=1, retain=True)
            print ('Publicado!')
            client.subscribe("RecebeDHT22", qos=1)
            client.message_callback_add("RecebeDHT22", on_message_DHT)
        else:
            client.publish(topic="SalgadoRecebe", payload="{\"acao\":1,\"topico\":\"RecebeLED\"}", qos=1, retain=False)
            print ('Publicado!')
            client.subscribe("RecebeLED", qos=1)
            client.message_callback_add("RecebeLED", on_message_LED)
        time.sleep(4)

#FIM LOOP
if (ch == True):
    data = data.split(",")
    temp = convert(data[0])
    hum = convert(data[1])
    print ('Recebido temperatura e humidade: ')
    print (temp, hum)
print ('Encerrando ...')
client.disconnect()
client.loop_stop()