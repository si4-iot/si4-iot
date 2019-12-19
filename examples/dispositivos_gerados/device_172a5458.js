let thing = WoT.produce({ 
	title: "device_172a5458",
	description: "Description test",
	"@context": ["https://www.w3.org/2019/wot/td/v1", {"saref": "https://w3id.org/saref", "om": "http://www.wurvoc.org/vocabularies/om-1.8/", }],
});
console.log("Produced " + thing.title);


thing.addProperty( 
	"led",
	{
		type: "saref:Lighting device",
		description: "null",
		"unit of measurement": "saref:OnOffFunction",
		observable: false,
		readOnly: true,
	},
	Math.random()*100
);

thing.addProperty( 
	"temperature",
	{
		type: "saref:Humidity",
		description: "saref:Temperature",
		"unit of measurement": "om:Fahrenheit_temperature_scale",
		observable: false,
		readOnly: true,
	},
	Math.random()*100
);

thing.addAction(
	"change_led",
	{},
	() => {
		console.log("Changing led");
		return thing.properties["led"].write(Math.random() * ((1.0)-(0.0))+(0.0));
	}
);

thing.addAction(
	"change_temperature",
	{},
	() => {
		console.log("Changing temperature");
		return thing.properties["temperature"].write(Math.random() * ((80.0)-(-20.0))+(-20.0));
	}
);


thing.expose().then( () => { console.info(thing.title + " ready"); } ); 