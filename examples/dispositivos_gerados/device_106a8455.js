let thing = WoT.produce({ 
	title: "device_106a8455",
	description: "Description test",
	"@context": ["https://www.w3.org/2019/wot/td/v1", {"saref": "https://w3id.org/saref", "m3-lite": "http://purl.org/iot/vocab/m3-lite", }],
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
	"engine",
	{
		type: "saref:Actuator",
		description: "null",
		"unit of measurement": "saref:OnOffFunction",
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
	"change_engine",
	{},
	() => {
		console.log("Changing engine");
		return thing.properties["engine"].write(Math.random() * ((1.0)-(0.0))+(0.0));
	}
);


thing.expose().then( () => { console.info(thing.title + " ready"); } ); 