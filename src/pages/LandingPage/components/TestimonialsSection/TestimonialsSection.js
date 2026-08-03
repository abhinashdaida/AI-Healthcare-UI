import StarIcon from '@mui/icons-material/Star';
import { Container } from '@mui/material';
import React from 'react';
import { TESTIMONIALS as testimonials } from '../../../../shared/constants/landingPage';

const TestimonialsSection = () => {
  return (
    <section className="py-8 md:py-12 bg-white">
      <Container maxWidth="lg">
        <div className="flex flex-col lg:flex-row items-start gap-12">
          
          {/* Left Text Content */}
          <div className="flex-none w-full lg:w-[240px]">
            <span className="section-kicker">
              What our patients say
            </span>
            <h2 className="text-[#141414] font-bold mb-4 text-3xl leading-tight">
              Trusted by Millions
            </h2>
            <p className="text-[#666666] text-[14px] leading-relaxed">
              From booking to recovery, we make healthcare simple, accessible and personalized.
            </p>
          </div>

          {/* Card Scroll Area */}
          <div className="flex-grow w-full min-w-0">
            <div className="flex overflow-x-auto py-4 px-1 gap-4 snap-x scrollbar-hide">
              
              {testimonials.map((item, index) => (
                /* --- CARD UI START --- */
                <div 
                  key={index}
                  className="
                    flex flex-col 
                    w-[206px] 
                    h-auto 
                    rounded-[12px] 
                    border border-[#D0D0D0]
                    bg-[#FBFBFB] 
                    p-[16px] 
                    gap-[16px] 
                    snap-start
                    shrink-0
                    cursor-pointer
                    transition-all duration-300 ease-out
                    hover:-translate-y-1
                    hover:scale-[1.02]
                    hover:shadow-[0_16px_40px_rgba(20,147,123,0.15),0_4px_12px_rgba(0,0,0,0.06)]
                    hover:border-[#14937B]
                  "
                >
                  {/* 1. Rating Flow */}
                  <div className="flex items-center gap-1.5">
                    <div className="flex text-[#FFC955]">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} style={{ fontSize: '14px' }} />
                      ))}
                    </div>
                    <span className="text-[#141414] font-bold text-[12px]">5/5</span>
                  </div>

                  {/* 2. Content Flow (Title + Quote) */}
                  <div className="flex flex-col gap-2">
                    <h3 className="text-[#343434] font-bold text-[14px] leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-[#343434] text-[12px] leading-relaxed">
                      {item.text}
                    </p>
                  </div>

                  {/* 3. Profile Flow */}
                  <div className="flex items-center gap-3 mt-auto">
                    <img 
                      src={item.avatar} 
                      alt={item.name} 
                      className="w-[36px] h-[36px] rounded-full object-cover border border-gray-100"
                    />
                    <div className="flex flex-col">
                      <span className="font-bold text-[#343434] text-[13px] leading-none mb-1">
                        {item.name}
                      </span>
                      <span className="text-[#838383] text-[11px]">
                        {item.role}
                      </span>
                    </div>
                  </div>
                </div>
                /* --- CARD UI END --- */
              ))}

            </div>
          </div>

        </div>
      </Container>

      {/* Utility style to hide scrollbar while swiping */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;