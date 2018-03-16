function Dispatcher(connectedActors, SEPARATOR) {
    
    this.dispatch = function(fullMessage) {
        const {recipient, message} = fullMessage

        if(recipient === '*')
            broadcast(message);
        else if(connectedActors[recipient])
            connectedActors[recipient].write( JSON.stringify(message) +SEPARATOR );
        else
            console.error(`Can't dispatch message: ${fullMessage}`);
    }

    function broadcast(message) {
        for (let actorId in connectedActors)
            connectedActors[actorId].write( JSON.stringify(message) +SEPARATOR );
    }
}

module.exports = Dispatcher;