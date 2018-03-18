const Actor = require('../src/Actor');
const Plan = require('../src/Plan');
const {Message, Event} = require('../src/communicationUnits');
const {wait} = require('../src/Utils');

const context = { hubIp: "localhost", hubPort: 8900 };

const plans = {
    startPlan: new Plan( actor => { 
        console.log("startPlan");

        actor.switchToPlan("sendTestMessagePlan");
     } ),

    sendTestMessagePlan: new Plan( async actor => { 
        console.log("sendTestMessagePlan")

        await wait(2000)

        actor.onReceive("testName", actor.finish, { once: true } );
        //actor.onReceive("testName", msg => console.log(msg) );
        //actor.onReceive("testName", actor.finish, { interval: 2000 } );
        //actor.onReceive("testName", actor.finish, { once: true, interval: 2000 } );

        //actor.send( new Message( { recipient:'testActor1', payload: { name: "testName", content: "test content" } } ) );
        actor.send( new Event( { payload: { name: "testName", content: "test content" } } ) );        
    } ) 
};

const actor = new Actor( { actorId: "testActor1", context, plans } );
//const actor2 = new Actor( { actorId: "dieImmediatlyActor", context } );
//const actor3 = new Actor( { actorId: "waitAndDieActor", context, plans: { startPlan: new Plan( actor => wait(2000).then( actor.finish ) ) } } );