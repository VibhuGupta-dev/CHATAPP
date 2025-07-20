import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RippleGrid from '../public/Background'; // Ripple effect component
import Home from './Components/Home';
import CreateRoom from './Components/CreateRoom';
import PrivateRoute from './Components/PrivateRoute'; // ✅ Import PrivateRoute

function App() {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      {/* Background Ripple */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <RippleGrid
          enableRainbow={false}
          gridColor="#231f1fff"
          rippleIntensity={0.05}
          gridSize={10}
          gridThickness={15}
          mouseInteraction={true}
          mouseInteractionRadius={1.2}
          opacity={0.8}
        />
      </div>

      {/* Foreground Routing */}
      <div className="relative z-10 h-full">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />

            {/* 🔒 Protected Route */}
            <Route
              path="/create-room"
              element={
                <PrivateRoute>
                  <CreateRoom />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
