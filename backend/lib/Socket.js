import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

console.log("✅ [Socket.js] Running...");

const app = express();
const server = http.createServer(app);

console.log("✅ [Socket.js] Express + HTTP server created");

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true,
    },
});

console.log("✅ [Socket.js] Socket.IO server initialized");

io.on('connection', (socket) => {
    console.log('🟢 [Socket.io] A user connected:', socket.id);

    socket.on('test-message', (data) => {
        console.log('📩 [Socket.io] Received test-message:', data);
    });

    socket.on('disconnect', () => {
        console.log('🔴 [Socket.io] User disconnected:', socket.id);
    });
});

export { app, server, io };