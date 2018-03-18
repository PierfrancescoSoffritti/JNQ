const Plan = require('./Plan');
const PlanExecutor = require('./PlanExecutor');
const Communicator = require('./Communicator');

const EventBus = require('./EventBus');

const detaultContext = { host: "localhost", port: 8010 };
const detaultState = {};
const detaultPlan = { startPlan: new Plan( (actor) => { console.log("no plan defined"); actor.finish() } ) };

function Actor( { actorId, context = defaultContext, state = detaultState, plans = detaultPlan } ) {

    if(!actorId) console.error("actorId not defined")

    const eventBus = new EventBus();
    const planExecutor = new PlanExecutor(this);
    const communicator = new Communicator({ port: context.hubPort, ip: context.hubIp, actorId, eventBus });

    this.eventBus = eventBus;
    
    this.switchToPlan = function(planName) {
        const plan = plans[planName];

        if(!plan)
            console.error(`[${actorId}] plan "${planName}" not defined.`);
        else
            planExecutor.executeToPlan(plan);
    }

    this.send = function(message) {
        communicator.send( message );
    }

    this.onReceive = function({ name, once, interval, action }) {
        interval = (!interval || interval <= 0) ? false : interval;

        if(once && !interval)
            eventBus.subscribe(name, actorId, () => { eventBus.unsubscribe(name, actorId); action(); });

        else if(!once && !interval)
            eventBus.subscribe( name, actorId, action );

        else if(!once && interval) {
            eventBus.subscribe( name, actorId, action );
            setTimeout( () =>  eventBus.unsubscribe(name, actorId), interval);
        }

        else if(once && interval) {
            const timeoutId = setTimeout( () =>  eventBus.unsubscribe(name, actorId), interval);
            eventBus.subscribe(name, actorId, () => { eventBus.unsubscribe(name, actorId); clearTimeout(timeoutId); action(); });
        }

        else 
            console.log(`[${actorId}] not sure how to behave on receive of name '${name}'`);
    }

    this.finish = function() {
        eventBus.post("actorFinish", this);
        communicator.finish();
        eventBus.unsubscribeAll(actorId);
    }

    this.switchToPlan("startPlan");
}

module.exports = Actor;