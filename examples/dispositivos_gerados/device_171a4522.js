let thing = WoT.produce({ 
	title: "device_171a4522",
	description: "Description test",
	"@context": ["https://www.w3.org/2019/wot/td/v1", {"saref": "https://w3id.org/saref", "m3-lite": "http://purl.org/iot/vocab/m3-lite", "xsd": "http://www.w3.org/2001/XMLSchema", }],
});
console.log("Produced " + thing.title);


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
	"change_magnetic",
	{},
	() => {
		console.log("Changing magnetic");
		return thing.properties["magnetic"].write(Math.random() * ((1000.0)-(0.0))+(0.0));
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
	"change_Pedometer",
	{},
	() => {
		console.log("Changing Pedometer");
		return thing.properties["Pedometer"].write(Math.random() * ((1.0)-(0.0))+(0.0));
	}
);


thing.expose().then( () => { console.info(thing.title + " ready"); } ); 