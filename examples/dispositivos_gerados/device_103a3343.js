let thing = WoT.produce({ 
	title: "device_103a3343",
	description: "Description test",
	"@context": ["https://www.w3.org/2019/wot/td/v1", {"saref": "https://w3id.org/saref", "m3-lite": "http://purl.org/iot/vocab/m3-lite", }],
});
console.log("Produced " + thing.title);


thing.addProperty( 
	"buzzer",
	{
		type: "saref:Actuator",
		description: "null",
		"unit of measurement": "saref:OnOffFunction",
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
	"change_buzzer",
	{},
	() => {
		console.log("Changing buzzer");
		return thing.properties["buzzer"].write(Math.random() * ((1.0)-(0.0))+(0.0));
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