let thing = WoT.produce({ 
	title: "device_58a6291",
	description: "Description test",
	"@context": ["https://www.w3.org/2019/wot/td/v1", {"saref": "https://w3id.org/saref", "m3-lite": "http://purl.org/iot/vocab/m3-lite", "xsd": "http://www.w3.org/2001/XMLSchema", }],
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

thing.addProperty( 
	"odometer",
	{
		type: "m3-lite:Odometer",
		description: "null",
		"unit of measurement": "m3-lite:Miles",
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
	"change_Pedometer",
	{},
	() => {
		console.log("Changing Pedometer");
		return thing.properties["Pedometer"].write(Math.random() * ((1.0)-(0.0))+(0.0));
	}
);

thing.addAction(
	"change_odometer",
	{},
	() => {
		console.log("Changing odometer");
		return thing.properties["odometer"].write(Math.random() * ((100.0)-(0.0))+(0.0));
	}
);


thing.expose().then( () => { console.info(thing.title + " ready"); } ); 