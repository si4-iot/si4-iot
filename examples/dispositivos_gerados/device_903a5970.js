let thing = WoT.produce({ 
	title: "device_903a5970",
	description: "Description test",
	"@context": ["https://www.w3.org/2019/wot/td/v1", {"m3-lite": "http://purl.org/iot/vocab/m3-lite", "xsd": "http://www.w3.org/2001/XMLSchema", }],
});
console.log("Produced " + thing.title);


thing.addProperty( 
	"heart_rate",
	{
		type: "m3-lite:HeartBeatSensor",
		description: "null",
		"unit of measurement": "m3-lite:BeatPerMinute",
		observable: false,
		readOnly: true,
	},
	Math.random()*100
);

thing.addProperty( 
	"magnetic",
	{
		type: "m3-lite:Magnetometer",
		description: "null",
		"unit of measurement": "m3-lite:Tesla",
		observable: false,
		readOnly: true,
	},
	Math.random()*100
);

thing.addProperty( 
	"Pedometer",
	{
		type: "m3-lite:Pedometer",
		description: "null",
		"unit of measurement": "xsd:positiveInteger",
		observable: false,
		readOnly: true,
	},
	Math.random()*100
);

thing.addAction(
	"change_heart_rate",
	{},
	() => {
		console.log("Changing heart_rate");
		return thing.properties["heart_rate"].write(Math.random() * ((200.0)-(0.0))+(0.0));
	}
);

thing.addAction(
	"change_magnetic",
	{},
	() => {
		console.log("Changing magnetic");
		return thing.properties["magnetic"].write(Math.random() * ((1000.0)-(0.0))+(0.0));
	}
);

thing.addAction(
	"change_Pedometer",
	{},
	() => {
		console.log("Changing Pedometer");
		return thing.properties["Pedometer"].write(Math.random() * ((1.0)-(0.0))+(0.0));
	}
);


thing.expose().then( () => { console.info(thing.title + " ready"); } ); 