WoT.produce({
    title: "sensor",
    description: "A multipurpose sensor. Can measure temperature, luminosity and humidity",
    properties: {
        temperature: {
            type: "float",
            description: "temperature measure",
            "unit of measurement": "degrees Celsius",
            observable: true,
            readOnly: true,
        },
        luminosity: {
            type: "float",
            description: "luminosity measure",
            "unit of measurement": "lux",
            observable: true,
            readOnly: true
        },
        humidity: {
            type: "float",
            description: "humidity measure",
            observable: true,
            readOnly: true
        }
    },
    actions: {
        change_temperature: {
            description: "changes sensor temperature",
            uriVariables: {
                step: { "type": "float", "minimum": 0, "maximum": 100 }
            }
        },
        change_luminosity: {
            description: "changes sensor luminosity",
            uriVariables: {
                step: { "type": "float", "minimum": 0, "maximum": 800 }
            }
        },
        change_humidity: {
            description: "changes sensor humidity",
            uriVariables: {
                step: { "type": "float", "minimum": 0, "maximum": 200 }
            }
        }
    }
}).then((thing) => {
    thing.writeProperty("temperature", 0);
    thing.writeProperty("luminosity", 0);
    thing.writeProperty("humidity", 0);
    thing.setActionHandler("change_temperature", (params, options) => {
        return thing.writeProperty("temperature", Math.random() * 100);
    });
    thing.setActionHandler("change_luminosity", (params, options) => {
        return thing.writeProperty("luminosity", Math.random() * 800);
    });
    thing.setActionHandler("change_humidity", (params, options) => {
        return thing.writeProperty("humidity", Math.random() * 200);
    });
}).catch((e) => {
    console.log(e);
});

sensor.expose()
