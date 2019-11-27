// var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var express = require("express");
var myParser = require("body-parser");
// var mqtt = require('mqtt');

// import { XMLHttpRequest as xhr } from 'xmlhttprequest';

IMG_GETTER_PATH = 'td-image-getter.js';
CLI_PATH = '../../thingweb.node-wot/packages/cli/dist/cli.js';
IMG_GENERATOR_PATH = 'image-generator.js';
IMG_GENERATOR2_PATH = 'image-generator2.js';
CLI_FLAGS = '--clientOnly';

const myurl = ["http://localhost:8080/counter", "http://localhost:8080/sensor"];
// const myurl = ["http://localhost:8080/counter"];
// const myurl = ["http://localhost:8080/counter", "http://localhost:8080/sensor", "inviable-example"];
// const myurl = [];

ResultSet(myurl).then((img) => {
	console.log('Resultset ended successfuly');
	console.log(img);
}, (cause) => {
	console.log('Rejected:', cause);
}).catch((err) => { console.error("Resultset failed:", err); });

// ResultSet(myurl).then(img => {
// 	console.log('Resultset ended');
// 	console.log(img);
// });

// console.log('Images proerties values:');
// for ( [name,property] of Object.entries(tdImg)) {
// 	console.log(name,':',property.value);
// }

async function ResultSet(tdurls) {
	return new Promise(async (resolve, reject) => {
		var tdImgs = [];
		var nAwaitedTDs = tdurls.length;
		var nReceivedTDs = 0;

		// console.log("Resultset starting");
		// if (nAwaitedTDs == 0) {
		// 	throw 42
		// } else if (nAwaitedTDs == 1) {
		// 	resolve('One awaited TD');
		// }
		// else if (nAwaitedTDs == 2) {
		// 	resolve('Two awaited TDs');
		// }
		// reject('More then two awaited TDs');

		if (nAwaitedTDs == 0) {
			reject('No TDs to search');
		}

		// var client = mqtt.connect('mqtt://test.mosquitto.org', { clientId: "si4-iot-rs" });
		// // console.log('Resultset connected:', client.connected);
		// client.on('connect', function () {
		// 	console.log('Resultset connection status:', client.connected);
		// })
		// client.subscribe('si4-iot-TD-images', { qos: 1 });
		// client.on('message', function (topic, message, packet) {
		// 	nReceivedTDs++;
		// 	td = JSON.parse(message);
		// 	console.log('TD', nReceivedTDs, 'of', nAwaitedTDs, 'image received.');
		// 	// console.log('topic:',topic);
		// 	// console.log('message: ', td);
		// 	// console.log('packet:',packet);
		// 	tdImgs.push(td);
		// 	if (nReceivedTDs >= nAwaitedTDs) {
		// 		client.end();
		// 		resolve(tdImgs);
		// 	}
		// });
		// client.on('error', function (error) {
		// 	console.log('Connection error:', error);
		// })

		// var app = express();
		// app.use(myParser.json({extended : true}));
		// app.post("/", function(request, response) {
		// 	nReceivedTDs++;
		// 	console.log('TD', nReceivedTDs, 'of', nAwaitedTDs, 'image received.');
		// 	tdImgs.push(request.body);
		// 	console.log('tdImgs lenght:', tdImgs.length);
		// 	if(nReceivedTDs >= nAwaitedTDs) {
		// 		resolve(tdImgs);
		// 	}
		// });
		// console.log('Resultset awaiting TD response...');
		// app.listen(8000);

		const childProcess = require('child_process');
		var child = childProcess.fork(IMG_GETTER_PATH, tdurls);

		// console.log('searching tds');
		// for (url of tdurls) {
		// 	var child = childProcess.fork(CLI_PATH, [CLI_FLAGS, IMG_GENERATOR_PATH]);
		// }
		// for (n of [0, 1]) {
		// 	if (n == 0) {
		// 		var child = childProcess.fork(CLI_PATH, [CLI_FLAGS, IMG_GENERATOR_PATH]);
		// 	} else {
		// 		var child = childProcess.fork(CLI_PATH, [CLI_FLAGS, IMG_GENERATOR2_PATH]);
		// 	}
		// 	// var child = childProcess.fork(IMG_GENERATOR_PATH, tdurls);
		// }

		// child.send('dad');
		child.on('message', img => {
			nReceivedTDs++;
			console.log('TD', nReceivedTDs, 'of', nAwaitedTDs, 'image received.');
			tdImgs.push(img);
			// console.log('tdImgs lenght:', tdImgs.length);
			if (nReceivedTDs >= nAwaitedTDs) {
				child.kill('SIGINT');
				resolve(tdImgs);
			}
		});
	});
}
