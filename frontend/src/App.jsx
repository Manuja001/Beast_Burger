import React from "react";

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <div
      key={location.pathname}
      className="animate-fadeIn"
      style={{
        animation: "fadeIn 0.4s ease-in-out",
      }}
    >
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
