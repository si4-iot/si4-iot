let thing = WoT.produce({ 
	title: "device_373a4364",
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

thing.addAction(
	"change_falldetector",
	{},
	() => {
		console.log("Changing falldetector");
		return thing.properties["falldetector"].write(Math.random() * ((100.0)-(0.0))+(0.0));
	}
);


thing.expose().then( () => { console.info(thing.title + " ready"); } ); 