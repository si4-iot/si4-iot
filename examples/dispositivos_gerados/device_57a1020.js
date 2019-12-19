let thing = WoT.produce({ 
	title: "device_57a1020",
	description: "Description test",
	"@context": ["https://www.w3.org/2019/wot/td/v1", {"saref": "https://w3id.org/saref", "om": "http://www.wurvoc.org/vocabularies/om-1.8/", "m3-lite": "http://purl.org/iot/vocab/m3-lite", }],
});
console.log("Produced " + thing.title);


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
	"buzzer",
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

thing.addAction(
	"change_light",
	{},
	() => {
		console.log("Changing light");
		return thing.properties["light"].write(Math.random() * ((100.0)-(0.0))+(0.0));
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
	"change_buzzer",
	{},
	() => {
		console.log("Changing buzzer");
		return thing.properties["buzzer"].write(Math.random() * ((1.0)-(0.0))+(0.0));
	}
);

thing.addAction(
	"change_temperature",
	{},
	() => {
		console.log("Changing temperature");
		return thing.properties["temperature"].write(Math.random() * ((100.0)-(0.0))+(0.0));
	}
);


thing.expose().then( () => { console.info(thing.title + " ready"); } ); 