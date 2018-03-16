const net = require('net');

function Communicator({ port, ip, actorId }) {
    let clientSocket;
    const outQueue = [];

    connectTo(port, ip);
    
    function connectTo(port, ip) {
        const client = new net.Socket();

        client.connect({ port, ip }, () => console.log('Connecting...') );

        client.on('connect', function() {
            console.log('connected');
            clientSocket = client;

            clientSocket.write( JSON.stringify({ actorId: actorId }) );
            flushOutQueue();
        });

        client.on('data', message => {
            console.log('Message received: ' + message);
        });
        
        client.on('close', () => {
            console.log('Connection closed');
        });
    }

    this.destroy = function() {
        if(clientSocket)
            clientSocket.destroy();
        else
            console.error("Socket not created");
    }

    this.send = function(data) {
        if(clientSocket)
            clientSocket.write(data);
        else {
            console.log("Socket not created");
            outQueue.push(data);
        }
    }

    function flushOutQueue() {
        while(outQueue.length !== 0) {
            const data = outQueue.shift();
            clientSocket.write(data);
        }
    }
}

module.exports = Communicator;