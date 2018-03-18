const Actor = require('../../../../src/Actor');
const Plan = require('../../../../src/Plan');
const {Message, Event} = require('../../../../src/communicationUnits');
const {wait} = require('../../../../src/Utils');

const applicationSpecificLogic = require('./applicationSpecificLogic');

const context = { hubIp: "localhost", hubPort: 8900 };

const webpage = new Actor( { 
    actorId: "webpageActor", context,
    plans: { 
        startPlan: new Plan( actor => {
            wait(4000).then( () => actor.switchToPlan("timeoutPlan") );

            actor.onReceive( { name: "messageFromWebpage", action: msg => console.log(`\n actor, message received: ${msg}\n`) } );

            applicationSpecificLogic(actor);

        } ),
        
        timeoutPlan: new Plan( actor => {
            console.log("actor, timeout");
            actor.finish();
        } ) 
    } 
} );