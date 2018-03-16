const eventCallbacksPairs = [];

function findEventCallbacksPair(eventType) {
    return eventCallbacksPairs.find( eventObject => eventObject.eventType === eventType );
}

function EventCallbacksPair( eventType, key, callback ) {
    this.eventType = eventType;
    this.callbacks = {};
    
    this.callbacks[key] = callback;
}

module.exports = {
    subscribe: function( eventType, key, callback ) {
        const eventCallbacksPair = findEventCallbacksPair(eventType);
    
        if(eventCallbacksPair)
            eventCallbacksPair.callbacks[key] = callback;
        else
            eventCallbacksPairs.push( new EventCallbacksPair(eventType, key, callback) );
    },

    unsubscribe: function( eventType, key ) {
        const eventCallbacksPair = findEventCallbacksPair(eventType);
    
        if(eventCallbacksPair)
            delete eventCallbacksPair.callbacks[key];
    },
    
    post: function( eventType, args ) {
        const eventCallbacksPair = findEventCallbacksPair(eventType);
        
        if(!eventCallbacksPair) {
            console.error("no subscribers for event " +eventType);
            return;
        }
        
        Object.keys(eventCallbacksPair.callbacks).forEach( key => eventCallbacksPair.callbacks[key](args) );
    }
}