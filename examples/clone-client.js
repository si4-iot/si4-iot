WoT.fetch("coap://localhost:5683/device_292a6591").then( async (td) => {

	let thing = WoT.consume(td);
	console.info("=== TD ===");
	console.info(td);
	console.info("==========");

	// using await for serial execution (note 'async' in then() of fetch())
	try {
		// read property #1
		let read1 = await thing.properties.Umidade.read();
		console.info("count value is", read1);
				
		// increment property #1
		await thing.actions.change_Umidade.invoke();
		let inc1 = await thing.properties.Umidade.read();
		console.info("Umidade value is", inc1);

		await thing.actions.change_Umidade.invoke();
		let inc2 = await thing.properties.Umidade.read();
		console.info("new Umidade value is", inc2);
				
		// // increment property #2
		// await thing.actions.increment.invoke();
		// let inc2 = await thing.properties.count.read();
		// console.info("count value after increment #2 is", inc2);
				
		// // decrement property
		// await thing.actions.decrement.invoke();
		// let dec1 = await thing.properties.count.read();
		// console.info("count value after decrement is", dec1);

	} catch(err) {
		console.error("Script error:", err);
	}

}).catch( (err) => { console.error("Fetch error:", err); });