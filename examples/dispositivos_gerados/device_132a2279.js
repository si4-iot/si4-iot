let thing = WoT.produce({ 
	title: "device_132a2279",
	description: "Description test",
	"@context": ["https://www.w3.org/2019/wot/td/v1", {"saref": "https://w3id.org/saref", "om": "http://www.wurvoc.org/vocabularies/om-1.8/", "m3-lite": "http://purl.org/iot/vocab/m3-lite", }],
});
console.log("Produced " + thing.title);


thing.addProperty( 
	"temperature",
	{
		type: "saref:Temperature",
		description: "saref:Temperature",
		"unit of measurement": "om:Rankine_temperature_scale",
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
	"led",
	{
		type: "saref:Lighting device",
		description: "null",
		"unit of measurement": "saref:OnOffFunction",
		observable: false,
		readOnly: true,
	},
	Math.random()*100
);

thing.addProperty( 
	"smoke",
	{
		type: "saref:Smoke",
		description: "saref:Smoke",
		"unit of measurement": "m3-lite:PPM",
		observable: false,
		readOnly: true,
	},
	Math.random()*100
);

thing.addAction(
	"change_temperature",
	{},
	() => {
		console.log("Changing temperature");
		return thing.properties["temperature"].write(Math.random() * ((120.0)-(-5.0))+(-5.0));
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
	"change_led",
	{},
	() => {
		console.log("Changing led");
		return thing.properties["led"].write(Math.random() * ((1.0)-(0.0))+(0.0));
	}
);

thing.addAction(
	"change_smoke",
	{},
	() => {
		console.log("Changing smoke");
		return thing.properties["smoke"].write(Math.random() * ((100.0)-(0.0))+(0.0));
	}
);


thing.expose().then( () => { console.info(thing.title + " ready"); } ); 