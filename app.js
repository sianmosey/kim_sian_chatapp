const express = require("express");
const path = require("path");

const messenger = require("socket.io")();

const app = express();

app.use(express.static("public"));

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

server.listen(port, () => {
    console.log(`listening on ${port}`);
  });

messenger.attach(server);

messenger.on('connection', (socket) => {
    console.log(`a user connected: ${socket.id}`);

    //send the connected user their assigned ID
    socket.emit('connected', { socketID: `${socket.id}`, message: 'new connection' });

    socket.on('chatmessage', function(message) {
        console.log(message);
        messenger.emit('message', { id: socket.id, message: message })
    });

    socket.on("disconnect", () => {
        console.log("a user has disconnected");
    })
});