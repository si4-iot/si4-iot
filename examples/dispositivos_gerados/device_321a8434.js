let thing = WoT.produce({ 
	title: "device_321a8434",
	description: "Description test",
	"@context": ["https://www.w3.org/2019/wot/td/v1", {"saref": "https://w3id.org/saref", "m3-lite": "http://purl.org/iot/vocab/m3-lite", }],
});
console.log("Produced " + thing.title);


thing.addProperty( 
	"falldetector",
	{
		type: "m3-lite:FallDetector",
		description: "null",
		"unit of measurement": "saref:OnOffState",
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
		"unit of measurement": "m3-lite:KilometerPerHour",
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

thing.addProperty( 
	"led",
	{
		type: "saref:Lighting device",
		description: "null",
		"unit of measurement": "saref:OnOffFunction",
		observable: false,
		readOnly: true,
	},
	Math.random()*100
);

thing.addAction(
	"change_falldetector",
	{},
	() => {
		console.log("Changing falldetector");
		return thing.properties["falldetector"].write(Math.random() * ((100.0)-(0.0))+(0.0));
	}
);

thing.addAction(
	"change_speed",
	{},
	() => {
		console.log("Changing speed");
		return thing.properties["speed"].write(Math.random() * ((200.0)-(0.0))+(0.0));
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

thing.addAction(
	"change_led",
	{},
	() => {
		console.log("Changing led");
		return thing.properties["led"].write(Math.random() * ((1.0)-(0.0))+(0.0));
	}
);


thing.expose().then( () => { console.info(thing.title + " ready"); } ); 