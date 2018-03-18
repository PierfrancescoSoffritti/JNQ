const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const id = "applicationSpecificLogic";

function applicationSpecificLogic(actor) {
    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/index.html');
    });

    io.on('connection', socket => {
        
        socket.on('eventFromWebpage', msg => {
            console.log(`event from webpage: "${msg}"`);
            socket.emit('eventFromServer', 'a message from server');

            actor.eventBus.post("messageFromWebpage", msg);
        });

        socket.on('disconnect', () => {
            //console.log('user disconnected');
        });
    });
      
    http.listen(8080, () => console.log('listening on localhost:8080') );

    actor.eventBus.subscribe( "actorFinish", id, actor => onFinish(actor) );
}

function onFinish(actor) {
    http.close();
    actor.eventBus.unsubscribeAll(id);
}

module.exports = applicationSpecificLogic;