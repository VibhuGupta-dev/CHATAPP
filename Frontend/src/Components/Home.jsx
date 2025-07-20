import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import front from "../assets/front.jpg";
import TiltedCard from "./TiltedCard.jsx";

function Home() {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    console.log("🔥 [Home] useEffect triggered: isAuthenticated =", isAuthenticated, "isLoading =", isLoading);

    if (!isLoading && isAuthenticated) {
      navigate("/create-room");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-black text-white">
        <p className="text-xl animate-pulse">Checking authentication...</p>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex flex-row items-center justify-center overflow-hidden relative text-white">
      <div className="absolute top-5 left-8 text-3xl tracking-widest font-bold font-sans">
        Outword
      </div>

      <div className="flex-1 flex flex-col justify-center items-center gap-6 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold font-sans leading-tight">
          CAPTURES THE ANONYMOUS <br />
          VOICE CHAT IDEA
        </h1>

        <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setHasInteracted(true);
              loginWithRedirect();
            }}
            className="px-6 py-3 text-lg rounded-md bg-gray-800 hover:bg-gray-700 transition-colors duration-200"
          >
            Sign In
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setHasInteracted(true);
              loginWithRedirect();
            }}
            className="px-6 py-3 text-lg rounded-md bg-gray-600 hover:bg-gray-500 transition-colors duration-200"
          >
            Login
          </motion.button>
        </div>
      </div>

      <div className="hidden lg:flex flex-1 justify-center items-center">
        <TiltedCard
          imageSrc={front}
          altText="Outword Visual"
          containerHeight="300px"
          containerWidth="300px"
          imageHeight="300px"
          imageWidth="300px"
          rotateAmplitude={12}
          scaleOnHover={1.2}
          showMobileWarning={false}
          showTooltip={true}
          displayOverlayContent={true}
          overlayContent={
            <p className="text-white text-center text-lg font-medium">
              Real Conversations. Real You.
            </p>
          }
        />
      </div>
    </div>
  );
}

export default Home;
