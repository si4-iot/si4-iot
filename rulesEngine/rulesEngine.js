// Module responsible for filter a set of things by a set of conditions

// Dependencies
const RuleEngine = require('json-rules-engine');
const Resultset = require('../resultset');

// Test example:
// ----------------------------------------------- //
// Conditions
var conditions = {
    any: [{
        all: [{
            fact: 'properties',
            path: '$.temperature.value',
            operator: 'greaterThanInclusive',
            value: 0
        }, {
            fact: 'properties',
            path: '$.temperature.value',
            operator: 'lessThan',
            value: 100
        }]
    },
    {
        fact: 'properties',
        path: '$.count.value',
        operator: 'equal',
        value: 0
    }]
}

// Urls
const myurl = ["http://localhost:8080/counter", "http://localhost:8080/sensor"];

SelectThings(myurl, conditions).then((selected) => {
    console.log('Selected Things:', selected);
}, (cause) => {
    console.log('Rejected:', cause);
}).catch(err => { console.error('Error:', err) });
// ----------------------------------------------- //

function SelectThings(urls, conditions) {
    return new Promise(async (resolve, reject) => {
        let selectedThings = [];
        let engine = new RuleEngine.Engine();
        let rules = new RuleEngine.Rule({
            conditions,
            event: { type: 'selectedThing' },
            onSuccess: function (event, almanac) {
                almanac.addRuntimeFact('thingSelected', true);
            },
            onFailure: function (event, almanac) {
                almanac.addRuntimeFact('thingSelected', false);
            }
        });
        engine.addRule(rules);
        Resultset(urls).then(async (imgs) => {
            if (imgs == []) {
                reject('There are no images');
            }
            for (img of imgs) {
                await engine.run(img).then(async results => {
                    let selected = await results.almanac.factValue('thingSelected');
                    if (selected == true) {
                        let href = await results.almanac.factValue('curUrl');
                        selectedThings.push(href);
                    }
                });
            }
            resolve(selectedThings);
        }, (cause) => { reject('Resultset rejected: ' + cause); })
            .catch((err) => { console.error("Resultset failed:", err); });
    });
}

module.exports = SelectThings;
