const Actor = require('./Actor');
const Plan = require('./Plan');

const {sleep} = require('./Utils');

const context = { hubIp: "localhost", hubPort: 8900 };

const plans = {
    startPlan: new Plan( { 
        action: () => console.log("i have been created!!"),
        finalAction: (actor) => actor.switchToPlan("otherPlan")
    } ),

    otherPlan: new Plan( { 
        action: () => console.log("other plan executed")
    } ) 
};

const actorId = "testActor";

const actor = new Actor( { actorId, context, plans } );