// src/Components/CreateRoom.jsx
import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import {
  connectSocket,
  disconnectSocket,
  getSocket,
} from "../utils/socket.js";

function CreateRoom() {
  const { logout } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    connectSocket();
   
  }, []);

  const handleCreateRoom = () => {
    const socket = getSocket();
    if (!socket || !socket.connected) {
      alert("Socket not connected");
      return;
    }

    const roomId = Math.random().toString(36).substring(2, 8); // 6-char
    socket.emit("create-room", { roomId });
    navigate(`/room/${roomId}`);
  };

  const handleJoinRoom = () => {
    const socket = getSocket();
    if (!socket || !socket.connected) {
      alert("Socket not connected");
      return;
    }

    const roomId = prompt("Enter Room ID:");
    if (!roomId || roomId.length < 6) {
      alert("Room ID must be at least 6 characters");
      return;
    }

    socket.emit("join-room", { roomId });
    navigate(`/room/${roomId}`);
  };

  const handleLogout = () => {
    disconnectSocket();
    logout({ returnTo: window.location.origin });
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">Create or Join a Room</h1>
        <div className="space-x-4">
          <button
            onClick={handleCreateRoom}
            className="px-6 py-2 bg-green-600 rounded hover:bg-green-700"
          >
            Create Room
          </button>
          <button
            onClick={handleJoinRoom}
            className="px-6 py-2 bg-blue-600 rounded hover:bg-blue-700"
          >
            Join Room
          </button>
          <button
            onClick={handleLogout}
            className="ml-4 px-6 py-2 bg-red-600 hover:bg-red-700 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateRoom;
