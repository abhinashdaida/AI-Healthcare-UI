import React from "react";

import Navbar from "../sections/Navbar";
import HeroSection from "../sections/Herosection";
import SearchBar from "../sections/SearchBar";
import ServiceSection from "../sections/ServiceSection";
import ParticipantSection from "../sections/ParticipantSection";
import WhyChooseUs from "../sections/WhyChooseUs";
import ImpactNumbers from "../sections/ImpactNumbers";
import Testimonials from "../sections/Testimonials";
import CallToAction from "../sections/CallToAction";
import Footer from "../sections/Footer";


const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <SearchBar />
      <ServiceSection />
      <ParticipantSection />
      <WhyChooseUs />
      <ImpactNumbers />
      <Testimonials />
      <CallToAction />
      <Footer />    
    </div>
  );
};

export default LandingPage;