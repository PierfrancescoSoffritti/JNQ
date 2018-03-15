const Actor = require('./Actor');
const Plan = require('./Plan');

const {sleep} = require('./Utils');

const context = { host: "localhost", port: 8010 };

const plans = {
    startPlan: new Plan( { 
        action: () => { console.log("i have been created!!"); sleep(2000) },
        finalAction: (actor) => actor.switchToPlan("otherPlan")
    } ),

    otherPlan: new Plan( { 
        action: () => console.log("other plan executed")
    } ) 
};

new Promise(resolve => setTimeout(resolve, ms))

const actor = new Actor( { context, plans } );