import React from "react";

function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center space-y-4 animate-fadeIn">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 animate-fadeInDown">
          hello from home
        </h1>
        <p className="text-xl text-gray-600 animate-fadeIn" style={{ animationDelay: "0.2s", animationFillMode: "both" }}>
          Welcome to Beast Burger
        </p>
      </div>
    </div>
  );
}

export default Home;
