let thing = WoT.produce({ 
	title: "device_715a5395",
	description: "Description test",
	"@context": ["https://www.w3.org/2019/wot/td/v1", {"m3-lite": "http://purl.org/iot/vocab/m3-lite", "saref": "https://w3id.org/saref", }],
});
console.log("Produced " + thing.title);


thing.addProperty( 
	"height",
	{
		type: "saref:Sensor",
		description: "null",
		"unit of measurement": "m3-lite:Inch",
		observable: false,
		readOnly: true,
	},
	Math.random()*100
);

thing.addProperty( 
	"speed",
	{
		type: "saref:Sensor",
		description: "null",
		"unit of measurement": "m3-lite:MeterPerSecond",
		observable: false,
		readOnly: true,
	},
	Math.random()*100
);

thing.addAction(
	"change_height",
	{},
	() => {
		console.log("Changing height");
		return thing.properties["height"].write(Math.random() * ((4000.0)-(0.0))+(0.0));
	}
);

thing.addAction(
	"change_speed",
	{},
	() => {
		console.log("Changing speed");
		return thing.properties["speed"].write(Math.random() * ((1000.0)-(0.0))+(0.0));
	}
);


thing.expose().then( () => { console.info(thing.title + " ready"); } ); 