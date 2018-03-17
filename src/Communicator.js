const net = require('net');

const SEPARATOR = "$$SEP$$";

function Communicator({ port, ip, actorId, eventBus }) {
    const self = this;

    let clientSocket;
    const outQueue = [];

    connectTo(port, ip);
    
    function connectTo(port, ip) {
        const client = new net.Socket();
        clientSocket = client;

        client.connect({ port, ip }, () => console.log(`\t[${actorId} IO] Connecting...`) );

        client.on('connect', () => {
            console.log(`\t[${actorId} IO] Connected`);

            self.send({ actorId: actorId });
            flushOutQueue();
        });

        client.on('data', message => {
            String(message).split(SEPARATOR)
                .filter(string => string.trim().length !== 0)
                .map(message => { console.log(`\t[${actorId} IO] Message received: ${message}`); return message })
                .map(message => JSON.parse(message))
                .forEach(message => eventBus.post(message.name, message.content) );                    
        });
        
        client.on('close', () =>  console.log(`\t[${actorId} IO] Connection closed`) );

        client.on('error', () => console.log(`\t[${actorId} IO] Connection error`) );
    }

    this.send = function(message) {
        if(!clientSocket.connecting)
            clientSocket.write( JSON.stringify(message) +SEPARATOR);
        else {
            console.log(`\t[${actorId} IO] Socket not created, message added to queue`);
            outQueue.push(message);
        }
    }

    this.finish = function() {
        if(clientSocket.connecting)
            clientSocket.on('connect', clientSocket.end );
        else
            clientSocket.end();
    }

    function flushOutQueue() {
        while(outQueue.length !== 0) {
            const data = outQueue.shift();
            self.send(data);
        }
    }
}

module.exports = Communicator;