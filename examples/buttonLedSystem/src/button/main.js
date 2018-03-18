const Actor = require('../../../../src/Actor');
const Plan = require('../../../../src/Plan');
const {Message, Event} = require('../../../../src/communicationUnits');
const {wait} = require('../../../../src/Utils');

const context = { hubIp: "localhost", hubPort: 8900 };

const button = new Actor( { 
    actorId: "button", context,
    plans: { 
        startPlan: new Plan( actor => {

            actor.onReceive( "ledReady", () => actor.switchToPlan("blinkPlan") );
            
            actor.onReceive( "turnedOn", () => console.log("turned on") );
            actor.onReceive( "turnedOff", () => { console.log("turned off"); actor.switchToPlan("finishPlan") } );
        } ),

        blinkPlan: new Plan( async actor => {
            
            console.log("console, send turn on message");
            actor.send( new Message( { recipient:'led', payload: { name: "turnOn" } } ) )                

            await wait(1000)

            console.log("console, send turn off message");
            actor.send( new Message( { recipient:'led', payload: { name: "turnOff" } } ) )
        }),

        finishPlan: new Plan( actor => {
            console.log("actor, finish");
            actor.finish();
        })
    } 
} );