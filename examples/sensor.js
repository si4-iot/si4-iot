WoT.produce({
    title: "sensor",
    description: "A very simple test case of a multipurpose sensor. Can 'measure' temperature, luminosity and humidity",
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
            description: "ramdomly changes temperature value",
            uriVariables: {
                step: { "type": "float", "minimum": 1, "maximum": 100 }
            }
        },
        change_luminosity: {
            description: "ramdomly changes luminosity value",
            uriVariables: {
                step: { "type": "float", "minimum": 1, "maximum": 800 }
            }
        },
        change_humidity: {
            description: "ramdomly changes humidity value",
            uriVariables: {
                step: { "type": "float", "minimum": 1, "maximum": 200 }
            }
        }
    }
}).then((thing) => {
    console.log("Produced " + thing.getThingDescription().title);
    // init property values
    thing.writeProperty("temperature", 0);
    thing.writeProperty("luminosity", 0);
    thing.writeProperty("humidity", 0);
    // set action handlers
    thing.setActionHandler("change_temperature", (params, options) => {
        return thing.writeProperty("temperature", Math.random() * 100);
    });
    thing.setActionHandler("change_luminosity", (params, options) => {
        return thing.writeProperty("luminosity", Math.random() * 800);
    });
    thing.setActionHandler("change_humidity", (params, options) => {
        return thing.writeProperty("humidity", Math.random() * 200);
    });
    // expose the thing
    thing.expose().then(() => { console.info(thing.getThingDescription().title + " ready"); });
}).catch((e) => {
    console.log(e);
});
