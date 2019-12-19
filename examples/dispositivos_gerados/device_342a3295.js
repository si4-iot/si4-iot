let thing = WoT.produce({ 
	title: "device_342a3295",
	description: "Description test",
	"@context": ["https://www.w3.org/2019/wot/td/v1", {"saref": "https://w3id.org/saref", "om": "http://www.wurvoc.org/vocabularies/om-1.8/", "m3-lite": "http://purl.org/iot/vocab/m3-lite", }],
});
console.log("Produced " + thing.title);


thing.addProperty( 
	"falldetector",
	{
		type: "m3-lite:FallDetector",
		description: "null",
		"unit of measurement": "saref:OnOffState",
		observable: false,
		readOnly: true,
	},
	Math.random()*100
);

thing.addProperty( 
	"temperature",
	{
		type: "saref:Temperature",
		description: "saref:Temperature",
		"unit of measurement": "om:Celsius_temperature_scale",
		observable: false,
		readOnly: true,
	},
	Math.random()*100
);

thing.addAction(
	"change_falldetector",
	{},
	() => {
		console.log("Changing falldetector");
		return thing.properties["falldetector"].write(Math.random() * ((100.0)-(0.0))+(0.0));
	}
);

thing.addAction(
	"change_temperature",
	{},
	() => {
		console.log("Changing temperature");
		return thing.properties["temperature"].write(Math.random() * ((100.0)-(0.0))+(0.0));
	}
);


thing.expose().then( () => { console.info(thing.title + " ready"); } ); 