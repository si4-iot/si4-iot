let thing = WoT.produce({ 
	title: "device_874a8694",
	description: "Description test",
	"@context": ["https://www.w3.org/2019/wot/td/v1", {"saref": "https://w3id.org/saref", "m3-lite": "http://purl.org/iot/vocab/m3-lite", }],
});
console.log("Produced " + thing.title);


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

thing.addProperty( 
	"light",
	{
		type: "m3-lite:LightSensor",
		description: "saref:Light",
		"unit of measurement": "m3-lite:Lux",
		observable: false,
		readOnly: true,
	},
	Math.random()*100
);

thing.addProperty( 
	"engine",
	{
		type: "saref:Actuator",
		description: "null",
		"unit of measurement": "saref:OnOffFunction",
		observable: false,
		readOnly: true,
	},
	Math.random()*100
);

thing.addAction(
	"change_carbon_dioxide",
	{},
	() => {
		console.log("Changing carbon_dioxide");
		return thing.properties["carbon_dioxide"].write(Math.random() * ((100.0)-(0.0))+(0.0));
	}
);

thing.addAction(
	"change_light",
	{},
	() => {
		console.log("Changing light");
		return thing.properties["light"].write(Math.random() * ((100.0)-(0.0))+(0.0));
	}
);

thing.addAction(
	"change_engine",
	{},
	() => {
		console.log("Changing engine");
		return thing.properties["engine"].write(Math.random() * ((1.0)-(0.0))+(0.0));
	}
);


thing.expose().then( () => { console.info(thing.title + " ready"); } ); 