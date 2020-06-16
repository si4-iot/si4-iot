// Module responsible for filter a set of things by a set of conditions

// Dependencies
const RuleEngine = require('json-rules-engine');
const Resultset = require('../resultset');

// Test example:
// ----------------------------------------------- //
// Conditions
// var conditions = {
//     any: [{
//         all: [{
//             fact: 'properties',
//             path: '$.temperature.value',
//             operator: 'greaterThanInclusive',
//             value: 0
//         }, {
//             fact: 'properties',
//             path: '$.temperature.value',
//             operator: 'lessThan',
//             value: 100
//         }]
//     },
//     {
//         fact: 'properties',
//         path: '$.count.value',
//         operator: 'equal',
//         value: 0
//     }]
// }

// // Urls
// const myurl = ["http://localhost:8080/counter", "http://localhost:8080/sensor"];

// SelectThings(myurl, conditions).then((selected) => {
//     console.log('Selected Things:', selected);
// }, (cause) => {
//     console.log('Rejected:', cause);
// }).catch(err => { console.error('Error:', err) });
// ----------------------------------------------- //

// Return format:
//  [
//      selectedThings      : array of selected things
//      missingTDs : boolean. When TRUE, some TDs could not be found or haven't replied in time
//  ]
function SelectThings(urls, conditions, timeout) {
    return new Promise(async (resolve, reject) => {
        let selectedThings = [];                // array of the urls of the selected things
        let engine = new RuleEngine.Engine();   // creating a engine
        // Setting engine's rules
        let rules = new RuleEngine.Rule({
            conditions,
            event: { type: 'selectedThing' },
            onSuccess: function (event, almanac) {              // set thing as selected
                almanac.addRuntimeFact('thingSelected', true);
            },
            onFailure: function (event, almanac) {              // set thing as not selected
                almanac.addRuntimeFact('thingSelected', false);
            }
        });
        engine.addRule(rules);

        // Setting engine's facts
        // let unityOfMeasurementfact = function(params, almanac) {

        // };
        // engine.addFact('unityOfMeasurement', ontologyFact);

        Resultset(urls, timeout).then(async ([imgs, missingTDs]) => { // getting things images
            if (imgs == []) {
                reject('No TD found.');
            }
            // Applying rules for every image
            for (img of imgs) {
                await engine.run(img).then(async results => {
                    let selected = await results.almanac.factValue('thingSelected');
                    // Push things urls in the selected things array if this image was selected
                    if (selected == true) {
                        let href = await results.almanac.factValue('curUrl');
                        selectedThings.push(href);
                    }
                });
            }
            resolve([selectedThings, missingTDs]); // returning selected things urls
        }, (cause) => { reject(cause); })
            .catch((err) => {
                console.error(err);
                reject(err);
            });
    });
}

module.exports = SelectThings;
