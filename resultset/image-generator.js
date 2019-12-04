var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

// Difining default used port.
// ATENTION: must be equally defined in both td-image-getter.js and image-generator.js files
DEFAULT_PORT = 8000;

new Promise((resolve, reject) => {
	// Requesting the urls
	var xhr = new XMLHttpRequest();
	var url = "http://localhost:" + DEFAULT_PORT + '/url-request';
	xhr.onreadystatechange = () => {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				// Parsing urls when received
				// (JSON.parse don't work because thingweb.node's implementation change the global environment. That's also the reason why process.send() wasn't used to get the urls)
				urls = xhr.responseText
				urls = (urls.substring(2,urls.length - 2)).split(',');
				resolve(urls);
			}
			else {
				reject(xhr.statusText);
			}
		}
	}
	xhr.open("POST", url, true);
	xhr.send('si4-iot-tdUrlRequest'); // Requesting the urls
}).then(async (urls) => {
	// Building the image of each url.
	for (const url_s of urls) {
		url = url_s.substring(2,url_s.length -1);
		// console.log(url);
		await WoT.fetch(url).then(async (td) => {

			let thing = WoT.consume(td);

			try {
				for (property of Object.values(thing.properties)) {
					if (!property.writeOnly) {
						let read = await property.read();
						property["value"] = read;
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
	};
}).catch((err) => { console.error(err) });
