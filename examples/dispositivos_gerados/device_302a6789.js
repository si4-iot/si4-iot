let thing = WoT.produce({ 
	title: "device_302a6789",
	description: "Description test",
	"@context": ["https://www.w3.org/2019/wot/td/v1", {"om": "http://www.wurvoc.org/vocabularies/om-1.8/", "m3-lite": "http://purl.org/iot/vocab/m3-lite", "saref": "https://w3id.org/saref", }],
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
	"change_height",
	{},
	() => {
		console.log("Changing height");
		return thing.properties["height"].write(Math.random() * ((4000.0)-(0.0))+(0.0));
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