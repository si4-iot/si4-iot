let thing = WoT.produce({ 
	title: "device_246a2319",
	description: "Description test",
	"@context": ["https://www.w3.org/2019/wot/td/v1", {"m3-lite": "http://purl.org/iot/vocab/m3-lite", "saref": "https://w3id.org/saref", }],
});
console.log("Produced " + thing.title);


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
	"change_smoke",
	{},
	() => {
		console.log("Changing smoke");
		return thing.properties["smoke"].write(Math.random() * ((100.0)-(0.0))+(0.0));
	}
);


thing.expose().then( () => { console.info(thing.title + " ready"); } ); 