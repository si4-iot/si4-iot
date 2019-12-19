let thing = WoT.produce({ 
	title: "device_65a1492",
	description: "Description test",
	"@context": ["https://www.w3.org/2019/wot/td/v1", {"om": "http://www.wurvoc.org/vocabularies/om-1.8/", "m3-lite": "http://purl.org/iot/vocab/m3-lite", "saref": "https://w3id.org/saref", }],
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
	"smoke",
	{
		type: "saref:Smoke",
		description: "saref:Smoke",
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
	"change_carbon_dioxide",
	{},
	() => {
		console.log("Changing carbon_dioxide");
		return thing.properties["carbon_dioxide"].write(Math.random() * ((100.0)-(0.0))+(0.0));
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
	"change_smoke",
	{},
	() => {
		console.log("Changing smoke");
		return thing.properties["smoke"].write(Math.random() * ((100.0)-(0.0))+(0.0));
	}
);


thing.expose().then( () => { console.info(thing.title + " ready"); } ); 