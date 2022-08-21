// Creating a express server
const express = require("express");
const app = express();

const { Server } = require("socket.io");

// To build our server together with socket.io
const http = require("http");

// Since socket.io deals with a lot of cors issues
const cors = require("cors");

// Using the cors middleware to resolve cors issues
app.use(cors());

const server = http.createServer(app);

// Connecting our backend to our frontend
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
    console.log("User Connected: ", socket.id);

    // Creating an event on the backend to handle emit events on the frontend.
    // This determines when someone wants to join the room.
    socket.on("join_room", (room) => {
        socket.join(room);
        console.log(`User with ID: ${socket.id} joined room ${room}`);
    })

    socket.on("disconnect", () => {
        console.log("User Disconnected: ", socket.id);
    })
})

server.listen(3001, () => {
    console.log("Server is running!");
})

