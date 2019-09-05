from coapthon.client.helperclient import HelperClient
import httplib
import os
import re
import json
#Biblioteca nativa do MongoDB:
from pymongo import MongoClient 

#Tentando conexao
try: 
	conn = MongoClient() 
	print("Conexao com MongoDB estabelecida!") 
except: 
	print("Erro ao conectar ao MongoDB") 

#Database
db = conn.database 
# Acesso ou criacao de um documento - Armazena TD
collectionTD = db.coapdb
# Acesso ou criacao de um documento - Armazena dados dos sensores
collectionData = db.coapdb

print ("Iniciando Cliente CoAp")
#IP DO SERVER:
host = "192.168.0.24"
#Porta padrao
port = 5683
#Gerando novo cliente
client = HelperClient(server=(host, port))
print ("Iniciando conexao no servidor " + host)
print ("Conectado")

############
def descricao(host):
    print ("Executando descricao")
    conectionH = httplib.HTTPConnection(host)
    conectionH.request("GET", "/info")
    responseCon = conectionH.getresponse()
    data = responseCon.read()
    #desc = json.loads(data)
    desc = json.dumps(data)
    conectionH.close()
    return desc
############
def methodsDHT11(i,data):
    switcher= {
        1:getRequestDHT11,
        2:postRequestDHT11
    }
    func=switcher.get(i,lambda :'Invalid')
    return func(data)
############
def methodsDHT22(i,data):
    switcher= {
        1:getRequestDHT22,
        2:postRequestDHT22
    }
    func = switcher.get(i,lambda :"Requisicao invalida")
    return func(data)
############
def methodsLED(i,data):
    switcher= {
        1:getRequestLED,
        2:postRequestLED
    }
    func = switcher.get(i,lambda :"Requisicao invalida")
    return func(data)
############
def getRequestDHT11(data):
    print ("Executando requisicao")
    print ("Sensor DHT11")
    path = "/dht11"
    response = client.get(path)
    #print (response.pretty_print())
    data = response.payload
    return data
############
def postRequestDHT11(data):
    path = "/dht11"
    response = client.post(path, '')
    print (response.pretty_print())
############
def getRequestDHT22(data):
    print ("Executando requisicao")
    print ("Sensor DHT22")
    path = "/dht22"
    response = client.get(path)
    data = response.payload
    return data
############
def postRequestDHT22(data):
    path = "/dht22"
    response = client.post(path, '')
    print (response.pretty_print())
############
def getRequestLED(data):
    print ("Executando requisicao")
    print ("Sensor LED")
    path = "/lightled"
    response = client.get(path)
    print (response.pretty_print())
############
def postRequestLED(data):
    path = "/lightled"
    postg = input('Escolha ON ou OFF (1:ON, 2:OFF): ')
    if (postg == 1):
        response = client.post(path, 'on')
    else:
        response = client.post(path, 'off')
    print (response.pretty_print())
############
def main():
    #Teste da descoberta do Dispositivo
    print ("Testando a descoberta do dispositivo")
    path = "/.well-known/core"
    response = client.get(path)
    print (response.pretty_print())

############
def convert(data):
    n = [float(s) for s in re.findall(r'-?\d+\.?\d*', data)]
    return n[0]

####################################################################################
alvo = input('Descricao ou Requisicao (1:Descricao, 2:Requisicao): ')
data = ''
temp = 0
hum = 0
indice = 0
aux = {}
if (alvo == 1):
    jsonObj = descricao(host)
    print(jsonObj)
    indice = collectionTD.insert_one(jsonObj)
else:
    sensor = input('Escolha sensor (1:DHT11, 2:DHT22, 3:LED): ')
    method = input('Escolha a requisicao (1:GET, 2:POST): ')
    if (sensor == 1):
        data = methodsDHT11(method,data)
        data = data.split(",")
        temp = convert(data[0])
        hum = convert(data[1])
        aux = {
            "temperature":temp,
            "humidity":hum
        }
        indice = collectionData.insert_one(aux)
    elif (sensor == 2):
        data = methodsDHT22(method,data)
        data = data.split(",")
        temp = convert(data[0])
        hum = convert(data[1])
        aux = {
            "temperature":temp,
            "humidity":hum
        }
        indice = collectionData.insert_one(aux)
    else:
        data = methodsLED(method,data)
    print("Requisicao terminada.")
    client.stop()
####################################################################################

#Imprimindo dados inseridos no banco
print("Dados inseridos. ID = ",indice) 

# Printing the data inserted 
cursor = collectionData.find() 
print("Banco: Data")
for record in cursor: 
	print(record)
print("Banco: TD")
cursor = collectionTD.find() 
for record in cursor: 
	print(record)  