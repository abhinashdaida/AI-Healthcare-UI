import React from "react";
import { Icon } from "@iconify/react";
import {
  Box,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import Logo from "../../assets/LandingPage/footerlogo2.jpg";
import { FOOTER_LINKS } from "../../shared/constants/landingPage";

const Footer = () => {
  return (
<footer className="max-w-[1142px] mx-auto py-[56px] px-4 sm:px-6 lg:px-0">

      {/* Top Section */}

   <div className="flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap justify-between items-start gap-10">

        {/* Logo */}

<div className="w-full sm:w-[198px] flex flex-col gap-4 shrink-0">
          <img
            src={Logo}
            alt="MediConnect"
            className="w-[198px] h-[44px] object-contain"
          />

<p className="w-full sm:w-[197px] text-[14px] font-normal leading-[18px] tracking-[0.01em] text-[#666666]">
  One Integrated platform for all your healthcare needs. Empowering
  hospitals, Doctors and patients with AI and Technology.
</p>

        </div>

        {/* Platform */}

<div className="w-full sm:w-[198px]">

          <h3 className="text-[18px] font-medium text-[#141414] mb-5">
            Platform
          </h3>

          <div className="flex flex-col gap-4">

            {FOOTER_LINKS.platform.map((item) => (
              <p
                key={item}
                className="text-[14px] text-[#666666] cursor-pointer hover:text-[#096B58]"
              >
                {item}
              </p>
            ))}

          </div>

        </div>

        {/* Resources */}

<div className="w-full sm:w-[198px]">

          <h3 className="text-[18px] font-medium text-[#141414] mb-5">
            Resources
          </h3>

          <div className="flex flex-col gap-4">

            {FOOTER_LINKS.resources.map((item) => (
              <p
                key={item}
                className="text-[14px] text-[#666666] cursor-pointer hover:text-[#096B58]"
              >
                {item}
              </p>
            ))}

          </div>

        </div>

        {/* Company */}

<div className="w-full sm:w-[198px]">

          <h3 className="text-[18px] font-medium text-[#141414] mb-5">
            Company
          </h3>

          <div className="flex flex-col gap-4">

            {FOOTER_LINKS.company.map((item) => (
              <p
                key={item}
                className="text-[14px] text-[#666666] cursor-pointer hover:text-[#096B58]"
              >
                {item}
              </p>
            ))}

          </div>

        </div>

        {/* Newsletter */}

<div className="w-full sm:w-[255px]">

          <h3 className="text-[18px] font-medium text-[#141414]">
            Newsletter
          </h3>

          <p className="mt-5 text-[14px] text-[#666666]">
            Subscribe to get latest updates!
          </p>

          {/* Email */}

          <Box
            sx={{
              display: "flex",
              mt: 3,
              width:"100%",
              maxWidth: "255px",
              height: "48px",
            }}
          >

            <TextField
              placeholder="Enter Your Email ID"
              size="small"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  height: "48px",
                  borderRadius: "4px 0 0 4px",
                  background: "#FBFBFB",
                },
              }}
            />

            <Button
              sx={{
                minWidth: "48px",
                width: "48px",
                background: "#0D8B72",
                color: "#fff",
                borderRadius: "0 4px 4px 0",
                "&:hover": {
                  background: "#096B58",
                },
              }}
            >

              <Icon
                icon="tabler:arrow-right"
                width="24"
              />

            </Button>

          </Box>

          {/* Social */}

          <div className="mt-8 text-center sm:text-left">

            <h3 className="text-[18px] font-medium text-[#141414] mb-4">
              Our Socials
            </h3>

            <div className="flex justify-center sm:justify-start gap-4">

              <IconButton>
                <Icon icon="prime:twitter" width="24" />
              </IconButton>

              <IconButton>
                <Icon icon="mdi:youtube" width="24" />
              </IconButton>

              <IconButton>
                <Icon icon="mdi:facebook" width="24" />
              </IconButton>

              <IconButton>
                <Icon icon="mdi:linkedin" width="24" />
              </IconButton>

            </div>

          </div>

        </div>

      </div>

      {/* Divider */}

      <hr className="my-8 border-[#E5E7EB]" />

{/* Bottom */}

<div className="flex justify-center px-4">

  <div className="w-full max-w-[722px] flex flex-wrap items-center justify-center gap-2 text-center text-[14px] font-normal text-[#4D4D4D]">

    <span>© 2026 Healthcare. All Rights Reserved.</span>

    {FOOTER_LINKS.legal.map((item) => (
      <span
        key={item}
        className="cursor-pointer hover:text-[#096B58]"
      >
        {item}
      </span>
    ))}

  </div>

</div>
    </footer>
  );
};

export default Footer;