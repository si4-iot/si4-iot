//node packages/cli/dist/cli.js examples/scripts/counter-client-milisegundos-virtual.js

WoTHelpers.fetch("http://ec2-3-18-220-42.us-east-2.compute.amazonaws.com:8080/device_114a2276").then(async (td) => {

	try {
		
		console.time('msg');// Inicia a contagem do tempo de resposta

        let thing = await WoT.consume(td); // Recebe o TD
        
        thing.invokeAction("change_oxygen"); // Invoca a ação relacionada a atualização do valor do sensor virtual de oxigênio
		let inc1 = await thing.readProperty("oxygen"); // Requisita a leitura do sensor virtual de oxigênio
		console.info(inc1); // Imprime o valor adquirido

	} catch(err) {

		console.error("Script error:", err);

	}
	console.timeEnd('msg');// Encerra a contagem do tempo de resposta e a imprime

}).catch( (err) => { console.error("Fetch error:", err); });
