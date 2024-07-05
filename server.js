import { Server } from "socket.io";

const io = new Server(8900, {
    cors: {
        origin: "http://localhost:3001",
        credentials: true
    },
});

io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on('message', (msg) => {
        console.log('Message received: ' + msg);
        socket.broadcast.emit('message', msg);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

console.log("Socket server is running on port 8900");
