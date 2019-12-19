let thing = WoT.produce({ 
	title: "device_32a9409",
	description: "Description test",
	"@context": ["https://www.w3.org/2019/wot/td/v1", {"geo": "http://www.w3.org/2003/01/geo/wgs84_pos", "m3-lite": "http://purl.org/iot/vocab/m3-lite", }],
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

thing.addAction(
	"change_gps",
	{},
	() => {
		console.log("Changing gps");
		return thing.properties["gps"].write(Math.random() * ((100.0)-(-100.0))+(-100.0));
	}
);


thing.expose().then( () => { console.info(thing.title + " ready"); } ); 