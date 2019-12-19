let thing = WoT.produce({ 
	title: "device_730a1510",
	description: "Description test",
	"@context": ["https://www.w3.org/2019/wot/td/v1", {"om": "http://www.wurvoc.org/vocabularies/om-1.8/", "m3-lite": "http://purl.org/iot/vocab/m3-lite", "saref": "https://w3id.org/saref", }],
});
console.log("Produced " + thing.title);


thing.addProperty( 
	"oxygen",
	{
		type: "saref:Sensor",
		description: "null",
		"unit of measurement": "m3-lite:PPM",
		observable: false,
		readOnly: true,
	},
	Math.random()*100
);

thing.addProperty( 
	"speed",
	{
		type: "saref:Sensor",
		description: "null",
		"unit of measurement": "m3-lite:MeterPerSecond",
		observable: false,
		readOnly: true,
	},
	Math.random()*100
);

thing.addProperty( 
	"Glucometer",
	{
		type: "m3-lite:Glucometer",
		description: "null",
		"unit of measurement": "m3-lite:MmolPerLiter",
		observable: false,
		readOnly: true,
	},
	Math.random()*100
);

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

thing.addAction(
	"change_oxygen",
	{},
	() => {
		console.log("Changing oxygen");
		return thing.properties["oxygen"].write(Math.random() * ((200.0)-(0.0))+(0.0));
	}
);

thing.addAction(
	"change_speed",
	{},
	() => {
		console.log("Changing speed");
		return thing.properties["speed"].write(Math.random() * ((1000.0)-(0.0))+(0.0));
	}
);

thing.addAction(
	"change_Glucometer",
	{},
	() => {
		console.log("Changing Glucometer");
		return thing.properties["Glucometer"].write(Math.random() * ((100.0)-(0.0))+(0.0));
	}
);

thing.addAction(
	"change_accelerometer",
	{},
	() => {
		console.log("Changing accelerometer");
		return thing.properties["accelerometer"].write(Math.random() * ((1000.0)-(0.0))+(0.0));
	}
);


thing.expose().then( () => { console.info(thing.title + " ready"); } ); 