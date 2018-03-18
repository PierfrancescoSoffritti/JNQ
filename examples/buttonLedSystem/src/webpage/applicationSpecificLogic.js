const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const id = "applicationSpecificLogic";
const sockets = {};
let count = 0;

function GUI(actor) {
    initApplicationSpecificLogic(actor);

    this.turnOn = function() {
        Object.keys(sockets).forEach( key => sockets[key].emit("turnOn") )
    }

    this.turnOff = function() {
        Object.keys(sockets).forEach( key => sockets[key].emit("turnOff") )
    }
}

function initApplicationSpecificLogic(actor) {
    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/index.html');
    });

    io.on('connection', socket => {
        const key = count;
        sockets[key] = socket;
        count++;
        
        actor.eventBus.post("GUIReady");

        socket.on( 'turnedOn', msg => actor.eventBus.post("turnedOn") );
        socket.on( 'turnedOff', msg => actor.eventBus.post("turnedOff") );

        socket.on( 'disconnect', () => delete sockets[key] );
    });
      
    http.listen(8080, () => console.log('listening on localhost:8080') );

    actor.eventBus.subscribe( "actorFinish", id, actor => onFinish(actor) );
}

function onFinish(actor) {
    Object.keys(sockets).forEach( key => sockets[key].disconnect() )
    http.close();
    actor.eventBus.unsubscribeAll(id);
}

module.exports = GUI;