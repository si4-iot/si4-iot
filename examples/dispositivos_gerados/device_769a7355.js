let thing = WoT.produce({ 
	title: "device_769a7355",
	description: "Description test",
	"@context": ["https://www.w3.org/2019/wot/td/v1", {"om": "http://www.wurvoc.org/vocabularies/om-1.8/", "saref": "https://w3id.org/saref", }],
});
console.log("Produced " + thing.title);


thing.addProperty( 
	"luminosity",
	{
		type: "saref:Lighting device",
		description: "null",
		"unit of measurement": "om:Luminance_unit",
		observable: false,
		readOnly: true,
	},
	Math.random()*100
);

thing.addAction(
	"change_luminosity",
	{},
	() => {
		console.log("Changing luminosity");
		return thing.properties["luminosity"].write(Math.random() * ((5000.0)-(0.0))+(0.0));
	}
);


thing.expose().then( () => { console.info(thing.title + " ready"); } ); 