const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const id = "applicationSpecificLogic";
const sockets = {};
let count = 0;

function initApplicationSpecificLogic(actor) {
    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/index.html');
    });

    io.on('connection', socket => {
        const key = count;
        sockets[key] = socket;
        count++;
        
        socket.on( 'turnedOn', msg => actor.eventBus.post("turnedOn") );
        socket.on( 'turnedOff', msg => actor.eventBus.post("turnedOff") );

        socket.on( 'disconnect', () => delete sockets[key] );
    });
      
    http.listen(8080, () => console.log('listening on localhost:8080') );

    actor.eventBus.subscribe( "actorFinish", id, actor => onFinish(actor) );
}

function turnOn() {
    Object.keys(sockets).forEach( key => sockets[key].emit("turnOn") )
}

function turnOff() {
    Object.keys(sockets).forEach( key => sockets[key].emit("turnOff") )
}

function onFinish(actor) {
    Object.keys(sockets).forEach( key => sockets[key].disconnect() )
    http.close();
    actor.eventBus.unsubscribeAll(id);
}

module.exports.initApplicationSpecificLogic = initApplicationSpecificLogic;
module.exports.turnOn = turnOn;
module.exports.turnOff = turnOff;