let thing = WoT.produce({ 
	title: "device_444a8326",
	description: "Description test",
	"@context": ["https://www.w3.org/2019/wot/td/v1", {"m3-lite": "http://purl.org/iot/vocab/m3-lite", "saref": "https://w3id.org/saref", }],
});
console.log("Produced " + thing.title);


thing.addProperty( 
	"carbon_dioxide",
	{
		type: "saref:Sensor",
		description: "null",
		"unit of measurement": "m3-lite:CO2",
		observable: false,
		readOnly: true,
	},
	Math.random()*100
);

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

thing.addAction(
	"change_carbon_dioxide",
	{},
	() => {
		console.log("Changing carbon_dioxide");
		return thing.properties["carbon_dioxide"].write(Math.random() * ((100.0)-(0.0))+(0.0));
	}
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
	"change_precipitation",
	{},
	() => {
		console.log("Changing precipitation");
		return thing.properties["precipitation"].write(Math.random() * ((100.0)-(0.0))+(0.0));
	}
);


thing.expose().then( () => { console.info(thing.title + " ready"); } ); 