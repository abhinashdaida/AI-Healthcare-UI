import React from 'react';
import Navbar from './components/Navbar/Navbar';
import HeroSection from './components/HeroSection/HeroSection';
import ServicesSection from './components/ServicesSection/ServicesSection';
import ParticipantsSection from './components/ParticipantsSection/ParticipantsSection';
import FeaturesSection from './components/FeaturesSection/FeaturesSection';
import StatsSection from './components/StatsSection/StatsSection';
import TestimonialsSection from './components/TestimonialsSection/TestimonialsSection';
import CtaSection from './components/CtaSection/CtaSection';
import Footer from './components/Footer/Footer';
import SearchCompound from './components/ServicesSection/SearchCompound';

function LandingPage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <SearchCompound />
      <ServicesSection />
      <ParticipantsSection />
      <FeaturesSection />
      <StatsSection />
      <TestimonialsSection />
      <CtaSection />
      <Footer />
    </>
  );
}

export default LandingPage;
