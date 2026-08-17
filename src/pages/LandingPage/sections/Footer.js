import React from "react";

const footerLinks = [
  "Support Center",
  "Invoicing",
  "Contact",
  "Careers",
  "FAQ",
];

const Footer = () => {
  return (
    <footer className="border-t border-gray-100 bg-white">

      <div className="mx-auto flex max-w-[1080px] flex-col items-center justify-between gap-5 px-5 py-6 md:flex-row">

        <div className="font-serif text-[13px]">
          FASCO
        </div>

        <div className="flex flex-wrap justify-center gap-5">

          {footerLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="text-[7px] text-gray-500 hover:text-black"
            >
              {link}
            </a>
          ))}

        </div>

      </div>

      <div className="border-t border-gray-100 py-3 text-center">

        <p className="text-[6px] text-gray-400">
          © Copyright 2026 FASCO. All Rights Reserved.
        </p>

      </div>

    </footer>
  );
};

export default Footer;