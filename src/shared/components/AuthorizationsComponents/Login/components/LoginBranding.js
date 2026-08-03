import Doctor from '@assets/doctor.jpg';
import React from 'react';

export default function LoginBranding() {
  return (
    <div className="md:w-1/2 lg:w-1/2 bg-[#096B58] text-white p-8 md:p-10 lg:p-14 flex flex-col relative overflow-hidden min-h-[550px] md:min-h-auto rounded-t-3xl lg:rounded-tr-none lg:rounded-l-3xl">

      {/* Layer 1: Doctor Image (Pushed to back) - z-10 */}
      <div className="absolute bottom-0 top-[38%] h-[70%]  left-0 w-full flex justify-center items-end z-10 pointer-events-none">
        <img
          src={Doctor}
          alt="Healthcare Provider assisting Patient"
          className="login-branding-doctor-img max-w-[95%] lg:max-w-[90%] h-full max-h-full w-auto object-contain object-bottom"
        />
      </div>

      {/* Layer 2: Gradient Overlay */}
      <div className="absolute bottom-0 left-0 w-full h-50 bg-gradient-to-t from-[#096B58] via-[#096B58]/95 to-transparent z-11 pointer-events-none"></div>

      {/* Layer 3: Top Content (Brought to front) - z-20 */}
      <div className="relative z-20">
        <div className="inline-block px-6 py-2 rounded-full border border-white/60 shadow-[inset_0_0_5px_rgba(255,255,255,0.4)] backdrop-blur-xl mb-6">
          <span className="text-white text-sm font-medium tracking-wide">AI-Powered Healthcare Ecosystem</span>
        </div>

        <h1 className="login-branding-title text-3xl lg:text-3xl xl:text-4xl font-bold leading-tight mb-4 tracking-tight">
          One Secure Access for<br className="hidden lg:block" /> Every Healthcare User
        </h1>

        <p className="login-branding-desc text-sm text-white/80 leading-relaxed max-w-md font-light mb-8">
          Patients, Doctors, Hospital, Pharmacies, Laboratories, and Insurance providers connected through one intelligent healthcare ecosystem.
        </p>
      </div>

      {/* Layer 4: Badges (Brought to front) - z-20 */}
      <div className="relative z-20 grid grid-cols-3 gap-3 w-full max-w-lg mt-auto pt-40">

        {/* Badge 1 */}
        <div className=" bg-[#096B58] p-3 lg:p-4 rounded-xl border border-white/30 shadow-[inset_0_0_5px_rgba(255,255,255,0.4)]">
          <div className="flex items-center gap-1.5 mb-1.5 text-emerald-300">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z" fill="#14B392" />
              <path d="M7 4V9H12" stroke="#096B58" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

            <span className="login-branding-badge-title text-xs lg:text-sm font-bold text-white tracking-wide">24/7</span>
          </div>
          <p className="login-branding-badge-desc text-[10px] lg:text-xs text-white/80 leading-tight">Healthcare Access</p>
        </div>

        {/* Badge 2 */}
        <div className="bg-[#096B58] backdrop-blur-md p-3 lg:p-4 rounded-xl border border-white/30 shadow-[inset_0_0_5px_rgba(255,255,255,0.4)]">
          <div className="flex items-center gap-1.5 mb-1.5 text-emerald-300">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 6.65571L12 4L19 6.65571V12.0814C19.0001 13.3969 18.6382 14.6863 17.9546 15.8053C17.2711 16.9243 16.293 17.8285 15.13 18.4167L12 20L8.87 18.4147C7.70732 17.8266 6.72944 16.9227 6.04592 15.8041C5.36239 14.6855 5.00023 13.3965 5 12.0814V6.65571Z" fill="#14B392" />
              <path d="M12 9V12M12 12V15M12 12H15M12 12H9" stroke="white" stroke-width="1.5" stroke-linecap="round" />
              <path d="M12 9V12M12 12V15M12 12H15M12 12H9" stroke="#096B58" stroke-width="1.5" stroke-linecap="round" />
            </svg>

            <span className="login-branding-badge-title text-xs lg:text-sm font-bold text-white tracking-wide">100%</span>
          </div>
          <p className="login-branding-badge-desc text-[10px] lg:text-xs text-white/80 leading-tight">Encrypted Login</p>
        </div>

        {/* Badge 3 */}
        <div className="bg-[#096B58] backdrop-blur-md p-3 lg:p-4 rounded-xl border border-white/30 shadow-[inset_0_0_5px_rgba(255,255,255,0.4)]">
          <div className="flex items-center gap-1.5 mb-1.5 text-emerald-300">
            <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.6362 2.77148C6.11684 1.36484 8.06031 1.32224 8.63016 2.64367L8.67839 2.77228L9.32702 4.66923C9.47566 5.10427 9.71587 5.50237 10.0314 5.83668C10.347 6.17099 10.7306 6.43373 11.1564 6.60718L11.3308 6.67228L13.2276 7.32014C14.6342 7.80081 14.6768 9.74438 13.3562 10.3143L13.2276 10.3625L11.3308 11.0112C10.8956 11.1597 10.4974 11.3999 10.1629 11.7155C9.8285 12.0311 9.56565 12.4147 9.39212 12.8406L9.32702 13.0142L8.67919 14.912C8.19855 16.3186 6.25508 16.3612 5.68603 15.0406L5.6362 14.912L4.98837 13.015C4.83982 12.5798 4.59966 12.1816 4.28408 11.8471C3.9685 11.5127 3.58486 11.2498 3.15904 11.0763L2.98543 11.0112L1.08858 10.3633C-0.318785 9.88263 -0.361384 7.93906 0.959981 7.36998L1.08858 7.32014L2.98543 6.67228C3.42045 6.52363 3.81853 6.2834 4.15281 5.96782C4.4871 5.65223 4.74983 5.26861 4.92327 4.84285L4.98837 4.66923L5.6362 2.77148ZM13.5877 1.45235e-07C13.7381 -1.89673e-07 13.8854 0.0421817 14.013 0.121752C14.1406 0.201322 14.2433 0.315089 14.3095 0.450124L14.348 0.544168L14.6294 1.36886L15.4548 1.65019C15.6055 1.70138 15.7376 1.79617 15.8344 1.92252C15.9311 2.04888 15.9882 2.20112 15.9984 2.35995C16.0085 2.51878 15.9713 2.67706 15.8914 2.81471C15.8115 2.95237 15.6926 3.06321 15.5496 3.13318L15.4548 3.17177L14.6302 3.45309L14.3488 4.27859C14.2976 4.42924 14.2027 4.56128 14.0763 4.65797C13.9499 4.75466 13.7977 4.81166 13.6388 4.82173C13.48 4.8318 13.3218 4.7945 13.1842 4.71455C13.0466 4.6346 12.9358 4.5156 12.8659 4.37263L12.8273 4.27859L12.546 3.4539L11.7206 3.17257C11.5699 3.12137 11.4378 3.02659 11.341 2.90023C11.2443 2.77388 11.1872 2.62164 11.177 2.4628C11.1669 2.30397 11.2041 2.1457 11.284 2.00805C11.3639 1.87039 11.4828 1.75955 11.6257 1.68957L11.7206 1.65099L12.5452 1.36966L12.8265 0.544168C12.8807 0.385359 12.9833 0.247495 13.1198 0.149906C13.2563 0.0523181 13.4199 -0.0001007 13.5877 1.45235e-07Z" fill="#14B392" />
            </svg>

            <span className="login-branding-badge-title text-xs lg:text-sm font-bold text-white tracking-wide">AI</span>
          </div>
          <p className="login-branding-badge-desc text-[10px] lg:text-xs text-white/80 leading-tight">AI Enabled Platform</p>
        </div>

      </div>
    </div>
  );
}