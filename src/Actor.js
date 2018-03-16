const Plan = require('./Plan');
const PlanExecutor = require('./PlanExecutor');
const Communicator = require('./Communicator');

const eventBus = require('./EventBus');

const detaultContext = { host: "localhost", port: 8010 };
const detaultState = {};
const detaultPlan = { startPlan: new Plan( (actor) => { console.log("no plan defined"); actor.destroy() } ) };

function Actor( { actorId, context = defaultContext, state = detaultState, plans = detaultPlan } ) {

    if(!actorId) console.error("actorId not defined")

    const planExecutor = new PlanExecutor(this);
    const communicator = new Communicator({ port: context.hubPort, ip: context.hubIp, actorId });
    
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

    this.onReceive = function({ name, once, interval, action }) {
        interval = (!interval || interval <= 0) ? false : interval;

        if(once && !interval)
            eventBus.subscribe(name, this, () => { eventBus.unsubscribe(name, this); action(); });

        else if(!once && !interval)
            eventBus.subscribe( name, this, action );

        else if(!once && interval) {
            eventBus.subscribe( name, this, action );
            setTimeout( () =>  eventBus.unsubscribe(name, this), interval);
        }

        else if(once && interval) {
            const timeoutId = setTimeout( () =>  eventBus.unsubscribe(name, this), interval);
            eventBus.subscribe(name, this, () => { eventBus.unsubscribe(name, this); clearTimeout(timeoutId); action(); });
        }

        else 
            console.log(`[${actorId}] not sure how to behave on receive of name '${name}'`);
    }

    this.destroy = function() {
        communicator.destroy();
    }

    this.switchToPlan("startPlan");
}

module.exports = Actor;