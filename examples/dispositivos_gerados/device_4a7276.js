let thing = WoT.produce({ 
	title: "device_4a7276",
	description: "Description test",
	"@context": ["https://www.w3.org/2019/wot/td/v1", {"m3-lite": "http://purl.org/iot/vocab/m3-lite", "saref": "https://w3id.org/saref", }],
});
console.log("Produced " + thing.title);


thing.addProperty( 
	"sound",
	{
		type: "m3-lite:SoundSensor",
		description: "null",
		"unit of measurement": "m3-lite:Decibel",
		observable: false,
		readOnly: true,
	},
	Math.random()*100
);

thing.addProperty( 
	"carbon_monoxide ",
	{
		type: "saref:Sensor",
		description: "null",
		"unit of measurement": "m3-lite:PPM",
		observable: false,
		readOnly: true,
	},
	Math.random()*100
);

thing.addProperty( 
	"weight",
	{
		type: "m3-lite:WeightSensor",
		description: "null",
		"unit of measurement": "m3-lite:Kilo",
		observable: false,
		readOnly: true,
	},
	Math.random()*100
);

thing.addAction(
	"change_sound",
	{},
	() => {
		console.log("Changing sound");
		return thing.properties["sound"].write(Math.random() * ((52.0)-(0.0))+(0.0));
	}
);

thing.addAction(
	"change_carbon_monoxide ",
	{},
	() => {
		console.log("Changing carbon_monoxide ");
		return thing.properties["carbon_monoxide "].write(Math.random() * ((100.0)-(0.0))+(0.0));
	}
);

thing.addAction(
	"change_weight",
	{},
	() => {
		console.log("Changing weight");
		return thing.properties["weight"].write(Math.random() * ((100.0)-(0.0))+(0.0));
	}
);


thing.expose().then( () => { console.info(thing.title + " ready"); } ); 