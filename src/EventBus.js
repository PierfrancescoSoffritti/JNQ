
function EventBus() {
    const eventCallbacksPairs = [];

    this.subscribe = function( eventType, key, callback ) {
        const eventCallbacksPair = findEventCallbacksPair(eventType);
    
        if(eventCallbacksPair) {
            // nesting callbacks
            if(eventCallbacksPair.callbacks[key])
                eventCallbacksPair.callbacks[key] = args => { callback(args); eventCallbacksPair.callbacks[key](args) };
            else
                eventCallbacksPair.callbacks[key] = callback;
        } else
            eventCallbacksPairs.push( new EventCallbacksPair(eventType, key, callback) );
    }

    this.unsubscribe = function( eventType, key ) {
        const eventCallbacksPair = findEventCallbacksPair(eventType);
    
        if(eventCallbacksPair)
            delete eventCallbacksPair.callbacks[key];
    }

    this.unsubscribeAll = function( key ) {
        eventCallbacksPairs.forEach( eventCallbacksPair => { delete eventCallbacksPair.callbacks[key] } );
    }
    
    this.post = function( eventType, args ) {
        const eventCallbacksPair = findEventCallbacksPair(eventType);
        
        if(!eventCallbacksPair) {
            //console.error("no subscribers for event " +eventType);
            return;
        }
        
        Object.keys(eventCallbacksPair.callbacks).forEach( key => eventCallbacksPair.callbacks[key](args) );
    }

    function findEventCallbacksPair(eventType) {
        return eventCallbacksPairs.find( eventObject => eventObject.eventType === eventType );
    }

    function EventCallbacksPair( eventType, key, callback ) {
        this.eventType = eventType;
        this.callbacks = {};
        
        this.callbacks[key] = callback;
    }
}

module.exports = EventBus;