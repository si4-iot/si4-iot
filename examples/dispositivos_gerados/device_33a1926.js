let thing = WoT.produce({ 
	title: "device_33a1926",
	description: "Description test",
	"@context": ["https://www.w3.org/2019/wot/td/v1", {"om": "http://www.wurvoc.org/vocabularies/om-1.8/", "m3-lite": "http://purl.org/iot/vocab/m3-lite", "saref": "https://w3id.org/saref", }],
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
	"temperature",
	{
		type: "saref:Humidity",
		description: "saref:Temperature",
		"unit of measurement": "om:Fahrenheit_temperature_scale",
		observable: false,
		readOnly: true,
	},
	Math.random()*100
);

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

thing.addAction(
	"change_magnetic",
	{},
	() => {
		console.log("Changing magnetic");
		return thing.properties["magnetic"].write(Math.random() * ((1000.0)-(0.0))+(0.0));
	}
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
	"change_temperature",
	{},
	() => {
		console.log("Changing temperature");
		return thing.properties["temperature"].write(Math.random() * ((80.0)-(-20.0))+(-20.0));
	}
);

thing.addAction(
	"change_height",
	{},
	() => {
		console.log("Changing height");
		return thing.properties["height"].write(Math.random() * ((4000.0)-(0.0))+(0.0));
	}
);


thing.expose().then( () => { console.info(thing.title + " ready"); } ); 