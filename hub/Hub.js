const net = require('net');
const Dispatcher = require('./Dispatcher');

const SEPARATOR = "$$SEP$$";

const connecetActors = {};

const dispatcher = new Dispatcher(connecetActors, SEPARATOR);

startHub(8900);

function startHub(port) {
    
    const server = net.createServer( socket => {
        console.log("\nactor connected, waiting for actorId...")
        let actorId;

        socket.on('data', message => {
            
            String(message)
                .split(SEPARATOR)
                .filter(string => string.trim().length !== 0)
                .map(message => { console.log(`\t[${actorId} IO] Message received: ${message}`); return message })
                .map(message => JSON.parse(message))
                .forEach(message => {  

                    if(!actorId) {
                        actorId = message.actorId;
                        connecetActors[actorId] = socket;
                    } else
                        dispatcher.dispatch(message)
            });
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