import React from "react";
import BackgroundImage from "../assets/bg-landing-page.jpg";

function LandingPage() {
  return (
    <div
      className="bg-cover bg-center h-screen"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      <div className="h-full flex flex-col justify-center items-center text-white">
        <h1 className="text-6xl font-bold mb-4">
          Find the wedding dress you dreamed of
        </h1>
        <p className="text-xl">Here you can find everything you need</p>
      </div>
    </div>
  );
}

export default LandingPage;
