const net = require('net');

const connecetActors = {};

startHub(8900);

function startHub(port) {
    
    const server = net.createServer( socket => {
        console.log("\nactor connected, waiting for actorId...")
        let actorId;

        //socket.write("Welcome " + socket.name + "\n");

        socket.on('data', message => {
            const parsedMessage = JSON.parse(message);
            
            if(!actorId) {
                actorId = parsedMessage.actorId;
                connecetActors[actorId] = socket;
            }

            console.log(`[${ actorId }] message received, data: ${message}`);
        });

        socket.on('end', () => {
            console.log(`[${ actorId }] connection terminated`);
            delete connecetActors[actorId];
        });

        socket.on('error', () => {
            console.log(`[${ actorId }] connection error`);
            delete connecetActors[actorId];
        });

    })

    server.listen(port);
    
    console.log(`server running at port ${port}`);
}