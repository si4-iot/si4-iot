var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

// var xhr = new XMLHttpRequest();
// var url = "http://localhost:8000/";
// xhr.open("POST", url, true);
// xhr.setRequestHeader("Content-Type", "application/json");
// xhr.post("/", function (request, response) {
//     console.log('Got request:', request);
// });
// xhr.send('si4-iot-tdUrlRequest');

urls = ["coap://localhost:5683/counter", "http://localhost:8080/sensor"];

urls.forEach(url => {
	WoT.fetch(url).then(async (td) => {

		let thing = WoT.consume(td);

		try {
			for (property of Object.values(thing.properties)) {
				if (!property.writeOnly) {
					let read = await property.read();
					property["value"] = read;
					// console.log(property.getName(),'value:',read);
				}
			}
			image = JSON.stringify(thing);

			// var mqtt = require('mqtt');
			// var client = mqtt.connect('mqtt://test.mosquitto.org', { clientId: "si4-iot-iGen" });
			// client.on('connect', function () {
			// 	// client.publish('si4-iot-TD-images','TEST MESSAGE HERE!!!');
			// 	client.publish('si4-iot-TD-images', image);
			// 	client.end();
			// });

			// console.log('Child ended');

			// var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

			var xhr = new XMLHttpRequest();
			var url = "http://localhost:8000/";
			xhr.open("POST", url, true);
			xhr.setRequestHeader("Content-Type", "application/json");
			// var data = JSON.stringify({"email":"hey@mail.com", "password":"12345678"});		
			// console.log('sending data...');
			xhr.send(image);

		} catch (err) {
			console.error("Script error:", err);
		}

	}).catch((err) => { console.error("Fetch error:", err); });

});
