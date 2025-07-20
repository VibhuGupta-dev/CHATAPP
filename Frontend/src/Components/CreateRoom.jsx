import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

function CreateRoom() {
    const {logout} = useAuth0();
    const handleLogout = () => {
        logout({ returnTo: window.location.origin });
    };
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700 text-white">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">Create Room</h1>
        <p className="text-lg mb-6">This is the Create Room page.</p>
        
        <button className="ml-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-300">
         
            CREATE ROOM
         
        </button>
        <button className="ml-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-300">
         
            JOIN ROOM
         
        </button>

      </div>
      <div className="absolute top-0 left-0 w-full px-8 py-5 flex justify-between items-center z-20">
  {/* 🔵 Left: Logo */}
  <div className="text-3xl tracking-widest font-bold font-sans text-white">
    Outword
  </div>

  {/* 🔴 Right: Logout Button */}
  <button
    onClick={handleLogout}
    className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition duration-300"
  >
    Logout
  </button>
</div>

    </div>
  );
}

export default CreateRoom;
