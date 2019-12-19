let thing = WoT.produce({ 
	title: "device_146a6918",
	description: "Description test",
	"@context": ["https://www.w3.org/2019/wot/td/v1", {"om": "http://www.wurvoc.org/vocabularies/om-1.8/", "m3-lite": "http://purl.org/iot/vocab/m3-lite", "saref": "https://w3id.org/saref", }],
});
console.log("Produced " + thing.title);


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

thing.addProperty( 
	"carbon_monoxide ",
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
	"change_temperature",
	{},
	() => {
		console.log("Changing temperature");
		return thing.properties["temperature"].write(Math.random() * ((100.0)-(0.0))+(0.0));
	}
);

thing.addAction(
	"change_carbon_monoxide ",
	{},
	() => {
		console.log("Changing carbon_monoxide ");
		return thing.properties["carbon_monoxide "].write(Math.random() * ((100.0)-(0.0))+(0.0));
	}
);


thing.expose().then( () => { console.info(thing.title + " ready"); } ); 