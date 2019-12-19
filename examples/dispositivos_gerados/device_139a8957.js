let thing = WoT.produce({ 
	title: "device_139a8957",
	description: "Description test",
	"@context": ["https://www.w3.org/2019/wot/td/v1", {"m3-lite": "http://purl.org/iot/vocab/m3-lite", "saref": "https://w3id.org/saref", }],
});
console.log("Produced " + thing.title);


thing.addProperty( 
	"precipitation",
	{
		type: "m3-lite:PrecipitationSensor",
		description: "null",
		"unit of measurement": "m3-lite:MilligramPerCubicMetre",
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
	"change_precipitation",
	{},
	() => {
		console.log("Changing precipitation");
		return thing.properties["precipitation"].write(Math.random() * ((100.0)-(0.0))+(0.0));
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