let thing = WoT.produce({ 
	title: "device_23a9040",
	description: "Description test",
	"@context": ["https://www.w3.org/2019/wot/td/v1", {"om": "http://www.wurvoc.org/vocabularies/om-1.8/", "m3-lite": "http://purl.org/iot/vocab/m3-lite", "geo": "http://www.w3.org/2003/01/geo/wgs84_pos", "saref": "https://w3id.org/saref", }],
});
console.log("Produced " + thing.title);


thing.addProperty( 
	"ultrasonic",
	{
		type: "saref:Sensor",
		description: "null",
		"unit of measurement": "m3-lite:Centimetre",
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

thing.addProperty( 
	"gps",
	{
		type: "m3-lite:GPSSensor",
		description: "null",
		"unit of measurement": "geo:Point",
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
	"change_ultrasonic",
	{},
	() => {
		console.log("Changing ultrasonic");
		return thing.properties["ultrasonic"].write(Math.random() * ((100.0)-(0.0))+(0.0));
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

thing.addAction(
	"change_gps",
	{},
	() => {
		console.log("Changing gps");
		return thing.properties["gps"].write(Math.random() * ((100.0)-(-100.0))+(-100.0));
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