const JNQ = require('jnq');
const {Actor, Plan, communicationUnits, utils} = JNQ;
const {Message, Event} = communicationUnits;
const {wait} = utils

const GUI_module = require('./applicationSpecificLogic');

const context = { hubIp: "localhost", hubPort: 8900 };

const led = new Actor( { 
    actorId: "led", context,
    plans: { 
        startPlan: new Plan( actor => {
            wait(10000).then( () => actor.switchToPlan("timeoutPlan") );
            
            const GUI = new GUI_module(actor);

            actor.onReceive( "GUIReady", () => actor.send( new Message( { recipient:'button', payload: { name: "ledReady" } } ) ) );

            actor.onReceive( "turnOn", GUI.turnOn );
            actor.onReceive( "turnOff", GUI.turnOff );

            actor.onReceive("turnedOn", () => actor.send( new Message( { recipient:'button', payload: { name: "turnedOn" } } ) ) );
            actor.onReceive("turnedOff", () => actor.send( new Message( { recipient:'button', payload: { name: "turnedOff" } } ) ) );
        } ),
        
        timeoutPlan: new Plan( actor => {
            console.log("actor, timeout");
            actor.finish();
        } ) 
    } 
} );