let thing = WoT.produce({ 
	title: "device_374a7894",
	description: "Description test",
	"@context": ["https://www.w3.org/2019/wot/td/v1", {"m3-lite": "http://purl.org/iot/vocab/m3-lite", "saref": "https://w3id.org/saref", }],
});
console.log("Produced " + thing.title);


thing.addProperty( 
	"height",
	{
		type: "saref:Sensor",
		description: "null",
		"unit of measurement": "m3-lite:Inch",
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

thing.addAction(
	"change_height",
	{},
	() => {
		console.log("Changing height");
		return thing.properties["height"].write(Math.random() * ((4000.0)-(0.0))+(0.0));
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


thing.expose().then( () => { console.info(thing.title + " ready"); } ); 