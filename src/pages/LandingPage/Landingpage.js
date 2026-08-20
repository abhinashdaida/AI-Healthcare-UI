import React from "react";
import Header_1 from "@/components/common/Header_1/Header_1";
import HeroSection from "../LandingPage/sections/herosection";
import Categories from "./sections/Categories";
import NewArrivalsSection from "./sections/Newarrivals";
import FeaturedProducts from "./sections/featuredProduct";
import BestSellers from "./sections/BestSellers"
import BenefitsSection from "../LandingPage/sections/BenefitsSection";
import TestimonialsSection from "../LandingPage/sections/Testimonial";
import Offers from "./sections/Offers";
import NewsletterSection from "../LandingPage/sections/NewsletterSection";
import Footer from "@/components/common/Footer/Footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">

      <Header_1 />


        {/* 01 - Hero */}
        <HeroSection />

        {/* 02 - Brand Logos */}
        <Categories />

        {/* 03 - Deals */}
        < FeaturedProducts/>

        {/* 04 - New Arrivals */}
        <NewArrivalsSection />

        {/* 05 - Men's Collection */}
        < BestSellers/>

        {/* 06 - Benefits */}
        <BenefitsSection />

        {/* 07 - Instagram */}
        <Offers />

        {/* 08 - Testimonials */}
        <TestimonialsSection />

        {/* 09 - Newsletter */}
        <NewsletterSection />


      <Footer />

    </div>
  );
};

export default LandingPage;