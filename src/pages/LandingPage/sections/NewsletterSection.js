import React from "react";

const NewsletterSection = () => {
  return (
    <section className="relative min-h-[410px] overflow-hidden bg-white px-5 py-20">

      {/* Left model */}
      <div className="absolute bottom-0 left-[4%] hidden w-[190px] md:block lg:left-[13%]">

        <img
          src="https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=700&q=90"
          alt="Fashion model"
          className="h-[300px] w-full object-cover"
        />

      </div>

      {/* Center */}
      <div className="relative z-10 mx-auto max-w-[480px] text-center">

        <h2 className="font-serif text-[26px]">
          Subscribe To Our Newsletter
        </h2>

        <p className="mx-auto mt-2 max-w-[380px] text-[8px] leading-[1.8] text-gray-400">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Subscribe to our newsletter for the latest fashion updates.
        </p>

        <div className="mx-auto mt-6 flex max-w-[370px] border-b border-gray-200">

          <input
            type="email"
            placeholder="michael@gmail.com"
            className="min-w-0 flex-1 px-3 py-3 text-[9px] outline-none"
          />

          <button className="bg-black px-6 text-[8px] text-white">
            Subscribe Now
          </button>

        </div>

      </div>

      {/* Right model */}
      <div className="absolute bottom-0 right-[4%] hidden w-[190px] md:block lg:right-[13%]">

        <img
          src="https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=700&q=90"
          alt="Fashion model"
          className="h-[300px] w-full object-cover"
        />

      </div>

    </section>
  );
};

export default NewsletterSection;