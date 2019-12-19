let thing = WoT.produce({ 
	title: "device_806a3965",
	description: "Description test",
	"@context": ["https://www.w3.org/2019/wot/td/v1", {"m3-lite": "http://purl.org/iot/vocab/m3-lite", "xsd": "http://www.w3.org/2001/XMLSchema", "saref": "https://w3id.org/saref", }],
});
console.log("Produced " + thing.title);


thing.addProperty( 
	"humidity",
	{
		type: "saref:Humidity",
		description: "saref:Humidity",
		"unit of measurement": "m3-lite:Humidity",
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
	"pressure",
	{
		type: "saref:Pressure",
		description: "saref:Pressure",
		"unit of measurement": "m3-lite:Pascal",
		observable: false,
		readOnly: true,
	},
	Math.random()*100
);

thing.addAction(
	"change_humidity",
	{},
	() => {
		console.log("Changing humidity");
		return thing.properties["humidity"].write(Math.random() * ((100.0)-(0.0))+(0.0));
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
	"change_pressure",
	{},
	() => {
		console.log("Changing pressure");
		return thing.properties["pressure"].write(Math.random() * ((100.0)-(0.0))+(0.0));
	}
);


thing.expose().then( () => { console.info(thing.title + " ready"); } ); 