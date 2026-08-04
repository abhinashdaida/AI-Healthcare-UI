import { Icon } from "@iconify/react";
import React from "react";


function Brandingsidepanel(){
    return(
         <div className="w-full md:w-[45%] bg-[#086952] rounded-[24px] text-white p-6 md:p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
                  
                  <div className="flex flex-col gap-6 z-10">
                    {/* Pill Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 w-fit backdrop-blur-md self-start text-xs font-semibold tracking-wide">
                      <Icon icon="lucide:sparkles" className="w-3.5 h-3.5 text-teal-300" />
                      <span>AI-Powered Healthcare Ecosystem</span>
                    </div>
        
                    {/* Title & Description */}
                    <div className="flex flex-col gap-3">
                      <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
                        One Secure Access for Every Healthcare User
                      </h2>
                      <p className="text-white/80 text-sm leading-relaxed font-light max-w-md">
                        Patients, Doctors, Hospitals, Pharmacies, Laboratories, and Insurance providers connected through one intelligent healthcare ecosystem.
                      </p>
                    </div>
                  </div>
        
                  {/* Three Feature Badges */}
                  <div className="grid grid-cols-3 gap-2.5 z-10">
                    <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-md text-center transition-all hover:bg-white/15">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mb-1.5">
                        <Icon icon="solar:clock-circle-bold-duotone" className="w-5 h-5 text-teal-300" />
                      </div>
                      <span className="text-[11px] font-bold tracking-wide">24/7</span>
                      <span className="text-[9px] text-white/60 font-medium">Healthcare Access</span>
                    </div>
        
                    <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-md text-center transition-all hover:bg-white/15">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mb-1.5">
                        <Icon icon="solar:shield-check-bold-duotone" className="w-5 h-5 text-teal-300" />
                      </div>
                      <span className="text-[11px] font-bold tracking-wide">100%</span>
                      <span className="text-[9px] text-white/60 font-medium">Encrypted Login</span>
                    </div>
        
                    <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-md text-center transition-all hover:bg-white/15">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mb-1.5">
                        <Icon icon="solar:stars-bold-duotone" className="w-5 h-5 text-teal-300" />
                      </div>
                      <span className="text-[11px] font-bold tracking-wide">AI</span>
                      <span className="text-[9px] text-white/60 font-medium">AI Enabled Platform</span>
                    </div>
                  </div>
                </div>
        
    )
}

export default Brandingsidepanel;