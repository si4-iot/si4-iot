var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

// Difining default used ports.
// ATENTION: must be equally defined in both td-image-getter.js and image-generator.js files
DEFAULT_PORT = 8000;
// DEFAULT_URLS_SHIPPER_PORT = 7000;

new Promise((resolve, reject) => {
	var xhr = new XMLHttpRequest();
	var url = "http://localhost:" + DEFAULT_PORT + '/url-request';
	xhr.onreadystatechange = () => {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				urls = JSON.parse(xhr.responseText);
				for (u of urls) {
					console.log(u);
				}
				resolve(urls);
			}
			else {
				reject(xhr.statusText);
			}
		}
	}
	xhr.open("POST", url, true);
	xhr.send('si4-iot-tdUrlRequest');
}).then((urls) => {
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

				var xhr = new XMLHttpRequest();
				var url = "http://localhost:" + DEFAULT_PORT + '/';
				xhr.open("POST", url, true);
				xhr.setRequestHeader("Content-Type", "application/json");
				// console.log('sending data...');
				xhr.send(image);

			} catch (err) {
				console.error("Script error:", err);
			}

		}).catch((err) => { console.error("Fetch error:", err); });
	});
}).catch((err) => { console.error(err) });

// var urls = []

// var xhr = new XMLHttpRequest();
// 	var url = "http://localhost:" + DEFAULT_PORT + '/url-request';
// 	xhr.onreadystatechange = () => {
// 		if (xhr.readyState == 4 && xhr.status == 200) {
// 			urls = JSON.parse(xhr.responseText);
// 			console.log('Response:', urls);
// 			// resolve(urls);
// 		}
// 	}
// 	xhr.open("POST", url, true);
// 	xhr.send('si4-iot-tdUrlRequest');

// urls = ["coap://localhost:5683/counter", "http://localhost:8080/sensor"];

// urls.forEach(url => {
// 	WoT.fetch(url).then(async (td) => {

// 		let thing = WoT.consume(td);

// 		try {
// 			for (property of Object.values(thing.properties)) {
// 				if (!property.writeOnly) {
// 					let read = await property.read();
// 					property["value"] = read;
// 					// console.log(property.getName(),'value:',read);
// 				}
// 			}
// 			image = JSON.stringify(thing);

// 			var xhr = new XMLHttpRequest();
// 			var url = "http://localhost:" + DEFAULT_PORT + '/';
// 			xhr.open("POST", url, true);
// 			xhr.setRequestHeader("Content-Type", "application/json");
// 			// console.log('sending data...');
// 			xhr.send(image);

// 		} catch (err) {
// 			console.error("Script error:", err);
// 		}

// 	}).catch((err) => { console.error("Fetch error:", err); });

// });
