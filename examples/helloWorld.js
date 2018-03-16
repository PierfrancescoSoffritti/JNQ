const Actor = require('../src/Actor');
const Plan = require('../src/Plan');
const {Message, Event} = require('../src/communicationUnits');
const {wait} = require('../src/Utils');

const context = { hubIp: "localhost", hubPort: 8900 };

const actor = new Actor( { 
    actorId: "actorHelloWorld", context,
    plans: { 
        startPlan: new Plan( actor => {
            console.log("hello world");
            actor.finish();
        } ) 
    } 
} );