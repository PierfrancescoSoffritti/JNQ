const Actor = require('../src/Actor');
const Plan = require('../src/Plan');
const {Message, Event} = require('../src/communicationUnits');
const {wait} = require('../src/Utils');

const context = { hubIp: "localhost", hubPort: 8900 };

const producer = new Actor( { 
    actorId: "producer", context,
    plans: { 
        startPlan: new Plan( actor => {
            console.log("producer, sends 1st message");

            actor.send( new Message( { recipient: "consumer", message: { name: "testMessage", content: 1 } } ) );

            wait(2000).then( () => { 
                console.log("producer, sends 2nd and 3rd messages");

                actor.send( new Message( { recipient: "consumer", message: { name: "testMessage", content: 2 } } ) );
                actor.send( new Message( { recipient: "consumer", message: { name: "testMessage", content: 3 } } ) );
                actor.finish();
             } );
        } ) 
    } 
} );

const consumer = new Actor( { 
    actorId: "consumer", context,
    plans: { 
        startPlan: new Plan( actor => {
            console.log("consumer, waits for messages and finishes after 4 seconds");

            wait(4000).then( () => actor.switchToPlan("timeoutPlan") );
            actor.onReceive( { name: "testMessage", action: msg => console.log(`\nmessage received: ${msg}\n`) } );
        } ),
        
        timeoutPlan: new Plan( actor => {
            console.log("consumer, timeout");
            actor.finish();
        } ) 
    } 
} );