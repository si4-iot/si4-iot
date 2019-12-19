let thing = WoT.produce({ 
	title: "device_415a1304",
	description: "Description test",
	"@context": ["https://www.w3.org/2019/wot/td/v1", {"saref": "https://w3id.org/saref", "m3-lite": "http://purl.org/iot/vocab/m3-lite", }],
});
console.log("Produced " + thing.title);


thing.addProperty( 
	"ozone",
	{
		type: "saref:Sensor",
		description: "null",
		"unit of measurement": "m3-lite:PPM",
		observable: false,
		readOnly: true,
	},
	Math.random()*100
);

thing.addProperty( 
	"magnetic",
	{
		type: "m3-lite:Magnetometer",
		description: "null",
		"unit of measurement": "m3-lite:Tesla",
		observable: false,
		readOnly: true,
	},
	Math.random()*100
);

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
	"Glucometer",
	{
		type: "m3-lite:Glucometer",
		description: "null",
		"unit of measurement": "m3-lite:MmolPerLiter",
		observable: false,
		readOnly: true,
	},
	Math.random()*100
);

thing.addAction(
	"change_ozone",
	{},
	() => {
		console.log("Changing ozone");
		return thing.properties["ozone"].write(Math.random() * ((100.0)-(0.0))+(0.0));
	}
);

thing.addAction(
	"change_magnetic",
	{},
	() => {
		console.log("Changing magnetic");
		return thing.properties["magnetic"].write(Math.random() * ((1000.0)-(0.0))+(0.0));
	}
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
	"change_Glucometer",
	{},
	() => {
		console.log("Changing Glucometer");
		return thing.properties["Glucometer"].write(Math.random() * ((100.0)-(0.0))+(0.0));
	}
);


thing.expose().then( () => { console.info(thing.title + " ready"); } ); 