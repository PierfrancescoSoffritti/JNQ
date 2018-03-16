// const NO_PLAN = "NO_PLAN";

function PlanExecutor(actor) {
    
    // let planNameInExecution = NO_PLAN;
    
    this.switchToPlan = function(plan) {
        // if(planNameInExecution !== NO_PLAN) {
        //     console.error(`plan " ${planNameInExecution} " is currently being executed`);
        //     return;
        // }

        plan.action(actor)
            // .then( 
            //     result => { planNameInExecution = NO_PLAN },
            //     error => { planNameInExecution = NO_PLAN }
            // );        
    }
}

module.exports = PlanExecutor;