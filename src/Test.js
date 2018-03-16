const Actor = require('./Actor');
const Plan = require('./Plan');

const {sleep} = require('./Utils');

const context = { hubIp: "localhost", hubPort: 8900 };

const plans = {
    startPlan: new Plan( (actor) => { 
        console.log("startPlan");
        actor.switchToPlan("sendTestMessagePlan");
     } ),

    sendTestMessagePlan: new Plan( (actor) => { 
        console.log("sendTestMessagePlan")
        sleep(2000).then( () => { 
            actor.send( { test: 0 } );
            actor.destroy();
        } ); 
    } ) 
};

const actorId1 = "testActor1";
const actorId2 = "testActor2";

const actor = new Actor( { actorId: actorId1, context, plans } );
//const actor2 = new Actor( { actorId: actorId2, context } );