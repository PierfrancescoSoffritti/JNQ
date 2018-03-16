function PlanExecutor(actor) {
    
    this.executeToPlan = function(plan) {        
        plan.action(actor, plan.reps);
        plan.reps++;
        plan.finalAction(actor, plan.reps-1);
    }
}

module.exports = PlanExecutor;