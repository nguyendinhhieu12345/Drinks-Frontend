import { Server } from "socket.io";

const io = new Server(8900, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    },
});

io.on("connection", (socket) => {
    console.log("A user connected");

    socket.emit("message", "Welcome to the server!");

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

console.log("Socket server is running on port 8900");
