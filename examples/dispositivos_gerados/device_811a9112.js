let thing = WoT.produce({ 
	title: "device_811a9112",
	description: "Description test",
	"@context": ["https://www.w3.org/2019/wot/td/v1", {"m3-lite": "http://purl.org/iot/vocab/m3-lite", "geo": "http://www.w3.org/2003/01/geo/wgs84_pos", "saref": "https://w3id.org/saref", }],
});
console.log("Produced " + thing.title);


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

thing.addAction(
	"change_speed",
	{},
	() => {
		console.log("Changing speed");
		return thing.properties["speed"].write(Math.random() * ((200.0)-(0.0))+(0.0));
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


thing.expose().then( () => { console.info(thing.title + " ready"); } ); 