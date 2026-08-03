import { Icon } from "@iconify/react";
import { Container } from '@mui/material';
import React from 'react';
import { PARTICIPANTS as participants } from '../../../../shared/constants/landingPage';

const ParticipantsSection = () => {
  return (
    <section className="py-8 md:py-12 bg-white text-center overflow-hidden">
      <Container maxWidth="lg">
        <span className="section-kicker">
          ONE CONNECTED HEALTHCARE NETWORK
        </span>
        <h2 className="text-gray-900 font-semibold mb-4 text-3xl md:text-[2.5rem] leading-snug px-4">
          Built to connect every participant in the<br className="hidden md:block"/> healthcare journey
        </h2>
        <p className="text-[#666666] mb-12 md:mb-24 max-w-[800px] mx-auto font-normal text-xs px-4">
          From booking to recovery, we make healthcare simple, accessible and personalized for you.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:justify-center gap-x-2 gap-y-10 lg:gap-10 mb-12 md:mb-24 px-2 sm:px-0">
          {participants.map((item, index) => (
            <div key={index} className="relative w-full lg:w-[140px] mx-auto">
              
              {/* Dashed Connecting Line with Arrow (hidden on last item or mobile) */}
              {index !== participants.length - 1 && (
                <div className="absolute top-10 left-[calc(50%+45px)] w-[calc(100%-20px)] z-0 hidden lg:block">
                  <div className="w-full border-t-[1.5px] border-dashed border-gray-300"></div>
                  {/* Arrow head chevron */}
                  <div className="absolute right-0 top-[-3.5px] w-2 h-2 border-t-[1.5px] border-r-[1.5px] border-gray-300 transform rotate-45" />
                </div>
              )}

              <div className="flex flex-col items-center relative z-10">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mb-4 md:mb-6 border border-gray-100 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.03)]">
                  {index === 0 ? (
                     <Icon
                            icon="hugeicons:patient"
                            width={24}
                            height={24} className="text-[24px] md:text-[32px] text-primary" />
                  ) : (
                    <Icon
                      icon="hugeicons:doctor-01"
                      width={24}
                      height={24}
                      className="text-[24px] md:text-[32px] text-primary"
                    />
                  
                  )}
                </div>
                <p className="font-semibold text-[#141414] mb-2 text-xs">
                  {item.role}
                </p>
                <p className="text-gray-500 text-center whitespace-pre-line leading-relaxed px-2 text-[0.7rem] w-[180px]">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <button className="px-8 py-3 bg-primary text-white font-medium rounded-md hover:bg-primary/90 transition-colors border-none cursor-pointer">
          Explore Ecosystem
        </button>
      </Container>
    </section>
  );
};

export default ParticipantsSection;
