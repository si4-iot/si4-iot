let thing = WoT.produce({ 
	title: "device_577a9693",
	description: "Description test",
	"@context": ["https://www.w3.org/2019/wot/td/v1", {"om": "http://www.wurvoc.org/vocabularies/om-1.8/", "m3-lite": "http://purl.org/iot/vocab/m3-lite", "saref": "https://w3id.org/saref", }],
});
console.log("Produced " + thing.title);


thing.addProperty( 
	"accelerometer",
	{
		type: "saref:Sensor",
		description: "null",
		"unit of measurement": "om:Angular_acceleration_unit",
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
	"change_accelerometer",
	{},
	() => {
		console.log("Changing accelerometer");
		return thing.properties["accelerometer"].write(Math.random() * ((1000.0)-(0.0))+(0.0));
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
	"change_carbon_monoxide ",
	{},
	() => {
		console.log("Changing carbon_monoxide ");
		return thing.properties["carbon_monoxide "].write(Math.random() * ((100.0)-(0.0))+(0.0));
	}
);


thing.expose().then( () => { console.info(thing.title + " ready"); } ); 