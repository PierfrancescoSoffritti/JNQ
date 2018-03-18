const Actor = require('../../../../src/Actor');
const Plan = require('../../../../src/Plan');
const {Message, Event} = require('../../../../src/communicationUnits');
const {wait} = require('../../../../src/Utils');

const GUI_module = require('./applicationSpecificLogic');

const context = { hubIp: "localhost", hubPort: 8900 };

const led = new Actor( { 
    actorId: "led", context,
    plans: { 
        startPlan: new Plan( actor => {
            wait(10000).then( () => actor.switchToPlan("timeoutPlan") );
            
            const GUI = new GUI_module(actor);

            actor.onReceive( { name: "GUIReady", action: () => actor.send( new Message( { recipient:'button', payload: { name: "ledReady" } } ) ) } );

            actor.onReceive( { name: "turnOn", action: GUI.turnOn } );
            actor.onReceive( { name: "turnOff", action: GUI.turnOff } );

            actor.onReceive( { 
                name: "turnedOn",
                action: () => actor.send( new Message( { recipient:'button', payload: { name: "turnedOn" } } ) ) 
            } );

            actor.onReceive( {
                name: "turnedOff",
                action: () => actor.send( new Message( { recipient:'button', payload: { name: "turnedOff" } } ) )
            } );

        } ),
        
        timeoutPlan: new Plan( actor => {
            console.log("actor, timeout");
            actor.finish();
        } ) 
    } 
} );