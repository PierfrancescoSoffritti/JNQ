const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

function applicationSpecificLogic() {
    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/index.html');
    });

    io.on('connection', socket => {
        
        socket.on('eventFromWebpage', msg => {
            console.log(`event from webpage: "${msg}"`);
            socket.emit('eventFromServer', 'a message from server');
        });

        socket.on('disconnect', () => {
            //console.log('user disconnected');
        });
    });
      
    http.listen(8080, () => console.log('listening on localhost:8080') );
}

module.exports = applicationSpecificLogic;