import { app, server } from './lib/Socket.js';
import cors from 'cors';
import express from 'express';

console.log("✅ [index.js] Loaded");

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use(express.json());

app.get("/", (req, res) => {
    console.log("📡 [HTTP] GET / called");
    res.send("🚀 Server is running");
});

server.listen(5000, () => {
    console.log("✅ [Server] Listening on http://localhost:5000");
});