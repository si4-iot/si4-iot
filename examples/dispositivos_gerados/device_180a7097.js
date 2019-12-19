let thing = WoT.produce({ 
	title: "device_180a7097",
	description: "Description test",
	"@context": ["https://www.w3.org/2019/wot/td/v1", {"saref": "https://w3id.org/saref", "m3-lite": "http://purl.org/iot/vocab/m3-lite", }],
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
	"light",
	{
		type: "m3-lite:LightSensor",
		description: "saref:Light",
		"unit of measurement": "m3-lite:Lux",
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
	"change_oxygen",
	{},
	() => {
		console.log("Changing oxygen");
		return thing.properties["oxygen"].write(Math.random() * ((200.0)-(0.0))+(0.0));
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
	"change_light",
	{},
	() => {
		console.log("Changing light");
		return thing.properties["light"].write(Math.random() * ((100.0)-(0.0))+(0.0));
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