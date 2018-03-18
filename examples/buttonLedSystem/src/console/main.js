const Actor = require('../../../../src/Actor');
const Plan = require('../../../../src/Plan');
const {Message, Event} = require('../../../../src/communicationUnits');
const {wait} = require('../../../../src/Utils');

const context = { hubIp: "localhost", hubPort: 8900 };

const consoleActor = new Actor( { 
    actorId: "consoleActor", context,
    plans: { 
        startPlan: new Plan( actor => {

            actor.onReceive( { name: "turnedOn", action: () => console.log("turned on") } );
            actor.onReceive( { name: "turnedOff", action: () => { console.log("turned off"); actor.switchToPlan("finishPlan") } } );

            wait(100).then( () => { 
                console.log("console, send turn on message");
                actor.send( new Message( { recipient:'webpageActor', payload: { name: "turnOn" } } ) )                

                wait(1000).then( () => {
                    console.log("console, send turn off message");
                    actor.send( new Message( { recipient:'webpageActor', payload: { name: "turnOff" } } ) )
                });

             });
        } ),

        finishPlan: new Plan( actor => {
            console.log("actor, finish");
            actor.finish();
        })
    } 
} );