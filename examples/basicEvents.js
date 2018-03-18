const Actor = require('../src/Actor');
const Plan = require('../src/Plan');
const {Message, Event} = require('../src/communicationUnits');
const {wait} = require('../src/Utils');

const context = { hubIp: "localhost", hubPort: 8900 };

const emitter = new Actor( { 
    actorId: "emitter", context,
    plans: { 
        startPlan: new Plan( async actor => {

            await wait(500)

            console.log("emitter, emits event 'fire'");
            actor.send( new Event( { payload: { name: "fire", content: "i'm burning" } } ) );

            console.log("emitter, emits event 'water'");
            actor.send( new Event( { payload: { name: "water", content: "i'm drowning" } } ) );

            actor.finish();
        } ) 
    } 
} );

const perceptor = new Actor( { 
    actorId: "perceptor", context,
    plans: { 
        startPlan: new Plan( actor => {
            console.log("perceptor, waits for events 'fire' and 'water' and finishes after 4 seconds");

            wait(4000).then( () => actor.switchToPlan("timeoutPlan") );
            
            actor.onReceive( "fire", msg => console.log(`\n perceptor, event received: ${msg}`) );
            actor.onReceive( "water", msg => console.log(`\n perceptor, event received: ${msg}`) );
        } ),
        
        timeoutPlan: new Plan( actor => {
            console.log("perceptor, timeout");
            actor.finish();
        } ) 
    } 
} );