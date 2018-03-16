const Plan = require('./Plan');
const PlanExecutor = require('./PlanExecutor');
const Communicator = require('./Communicator');

const detaultContext = { host: "localhost", port: 8010 };
const detaultState = {};
const detaultPlan = { startPlan: new Plan( (actor) => { console.log("no plan defined"); actor.destroy() } ) };

function Actor( { actorId, context = defaultContext, state = detaultState, plans = detaultPlan } ) {

    if(!actorId) console.error("actorId not defined")

    const planExecutor = new PlanExecutor(this);
    const communicator = new Communicator({ port: context.hubPort, ip: context.hubIp, actorId});
    
    this.switchToPlan = function(planName) {
        const plan = plans[planName];

        if(!plan)
            console.error(`[${actorId}] plan "${planName}" not defined.`);
        else
            planExecutor.switchToPlan(plan);
    }

    this.send = function(message) {
        communicator.send( JSON.stringify(message) );
    }

    this.destroy = function() {
        communicator.destroy();
    }

    this.switchToPlan("startPlan");
}

module.exports = Actor;