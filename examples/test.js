const Actor = require('../src/Actor');
const Plan = require('../src/Plan');
const {Message, Event} = require('../src/communicationUnits');
const {sleep} = require('../src/Utils');

const context = { hubIp: "localhost", hubPort: 8900 };

const plans = {
    startPlan: new Plan( actor => { 
        console.log("startPlan");

        actor.switchToPlan("sendTestMessagePlan");
     } ),

    sendTestMessagePlan: new Plan( actor => { 
        console.log("sendTestMessagePlan")

        sleep(2000).then( () => {             
            actor.onReceive( { name: "testName", once: true, action: actor.finish } );
            //actor.onReceive( { name: "testName", action: (msg) => console.log(msg) } );
            //actor.onReceive( { name: "testName", interval: 2000, action: actor.finish } );
            //actor.onReceive( { name: "testName", once: true, interval: 2000, action: actor.finish } );

            //actor.send( new Message( { recipient:'testActor1', message: { name: "testName", content: "test content" } } ) );
            actor.send( new Event( { message: { name: "testName", content: "test content" } } ) );
        } ); 
    } ) 
};

const actor = new Actor( { actorId: "testActor1", context, plans } );
//const actor2 = new Actor( { actorId: "dieImmediatlyActor", context } );
//const actor3 = new Actor( { actorId: "sleepAndDieActor", context, plans: { startPlan: new Plan( actor => sleep(2000).then( actor.finish ) ) } } );