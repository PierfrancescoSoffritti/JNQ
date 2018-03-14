const Actor = require('./Actor');
const Plan = require('./Plan');

const context = { host: "localhost", port: 8010 };

const plans = {
    startPlan: new Plan( { 
        action: () => console.log("i have been created!!"),
        finalAction: (actor) => actor.switchToPlan("otherPlan")
    } ),

    otherPlan: new Plan( { 
        action: () => console.log("other plan executed")
    } ) 
};

const actor = new Actor( { context, plans } );