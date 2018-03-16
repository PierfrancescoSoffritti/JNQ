const Actor = require('../src/Actor');
const Plan = require('../src/Plan');
const {Message, Event} = require('../src/communicationUnits');
const {wait, count} = require('../src/Utils');

const context = { hubIp: "localhost", hubPort: 8900 };

const actor = new Actor( { 
    actorId: "actorNoInputTransition", context,
    plans: { 
        startPlan: new Plan( actor => {
            console.log("hello world");
            actor.switchToPlan("printRepeatOneAndFinishPlan")
        } ),
        
        printRepeatOneAndFinishPlan: new Plan( (actor, reps) => {
            console.log("plan started .. i'm going to repeat this plan once and then finish");
        },

        (actor, reps) => { 
            if(reps < 1) 
                actor.switchToPlan("printRepeatOneAndFinishPlan");
            else
                actor.finish();
        } )
    } 
} );