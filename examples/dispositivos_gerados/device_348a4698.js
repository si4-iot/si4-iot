let thing = WoT.produce({ 
	title: "device_348a4698",
	description: "Description test",
	"@context": ["https://www.w3.org/2019/wot/td/v1", {"m3-lite": "http://purl.org/iot/vocab/m3-lite", "saref": "https://w3id.org/saref", }],
});
console.log("Produced " + thing.title);


thing.addProperty( 
	"heart_rate",
	{
		type: "m3-lite:HeartBeatSensor",
		description: "null",
		"unit of measurement": "m3-lite:BeatPerMinute",
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
	"change_heart_rate",
	{},
	() => {
		console.log("Changing heart_rate");
		return thing.properties["heart_rate"].write(Math.random() * ((200.0)-(0.0))+(0.0));
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
	"change_carbon_monoxide ",
	{},
	() => {
		console.log("Changing carbon_monoxide ");
		return thing.properties["carbon_monoxide "].write(Math.random() * ((100.0)-(0.0))+(0.0));
	}
);


thing.expose().then( () => { console.info(thing.title + " ready"); } ); 