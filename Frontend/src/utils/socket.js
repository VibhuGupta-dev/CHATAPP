// socket.js
import { io } from "socket.io-client";

let socket;

export const connectSocket = () => {
    if (!socket) {
        socket = io("http://localhost:5000", {
            transports: ["websocket"],
        });

        socket.on("connect", () => {
            console.log("✅ [Client] Socket connected:", socket.id);
        });

        socket.on("connect_error", (err) => {
            console.error("❌ [Client] Connection error:", err.message);
        });
    }
};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        console.log("❌ [Client] Socket disconnected");
        socket = null;
    }
};

export const getSocket = () => socket;