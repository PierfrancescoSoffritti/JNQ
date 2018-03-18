const Actor = require('../src/Actor');
const Plan = require('../src/Plan');
const {Message, Event} = require('../src/communicationUnits');
const {wait} = require('../src/Utils');

const context = { hubIp: "localhost", hubPort: 8900 };

const actor = new Actor( { 
    actorId: "actorNoInputTransition", context,
    plans: { 
        startPlan: new Plan( actor => {
            console.log("hello world");
            actor.switchToPlan("printWaitAndFinishPlan")
        } ),
        
        printWaitAndFinishPlan: new Plan(async actor => {
            console.log("plan started .. i'm going to wait for 2 seconds and then finish");
            
            await wait(2000)
            
            console.log("i'm about to finish");
            actor.finish();
        } )
    } 
} );