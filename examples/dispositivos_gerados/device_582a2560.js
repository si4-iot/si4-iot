let thing = WoT.produce({ 
	title: "device_582a2560",
	description: "Description test",
	"@context": ["https://www.w3.org/2019/wot/td/v1", {"om": "http://www.wurvoc.org/vocabularies/om-1.8/", "m3-lite": "http://purl.org/iot/vocab/m3-lite", "saref": "https://w3id.org/saref", }],
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
	"ozone",
	{
		type: "saref:Sensor",
		description: "null",
		"unit of measurement": "m3-lite:PPM",
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
	"change_temperature",
	{},
	() => {
		console.log("Changing temperature");
		return thing.properties["temperature"].write(Math.random() * ((120.0)-(-5.0))+(-5.0));
	}
);

thing.addAction(
	"change_ozone",
	{},
	() => {
		console.log("Changing ozone");
		return thing.properties["ozone"].write(Math.random() * ((100.0)-(0.0))+(0.0));
	}
);


thing.expose().then( () => { console.info(thing.title + " ready"); } ); 