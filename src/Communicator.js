const net = require('net');

function Communicator({ port, ip, actorId }) {
    let clientSocket;
    const outQueue = [];

    connectTo(port, ip);
    
    function connectTo(port, ip) {
        const client = new net.Socket();
        clientSocket = client;

        client.connect({ port, ip }, () => console.log(`[${actorId}] Connecting...`) );

        client.on('connect', () => {
            console.log(`[${actorId}] Connected`);

            clientSocket.write( JSON.stringify({ actorId: actorId }) );
            flushOutQueue();
        });

        client.on('data', message => {
            console.log(`[${actorId}] Message received: ${message}`);
        });
        
        client.on('close', () =>  console.log(`[${actorId}] Connection closed`) );

        client.on('error', () => console.log(`[${actorId}] Connection error`) );
    }

    this.send = function(message) {
        if(!clientSocket.connecting)
            clientSocket.write(message);
        else {
            console.log(`[${actorId}] Socket not created, message added to queue`);
            outQueue.push(message);
        }
    }

    this.destroy = function() {
        if(clientSocket.connecting)
            clientSocket.on('connect', clientSocket.end );
        else
            clientSocket.end();
    }

    function flushOutQueue() {
        while(outQueue.length !== 0) {
            const data = outQueue.shift();
            clientSocket.write(data);
        }
    }
}

module.exports = Communicator;