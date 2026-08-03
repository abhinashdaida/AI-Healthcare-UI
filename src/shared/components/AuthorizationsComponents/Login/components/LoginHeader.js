import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import React from "react";
import logoImg from '../../../../../assets/assets/logo.svg';

const LoginHeader = ({ onLogoClick }) => {
  return (
    <header className="max-w-6xl w-full mx-auto flex items-center justify-between py-4 px-2">
      {/* Logo Section */}
      <div className="flex items-center cursor-pointer" onClick={onLogoClick}>
        <img
          src={logoImg}
          alt="MedConnect Logo Icon"
          className="h-10 mr-2 hidden"
          onError={(e) => {
            e.target.style.display = 'none';
            const fallback = document.getElementById('login-fallback-icon');
            if (fallback) fallback.style.display = 'block';
          }}
          onLoad={(e) => {
            e.target.style.display = 'block';
            const fallback = document.getElementById('login-fallback-icon');
            if (fallback) fallback.style.display = 'none';
          }}
        />
        <MedicalServicesIcon id="login-fallback-icon" className="text-primary text-[32px] mr-2" />

        <div className="flex flex-col justify-center">
          <span className="login-header-logo-text font-semibold text-primary text-xl leading-none">
            MediConnect
          </span>
          <span className="login-header-logo-sub text-primary text-xs font-normal tracking-[0.5px] mt-0.5">
            Healthcare Ecosystem
          </span>
        </div>
      </div>

      {/* Support Section */}
      <a
        href="#support"
        className="flex items-center gap-2 text-xs font-semibold text-gray-600 hover:text-gray-900 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.205 19.0006V13.8757C11.2203 12.8683 11.4341 11.8739 11.8344 10.9493C12.2346 10.0247 12.8134 9.18816 13.5375 8.48762C14.2616 7.78708 15.1168 7.2363 16.0542 6.86683C16.9915 6.49737 17.9925 6.31648 18.9999 6.33454C20.0073 6.31648 21.0083 6.49737 21.9457 6.86683C22.883 7.2363 23.7383 7.78708 24.4624 8.48762C25.1865 9.18816 25.7652 10.0247 26.1655 10.9493C26.5657 11.8739 26.7796 12.8683 26.7948 13.8757V19.0006M22.8974 29.2309C23.931 29.2309 24.9223 28.8203 25.6533 28.0894C26.3842 27.3585 26.7948 26.3672 26.7948 25.3336V20.9492M22.8974 29.2309C22.8974 29.8769 22.6407 30.4964 22.1839 30.9532C21.7271 31.41 21.1075 31.6666 20.4615 31.6666H17.5384C16.8923 31.6666 16.2728 31.41 15.8159 30.9532C15.3591 30.4964 15.1025 29.8769 15.1025 29.2309C15.1025 28.5849 15.3591 27.9653 15.8159 27.5085C16.2728 27.0517 16.8923 26.7951 17.5384 26.7951H20.4615C21.1075 26.7951 21.7271 27.0517 22.1839 27.5085C22.6407 27.9653 22.8974 28.5849 22.8974 29.2309ZM8.28197 16.0777H10.2307C10.4891 16.0777 10.7369 16.1803 10.9197 16.363C11.1024 16.5457 11.205 16.7936 11.205 17.052V22.8978C11.205 23.1562 11.1024 23.4041 10.9197 23.5868C10.7369 23.7695 10.4891 23.8722 10.2307 23.8722H8.28197C7.76514 23.8722 7.26947 23.6669 6.90402 23.3014C6.53856 22.936 6.33325 22.4403 6.33325 21.9235V18.0263C6.33325 17.5095 6.53856 17.0138 6.90402 16.6484C7.26947 16.283 7.76514 16.0777 8.28197 16.0777ZM29.7179 23.8722H27.7691C27.5107 23.8722 27.2629 23.7695 27.0802 23.5868C26.8974 23.4041 26.7948 23.1562 26.7948 22.8978V17.052C26.7948 16.7936 26.8974 16.5457 27.0802 16.363C27.2629 16.1803 27.5107 16.0777 27.7691 16.0777H29.7179C30.2347 16.0777 30.7304 16.283 31.0958 16.6484C31.4613 17.0138 31.6666 17.5095 31.6666 18.0263V21.9235C31.6666 22.4403 31.4613 22.936 31.0958 23.3014C30.7304 23.6669 30.2347 23.8722 29.7179 23.8722Z" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>

        </div>
        <div className="flex flex-col text-left">
          <span className="login-header-support-sub text-[10px] text-gray-400 font-medium leading-none">Need Help?</span>
          <span className="login-header-support-text text-[#0b6a4f] hover:underline leading-tight mt-0.5">Contact Support</span>
        </div>
      </a>
    </header>
  );
};

export default LoginHeader;
