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
            actor.send( new Message( { recipient:'testActor1', message: { test:"test" } } ) );
            actor.destroy();
        } ); 
    } ) 
};


const actor = new Actor( { actorId: "testActor1", context, plans } );
//const actor2 = new Actor( { actorId: "dieImmediatlyActor", context } );

const actor3 = new Actor( { actorId: "sleepAndDieActor", context, plans: { startPlan: new Plan( actor => sleep(2000).then( actor.destroy ) ) } } );