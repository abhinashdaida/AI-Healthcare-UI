import { Container } from '@mui/material';
import React from 'react';
import bookingImg from '../../../../assets/LandingPage/booking.png';
import { Icon } from "@iconify/react";
const CtaSection = () => {
  return (
    <section className="py-6 md:py-10 bg-white">
      <Container maxWidth="lg">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          
          {/* Left Image Column */}
          <div className="w-full md:w-1/2">
            <div className="relative flex justify-center">
              <img
                src={bookingImg}
                alt="Medical professionals"
                className="w-full max-w-[600px] h-auto object-cover hidden"
                style={{
                  WebkitMaskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)',
                  maskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)',
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
                onLoad={(e) => {
                  e.target.style.display = 'block';
                  if (e.target.nextSibling) e.target.nextSibling.style.display = 'none';
                }}
              />
              {/* Fallback Image Block */}
              <div className="w-full max-w-[500px] h-[400px] bg-gray-100 rounded-[32px] flex items-center justify-center">
                <span className="text-gray-500">Team Image (doctor & patients)</span>
              </div>
            </div>
          </div>

          {/* Right Content Column */}
          <div className="w-full md:w-1/2">
            <div className="max-w-[480px] mx-auto md:mx-0">
              <h2 className="text-gray-900 font-bold mb-6 text-3xl md:text-[2.5rem] leading-tight">
                Ready to take charge<br />of your health?
              </h2>
              <p className="text-gray-500 mb-10 text-[15px]">
                Book an appointment or consult a doctor online
              </p>
              
              <div className="flex flex-col items-start gap-4 w-full max-w-[360px]">
                <button className="w-full py-3.5 flex items-center justify-center gap-2 text-base font-normal bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors border-none cursor-pointer">
                   <Icon
                                            icon="uil:calender" className="text-[20px]" />
                  Book Appointment
                </button>
                <button className="w-full py-3.5 flex items-center justify-center gap-2 text-base font-normal border border-primary text-primary bg-transparent rounded-lg hover:bg-primary/5 transition-colors cursor-pointer">
                  <Icon
                                           icon="tabler:video" className="text-[20px]" />
                  Consult Online
                </button>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
};

export default CtaSection;
