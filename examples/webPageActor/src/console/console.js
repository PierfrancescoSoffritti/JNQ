const Actor = require('../../../../src/Actor');
const Plan = require('../../../../src/Plan');
const {Message, Event} = require('../../../../src/communicationUnits');
const {wait} = require('../../../../src/Utils');

const context = { hubIp: "localhost", hubPort: 8900 };

const console = new Actor( { 
    actorId: "console", context,
    plans: { 
        startPlan: new Plan( actor => {

            wait(500).then( () => { 
                console.log("console, emits event 'fire'");
                actor.send( new Event( { payload: { name: "fire", content: "i'm burning" } } ) );

                console.log("console, emits event 'water'");
                actor.send( new Event( { payload: { name: "water", content: "i'm drowning" } } ) );

                actor.finish();
             } );
        } ) 
    } 
} );