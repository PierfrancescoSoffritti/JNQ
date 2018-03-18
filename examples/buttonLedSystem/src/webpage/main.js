const Actor = require('../../../../src/Actor');
const Plan = require('../../../../src/Plan');
const {Message, Event} = require('../../../../src/communicationUnits');
const {wait} = require('../../../../src/Utils');

const { initApplicationSpecificLogic, turnOn, turnOff } = require('./applicationSpecificLogic');

const context = { hubIp: "localhost", hubPort: 8900 };

const webpageActor = new Actor( { 
    actorId: "webpageActor", context,
    plans: { 
        startPlan: new Plan( actor => {
            wait(10000).then( () => actor.switchToPlan("timeoutPlan") );
            
            initApplicationSpecificLogic(actor);

            actor.onReceive( { name: "turnOn", action: turnOn } );
            actor.onReceive( { name: "turnOff", action: turnOff } );

            actor.onReceive( { 
                name: "turnedOn",
                action: () => actor.send( new Message( { recipient:'consoleActor', payload: { name: "turnedOn" } } ) ) 
            } );

            actor.onReceive( {
                name: "turnedOff",
                action: () => actor.send( new Message( { recipient:'consoleActor', payload: { name: "turnedOff" } } ) )
            } );

        } ),
        
        timeoutPlan: new Plan( actor => {
            console.log("actor, timeout");
            actor.finish();
        } ) 
    } 
} );