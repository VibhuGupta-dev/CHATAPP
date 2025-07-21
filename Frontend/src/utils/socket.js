import { io } from "socket.io-client";

let socket;

export const connectSocket = () => {
    if (!socket) {
        socket = io("http://localhost:5000", {
            transports: ["websocket"],
        });

        socket.on("connect", () => {
            console.log("✅ [Client] Connected:", socket.id);
        });

        socket.on("disconnect", () => {
            console.log("❌ [Client] Disconnected");
        });
    }
};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};

export const getSocket = () => socket;