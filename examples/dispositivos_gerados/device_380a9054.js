let thing = WoT.produce({ 
	title: "device_380a9054",
	description: "Description test",
	"@context": ["https://www.w3.org/2019/wot/td/v1", {"saref": "https://w3id.org/saref", "om": "http://www.wurvoc.org/vocabularies/om-1.8/", "m3-lite": "http://purl.org/iot/vocab/m3-lite", }],
});
console.log("Produced " + thing.title);


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

thing.addProperty( 
	"luminosity",
	{
		type: "saref:Lighting device",
		description: "null",
		"unit of measurement": "om:Luminance_unit",
		observable: false,
		readOnly: true,
	},
	Math.random()*100
);

thing.addAction(
	"change_weight",
	{},
	() => {
		console.log("Changing weight");
		return thing.properties["weight"].write(Math.random() * ((100.0)-(0.0))+(0.0));
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

thing.addAction(
	"change_luminosity",
	{},
	() => {
		console.log("Changing luminosity");
		return thing.properties["luminosity"].write(Math.random() * ((5000.0)-(0.0))+(0.0));
	}
);


thing.expose().then( () => { console.info(thing.title + " ready"); } ); 