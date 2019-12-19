let testthing = WoT.produce({
    title: "testTW",
    //description: ""
});

testthing.addProperty(
    "prop1",
    {
        // type: "example property",
        // description: "a property used as example",
        // observable: true,
        // readOnly: true
    },
    0
);

testthing.addAction(
    "example action",
    {},
    () => {
        if (testthing.properties.prop1.read() == 0) {
            return testthing.properties.prop1.write(1);
        }
        return testthing.properties.prop1.write(0);
    }
);

testthing.addEvent(
    "example event",
    {}
)

testthing.expose()