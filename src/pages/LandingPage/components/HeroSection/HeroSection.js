import { Container, Paper } from '@mui/material';
import React from 'react';

import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import heroImg from '../../../../assets/LandingPage/hero-image.png';
import { Icon } from "@iconify/react";
import { HERO_FEATURES } from '../../../../shared/constants/landingPage';

const HeroSection = () => {
  return (
    <section className="section-padding overflow-hidden">
      <Container maxWidth="lg">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-6">
          
          {/* Left Content Column */}
          <div className="flex-1">
            <div className="md:pr-8">
              <div className="flex items-center mb-6 rounded-full px-4 py-2 w-fit bg-secondary">
                <AutoAwesomeIcon className="text-[#075C4C] text-base mr-2" />
                <span className="text-[#075C4C] font-medium text-xs tracking-wide">
                  AI-Powered Healthcare Ecosystem
                </span>
              </div>
              
              <h1 className="mb-6 text-gray-900 text-4xl md:text-5xl lg:text-[3.25rem] font-semibold leading-tight">
                One Platform for the Entire{' '}
                <span className="text-primary">
                  Healthcare
                </span>{' '}
                Ecosystem
              </h1>
              
              <p className="mb-8 text-gray-500 text-lg leading-relaxed max-w-[600px]">
                Connect Patients, Doctors, Hospitals, Laboratories, Pharmacies, Insurance, and Healthcare providers through one secure AI-powered platform.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button className="w-full sm:w-auto px-6 py-3 flex items-center justify-center gap-2 text-base font-normal bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors border-none cursor-pointer">
                   <Icon
                          icon="uil:calender" className="text-[20px]" />
                  Book Appointment
                </button>
                <button className="w-full sm:w-auto px-6 py-3 flex items-center justify-center gap-2 text-base font-normal border border-primary text-primary bg-transparent rounded-lg hover:bg-primary/5 transition-colors cursor-pointer">
                  <Icon
                          icon="tabler:video" className="text-[20px]" />
                  Consult Online
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-nowrap gap-5 sm:gap-6 w-full lg:w-[115%] justify-items-start lg:justify-between relative z-10 mt-8 lg:mt-12">
              {HERO_FEATURES.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#F7FBFA] flex items-center justify-center shrink-0">
                    <Icon icon={item.icon} className="text-primary text-[20px]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#666666] text-xs leading-tight">
                      {item.title}
                    </p>
                    <p className="font-normal text-[#666666] text-[0.7rem]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Image Column */}
          <div className="flex-1 flex justify-center w-full relative">
            <div className="relative w-full max-w-[700px] flex justify-end">
              <img
                src={heroImg}
                alt="Doctor with patient"
                className="w-full h-auto object-contain z-10"
                style={{
                  WebkitMaskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)',
                  maskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)',
                }}
              />
              
              {/* Floating Card 1: Consult Online (Top Right) */}
              <Paper elevation={0} className="hidden sm:flex absolute sm:top-4 sm:-right-6 p-3 rounded-[20px] items-center gap-3 z-20 min-w-[200px] origin-top-right" style={{ boxShadow: '0px 1px 1px 0px rgba(31,31,31,0.07), 0px 2px 2px 0px rgba(41,41,41,0.07), 0px 4px 4px 0px rgba(76,76,76,0.07), 0px 0px 8px 0px rgba(102,102,102,0.07), 0px 0px 16px 0px rgba(102,102,102,0.07)' }}>
                 <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon icon="tabler:video" className="text-primary text-[20px]" />
                 </div>
                 <div>
                   <p className="font-semibold text-gray-900 text-sm">Consult Online</p>
                   <p className="text-[#556660] text-[0.7rem]">Connect in Few Seconds</p>
                 </div>
              </Paper>

              {/* Floating Card 2: Find Doctors (Top Left) */}
              <Paper elevation={0} className="hidden sm:flex absolute sm:top-[90px] sm:-left-5 p-3 rounded-[20px] items-center gap-3 z-20 min-w-[180px] origin-center" style={{ boxShadow: '0px 1px 1px 0px rgba(31,31,31,0.07), 0px 2px 2px 0px rgba(41,41,41,0.07), 0px 4px 4px 0px rgba(76,76,76,0.07), 0px 0px 8px 0px rgba(102,102,102,0.07), 0px 0px 16px 0px rgba(102,102,102,0.07)' }}>
                 <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon icon="icon-park-outline:appointment" className="text-primary text-[20px]" />
                 </div>
                 <div>
                   <p className="font-semibold text-gray-900 text-sm">Find Doctors</p>
                   <p className="text-[#556660] text-[0.7rem]">Verified specialists</p>
                 </div>
              </Paper>

              {/* Floating Card 3: Lab Tests (Bottom Left) */}
              <Paper elevation={0} className="hidden sm:flex absolute sm:bottom-[30px] sm:left-[70px] p-3 rounded-[20px] items-center gap-3 z-20 min-w-[180px] origin-bottom-left" style={{ boxShadow: '0px 1px 1px 0px rgba(31,31,31,0.07), 0px 2px 2px 0px rgba(41,41,41,0.07), 0px 4px 4px 0px rgba(76,76,76,0.07), 0px 0px 8px 0px rgba(102,102,102,0.07), 0px 0px 16px 0px rgba(102,102,102,0.07)' }}>
                 <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon icon="streamline-ultimate:lab-tube-experiment" className="text-primary text-[20px]" />
                 </div>
                 <div>
                   <p className="font-semibold text-gray-900 text-sm">Lab Tests</p>
                   <p className="text-[#556660] text-[0.7rem]">Book tests at home</p>
                 </div>
              </Paper>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
