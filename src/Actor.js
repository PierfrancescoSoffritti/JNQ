const Plan = require('./Plan');
const PlanExecutor = require('./PlanExecutor');
const Communicator = require('./Communicator');

const actorId = "actor id undefined";
const detaultContext = { host: "localhost", port: 8010 };
const detaultState = {};
const detaultPlan = { startPlan: new Plan( () => console.log("I've been created!") ) };

function Actor( { actorId = defaultActorId, context = defaultContext, state = detaultState, plans = detaultPlan } ) {

    const planExecutor = new PlanExecutor(this);
    const communicator = new Communicator({ port: context.hubPort, ip: context.hubIp, actorId});
    
    this.switchToPlan = function(planName) {
        const plan = plans[planName];

        if(!plan)
            console.error("Plan \"" +planName +"\" not defined.");
        else
            planExecutor.switchToPlan(plan);
    }

    this.send = function(message) {

    }

    this.switchToPlan("startPlan");
}

module.exports = Actor;