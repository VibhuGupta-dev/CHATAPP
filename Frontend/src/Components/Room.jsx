import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  connectSocket,
  disconnectSocket,
  getSocket,
} from "../utils/socket.js";

function Room() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const name = prompt("Enter your name:");
    if (!name) return navigate("/create-room");
    setUsername(name);

    connectSocket();
    const socket = getSocket();

    if (socket) {
      socket.emit("join-room", { roomId, username: name });

      socket.on("receive-message", ({ sender, text, time }) => {
        setMessages((prev) => [...prev, { sender, text, time }]);
      });
    }

    return () => {
      disconnectSocket();
    };
  }, [roomId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    const socket = getSocket();
    if (socket && message.trim()) {
      const time = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      socket.emit("send-message", {
        roomId,
        sender: username,
        text: message,
        time,
      });

      setMessages((prev) => [...prev, { sender: username, text: message, time }]);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#1a1a1a] text-white">
      {/* Header */}
      <div className="bg-[#242526] px-4 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/create-room")} className="text-white hover:text-gray-300 text-xl">
            ⬅
          </button>
          <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center font-bold text-xl">
            {roomId[0]?.toUpperCase()}
          </div>
          <div>
            <p className="font-semibold">Room: {roomId}</p>
            <p className="text-sm text-gray-400">You: {username}</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-[70%] px-4 py-2 rounded-lg shadow ${
              msg.sender === username
                ? "bg-green-600 text-white ml-auto"
                : "bg-[#3a3b3c] text-white"
            }`}
          >
            <div className="text-xs text-gray-300 font-semibold mb-1">
              {msg.sender}
            </div>
            <div className="text-sm">{msg.text}</div>
            <div className="text-[10px] text-right text-gray-400 mt-1">
              {msg.time}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={sendMessage} className="p-3 bg-[#242526] border-t flex items-center gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 bg-[#3a3b3c] text-white px-4 py-2 rounded-full outline-none placeholder-gray-400"
        />
        <button
          type="submit"
          className="bg-green-600 px-5 py-2 rounded-full hover:bg-green-700 transition"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default Room;
