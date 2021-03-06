function Dispatcher(connectedActors, SEPARATOR) {
    
    this.dispatch = function(fullMessage) {
        const {recipient, payload} = fullMessage

        if(recipient === '*')
            broadcast(payload);
        else if(connectedActors[recipient])
            connectedActors[recipient].write( JSON.stringify(payload) +SEPARATOR );
        else
            console.error(`Can't dispatch message: ${fullMessage}`);
    }

    function broadcast(payload) {
        for (let actorId in connectedActors)
            connectedActors[actorId].write( JSON.stringify(payload) +SEPARATOR );
    }
}

module.exports = Dispatcher;