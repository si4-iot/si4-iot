WoT.fetch("coap://localhost:5683/sensor").then( async (td) => {

	let thing = WoT.consume(td);
	console.info("=== TD ===");
	console.info(td);
	console.info("==========");

	// using await for serial execution (note 'async' in then() of fetch())
	try {
		// read property #1
		let read1 = await thing.properties.temperature.read();
		console.info("temperature value is", read1);

		await thing.actions.change_temperature.invoke();
		let chg1 = await thing.properties.temperature.read();
		console.info("temperature value is", chg1);

		await thing.actions.change_humidity.invoke();
		let chg2 = await thing.properties.humidity.read();
		console.info("humidity value is", chg2);

	} catch(err) {
		console.error("Script error:", err);
	}

}).catch( (err) => { console.error("Fetch error:", err); });