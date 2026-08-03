import logoImg from '@/assets/assets/logo.svg';
import { Icon } from "@iconify/react";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import { Container } from "@mui/material";
import React from "react";
import { FOOTER_LINKS as footerLinks } from "../../../../shared/constants/landingPage";

const Footer = () => {
  return (
    <footer className="pt-12 md:pt-24 pb-8 md:pb-12 bg-white border-t border-gray-200">
      <Container maxWidth="lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_2fr_1fr] gap-10 md:gap-12 mb-10 md:mb-16">
          {/* Logo & Description */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1 pr-0 lg:pr-4">
            <div className="mb-8">
              <div className="flex items-center mb-6">
                <img
                  src={logoImg}
                  alt="MedConnect Logo"
                  className="h-10 mr-2 hidden"
                  onError={(e) => {
                    e.target.style.display = "none";
                    document.getElementById(
                      "footer-fallback-logo",
                    ).style.display = "flex";
                  }}
                  onLoad={(e) => {
                    e.target.style.display = "block";
                    const fallback = document.getElementById(
                      "footer-fallback-logo",
                    );
                    if (fallback) fallback.style.display = "none";
                  }}
                />
                <MedicalServicesIcon
                  id="footer-fallback-logo"
                  className="text-primary text-[32px] mr-2"
                />
                <div className="flex flex-col justify-center">
                  <span className="font-semibold text-primary text-xl leading-none">
                    MediConnect
                  </span>
                  <span className="text-primary text-xs font-normal tracking-wide mt-1">
                    Healthcare Ecosystem
                  </span>
                </div>
              </div>
              <p className="text-gray-500 leading-relaxed text-[13.5px]">
                One Integrated platform for all your
                <br />
                healthcare needs. Empowering
                <br />
                hospitals, Doctors and patients
                <br />
                with AI and Technology.
              </p>
            </div>
          </div>

          {/* Links Sections */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1 grid grid-cols-2 sm:grid-cols-3 gap-6 md:gap-8">
            {footerLinks.map((section, index) => (
              <div key={index} className="flex flex-col">
                <h4 className="font-bold text-gray-900 mb-6 text-sm">
                  {section.title}
                </h4>
                <div className="flex flex-col gap-4">
                  {section.links.map((link, i) => (
                    <a
                      key={i}
                      href="#"
                      className="text-[13.5px] text-gray-500 hover:text-primary transition-colors no-underline"
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Newsletter Section */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <h4 className="font-bold text-gray-900 mb-6 text-sm">Newsletter</h4>
            <p className="text-gray-500 mb-4 text-[13.5px]">
              Subscribe to get latest updates!
            </p>
            <div className="flex items-center mb-8 h-10">
              <input
                type="email"
                placeholder="Enter Your Email ID"
                className="flex-grow h-full px-3 text-[13.5px] border border-gray-300 rounded-l focus:outline-none focus:border-primary"
              />
              <button className="h-full w-12 bg-primary text-white rounded-r flex items-center justify-center hover:bg-primary/90 transition-colors border-none cursor-pointer">
                <Icon icon="solar:arrow-right-linear" className="text-[20px]" />
              </button>
            </div>

            {/* Social Icons */}
            <h4 className="font-bold text-gray-900 mb-4 text-sm">
              Our Socials
            </h4>
            <div className="flex gap-5">
              <a
                href="#"
                className="text-gray-500 hover:text-primary transition-colors flex items-center justify-center"
              >
                <Icon
                  icon="prime:twitter"
                  width={24}
                  height={24}
                  className="text-[20px]"
                />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-primary transition-colors flex items-center justify-center"
              >
                <Icon
                  icon="mdi:youtube"
                  width={24}
                  height={24}
                  className="text-[20px]"
                />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-primary transition-colors flex items-center justify-center"
              >
                <Icon
                  icon="ic:outline-facebook"
                  width={24}
                  height={24}
                  className="text-[20px]"
                />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-primary transition-colors flex items-center justify-center"
              >
                <Icon
                  icon="mdi:linkedin"
                  width={24}
                  height={24}
                  className="text-[20px]"
                />
              </a>
            </div>
          </div>
        </div>

        <hr className="mb-8 border-t border-gray-200 opacity-50" />

        {/* Bottom Footer */}
        <div className="flex justify-center items-center">
          <p className="text-gray-500 text-xs text-center">
            @ 2026 Healthcare. All Rights Reserved. Privacy policy, Terms of
            Service, HIPAA Notice, Cookie Settings, Accessibility.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;