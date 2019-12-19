let sensor = WoT.produce({
    title: "sensor",
    description: "A multipurpose sensor. Can measure temperature, luminosity and humidity",
});

sensor.addProperty(
    "temperature",
    {
        type: "float",
        description: "temperature measure",
        "unit of measurement": "degrees Celsius",
        observable: true,
        readOnly: true,
    },
    0
);

sensor.addProperty(
    "luminosity",
    {
        type: "float",
        description: "luminosity measure",
        "unit of measurement": "lux",
        observable: true,
        readOnly: true
    },
    0
);

sensor.addProperty(
    "humidity",
    {
        type: "float",
        description: "humidity measure",
        observable: true,
        readOnly: true
    },
    0
);

sensor.addAction(
    "change_temperature",
    {},
    () => {
        console.log("Changing temperature");
        return sensor.properties["temperature"].write(Math.random()*100);
    }
);

sensor.addAction(
    "change_luminosity",
    {},
    () => {
        console.log("Changing luminosity");
        return sensor.properties["luminosity"].write(Math.random()*800);
    }
);

sensor.addAction(
    "change_humidity",
    {},
    () => {
        console.log("Changing humidity");
        return sensor.properties["humidity"].write(Math.random()*200);
    }
);

sensor.expose()
