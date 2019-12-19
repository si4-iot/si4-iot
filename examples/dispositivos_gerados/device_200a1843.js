let thing = WoT.produce({ 
	title: "device_200a1843",
	description: "Description test",
	"@context": ["https://www.w3.org/2019/wot/td/v1", {"m3-lite": "http://purl.org/iot/vocab/m3-lite", "geo": "http://www.w3.org/2003/01/geo/wgs84_pos", "xsd": "http://www.w3.org/2001/XMLSchema", "saref": "https://w3id.org/saref", }],
});
console.log("Produced " + thing.title);


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
	"Pedometer",
	{
		type: "m3-lite:Pedometer",
		description: "null",
		"unit of measurement": "xsd:positiveInteger",
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
	"change_gps",
	{},
	() => {
		console.log("Changing gps");
		return thing.properties["gps"].write(Math.random() * ((100.0)-(-100.0))+(-100.0));
	}
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
	"change_Pedometer",
	{},
	() => {
		console.log("Changing Pedometer");
		return thing.properties["Pedometer"].write(Math.random() * ((1.0)-(0.0))+(0.0));
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