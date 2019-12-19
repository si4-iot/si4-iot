let thing = WoT.produce({ 
	title: "device_273a5998",
	description: "Description test",
	"@context": ["https://www.w3.org/2019/wot/td/v1", {"om": "http://www.wurvoc.org/vocabularies/om-1.8/", "m3-lite": "http://purl.org/iot/vocab/m3-lite", "saref": "https://w3id.org/saref", }],
});
console.log("Produced " + thing.title);


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

thing.addAction(
	"change_temperature",
	{},
	() => {
		console.log("Changing temperature");
		return thing.properties["temperature"].write(Math.random() * ((80.0)-(-20.0))+(-20.0));
	}
);

thing.addAction(
	"change_weight",
	{},
	() => {
		console.log("Changing weight");
		return thing.properties["weight"].write(Math.random() * ((100.0)-(0.0))+(0.0));
	}
);


thing.expose().then( () => { console.info(thing.title + " ready"); } ); 