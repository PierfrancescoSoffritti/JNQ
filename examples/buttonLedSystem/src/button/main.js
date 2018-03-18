const Actor = require('../../../../src/Actor');
const Plan = require('../../../../src/Plan');
const {Message, Event} = require('../../../../src/communicationUnits');
const {wait} = require('../../../../src/Utils');

const context = { hubIp: "localhost", hubPort: 8900 };

const button = new Actor( { 
    actorId: "button", context,
    plans: { 
        startPlan: new Plan( actor => {

            actor.onReceive( { name: "turnedOn", action: () => console.log("turned on") } );
            actor.onReceive( { name: "turnedOff", action: () => { console.log("turned off"); actor.switchToPlan("finishPlan") } } );

            actor.onReceive( { name: "ledReady", action: () => actor.switchToPlan("blinkPlan") } );
        } ),

        blinkPlan: new Plan( actor => {
            
            console.log("console, send turn on message");
            actor.send( new Message( { recipient:'led', payload: { name: "turnOn" } } ) )                

            wait(1000).then( () => {
                console.log("console, send turn off message");
                actor.send( new Message( { recipient:'led', payload: { name: "turnOff" } } ) )
            })

        }),

        finishPlan: new Plan( actor => {
            console.log("actor, finish");
            actor.finish();
        })
    } 
} );