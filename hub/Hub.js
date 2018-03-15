const net = require('net');

const connecetActors = {};

startHub(8900);

function startHub(port) {
    
    const server = net.createServer( socket => {
        let actorName;

        //socket.write("Welcome " + socket.name + "\n");

        socket.on('data', data => {
            actorName = data.actorName;
            connecetActors[actorName] = socket;
        });

        socket.on('end', () => {
            delete connecetActors[actorName];
        });

    })

    server.listen(port, 'localhost');
    
    console.log(`server running at port ${port}`);
}