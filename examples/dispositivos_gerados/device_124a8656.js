let thing = WoT.produce({ 
	title: "device_124a8656",
	description: "Description test",
	"@context": ["https://www.w3.org/2019/wot/td/v1", {"om": "http://www.wurvoc.org/vocabularies/om-1.8/", "m3-lite": "http://purl.org/iot/vocab/m3-lite", "saref": "https://w3id.org/saref", }],
});
console.log("Produced " + thing.title);


thing.addProperty( 
	"sound",
	{
		type: "m3-lite:SoundSensor",
		description: "null",
		"unit of measurement": "m3-lite:Decibel",
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

thing.addProperty( 
	"gyroscope",
	{
		type: "m3-lite:GyroscopeSensor",
		description: "null",
		"unit of measurement": "om:Angular_acceleration_unit",
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

thing.addAction(
	"change_sound",
	{},
	() => {
		console.log("Changing sound");
		return thing.properties["sound"].write(Math.random() * ((52.0)-(0.0))+(0.0));
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

thing.addAction(
	"change_gyroscope",
	{},
	() => {
		console.log("Changing gyroscope");
		return thing.properties["gyroscope"].write(Math.random() * ((1000.0)-(0.0))+(0.0));
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


thing.expose().then( () => { console.info(thing.title + " ready"); } ); 