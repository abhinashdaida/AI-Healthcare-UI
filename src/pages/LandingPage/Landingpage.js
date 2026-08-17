import React from "react";
import Header from "../LandingPage/sections/Navbar";
import HeroSection from "../LandingPage/sections/herosection";
import BrandStrip from "../LandingPage/sections/brandstrip";
import DealsSection from "../LandingPage/sections/Dealsection";
import NewArrivalsSection from "../LandingPage/sections/Newarrivals";
import CollectionBanner from "../LandingPage/sections/CollectionBrand";
import BenefitsSection from "../LandingPage/sections/BenefitsSection";
import InstagramSection from "../LandingPage/sections/Instragramsection";
import TestimonialsSection from "../LandingPage/sections/Testimonial";
import NewsletterSection from "../LandingPage/sections/NewsletterSection";
import Footer from "../LandingPage/sections/Footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">

      <Header />

      <main>

        {/* 01 - Hero */}
        <HeroSection />

        {/* 02 - Brand Logos */}
        <BrandStrip />

        {/* 03 - Deals */}
        <DealsSection />

        {/* 04 - New Arrivals */}
        <NewArrivalsSection />

        {/* 05 - Men's Collection */}
        <CollectionBanner />

        {/* 06 - Benefits */}
        <BenefitsSection />

        {/* 07 - Instagram */}
        <InstagramSection />

        {/* 08 - Testimonials */}
        <TestimonialsSection />

        {/* 09 - Newsletter */}
        <NewsletterSection />

      </main>

      <Footer />

    </div>
  );
};

export default LandingPage;