const Plan = require('./Plan');
const PlanExecutor = require('./PlanExecutor');

const detaultContext = { host: "localhost", port: 8010 };
const detaultState = {};
const detaultPlan = { startPlan: new Plan( () => console.log("I've been created!") ) };

function Actor( { context = defaultContext, state = detaultState, plans = detaultPlan } ) {

    const planExecutor = new PlanExecutor(this);
    
    this.switchToPlan = function(planName) {
        const plan = plans[planName];

        if(!plan)
            console.error("Plan \"" +planName +"\" not defined.");
        else
            planExecutor.switchToPlan(plan);
    }

    this.switchToPlan("startPlan");
}

module.exports = Actor;