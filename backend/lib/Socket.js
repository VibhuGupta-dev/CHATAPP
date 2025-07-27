import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

console.log("✅ [Socket.js] Running...");

const app = express();
const server = http.createServer(app);

console.log("✅ [Socket.js] Express + HTTP server created");

const io = new Server(server, {
    cors: {
        origin: "https://chatapp-wpmu.vercel.app",
        credentials: true,
    },
});

console.log("✅ [Socket.js] Socket.IO server initialized");

io.on('connection', (socket) => {
    console.log('🟢 [Socket.io] Connected:', socket.id);

    socket.on('join-room', ({ roomId, username }) => {
        socket.join(roomId);
        console.log(`👤 ${username} joined room ${roomId}`);
    });

    socket.on('send-message', ({ roomId, sender, text }) => {
        console.log(`📨 Message in ${roomId} from ${sender}: ${text}`);
        socket.to(roomId).emit("receive-message", { sender, text });
    });

    socket.on('disconnect', () => {
        console.log('🔴 [Socket.io] Disconnected:', socket.id);
    });
});

export { app, server, io };
