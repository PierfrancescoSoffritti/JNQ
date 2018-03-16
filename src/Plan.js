const detaultAction = (actor, reps) => console.log("no action for this plan");
const defaultFinalAction = (actor, reps) => {};

function Plan( action = detaultAction, finalAction = defaultFinalAction ) {
    this.action = action;    
    this.finalAction = finalAction;
    this.reps = 0;
}

module.exports = Plan;