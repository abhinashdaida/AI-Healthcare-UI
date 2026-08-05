import React from "react";

import Navbar from "../sections/Navbar";
import HeroSection from "../sections/Herosection";
import SearchBar from "../sections/SearchBar";
import ServiceSection from "../sections/ServiceSection";


const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <SearchBar />
      <ServiceSection />
    
    </div>
  );
};

export default LandingPage;