const Actor = require('./Actor');
const Plan = require('./Plan');

const Message = require('./Message');

const {sleep} = require('./Utils');

const context = { hubIp: "localhost", hubPort: 8900 };

const plans = {
    startPlan: new Plan( actor => { 
        console.log("startPlan");
        actor.switchToPlan("sendTestMessagePlan");
     } ),

    sendTestMessagePlan: new Plan( actor => { 
        console.log("sendTestMessagePlan")
        sleep(2000).then( () => {             
            actor.onReceive( { type: "testType", once: true, action: actor.destroy } );
            //actor.onReceive( { type: "testType", action: (msg) => console.log(msg) } );
            //actor.onReceive( { type: "testType", interval: 2000, action: actor.destroy } );
            //actor.onReceive( { type: "testType", once: true, interval: 2000, action: actor.destroy } );

            actor.send( new Message( { recipient:'testActor1', message: { type:"testType", content: "test content" } } ) );
        } ); 
    } ) 
};


const actor = new Actor( { actorId: "testActor1", context, plans } );
//const actor2 = new Actor( { actorId: "dieImmediatlyActor", context } );
//const actor3 = new Actor( { actorId: "sleepAndDieActor", context, plans: { startPlan: new Plan( actor => sleep(2000).then( actor.destroy ) ) } } );