//node packages/cli/dist/cli.js examples/scripts/counter-client-milisegundos.js como executar a partir da pasta thingweb.node-wot


WoTHelpers.fetch("http://192.168.0.103:80/info").then( async (td) => {

	try {
		
		console.time('msg');// Inicia a contagem do tempo de resposta

		let thing = await WoT.consume(td); // Recebe o TD
		let inc1 = await thing.readProperty("status_dht22"); // Faz a requisição da leitura do sensor
		console.info(inc1); // Imprime o valor da leitura


	} catch(err) {

		console.error("Script error:", err);

	}
	console.timeEnd('msg');// Encerra a contagem do tempo de resposta e a imprime

}).catch( (err) => { console.error("Fetch error:", err); });