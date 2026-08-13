import React from "react";
import { Button } from "@mui/material";
import { Icon } from "@iconify/react";
import CTAImage from "../../assets/LandingPage/cta-image.avif";

const CallToAction = () => {
  return (
<section className="max-w-[1140px] mx-auto py-[56px] px-4 sm:px-6 lg:px-0"
>
<div className="flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Left Image */}

<div className="relative w-full lg:w-[626px] h-auto lg:h-[454px] overflow-hidden">
          <img
  src={CTAImage}
  alt="Healthcare"
  className="w-full h-auto lg:h-full object-contain"
/>

          {/* Bottom White Gradient */}

<div className="absolute bottom-0 left-0 w-full h-[100px] lg:h-[140px] bg-gradient-to-t from-white to-transparent" 
/>
        </div>

        {/* Right Content */}

<div className="w-full lg:w-[514px] lg:h-[454px] px-0 lg:px-6 flex flex-col justify-center items-center lg:items-start gap-8 text-center lg:text-left">
          <div>

<h2 className="w-full lg:w-[304px] text-[30px] lg:text-[28px] font-medium leading-tight lg:leading-none text-[#141414]">              Ready to take charge of your health?
            </h2>

<p className="w-full lg:w-[304px] mt-6 text-[14px] leading-6 lg:leading-none text-[#343434]">
              Book an appointment or consult a doctor online
            </p>

          </div>

<div className="flex flex-col gap-4 w-full items-center lg:items-start">

            <Button
              startIcon={<Icon icon="uis:calender" width="24" />}
              sx={{
                width: "100%",
                maxWidth: "304px",
                height: "48px",
                borderRadius: "8px",
                backgroundColor: "#0D8B72",
                color: "#FFFFFF",
                fontSize: "16px",
                fontWeight: 500,
                textTransform: "none",
                boxShadow:
                  "0px 1px 1px rgba(20,179,146,0.07),0px 2px 2px rgba(16,140,114,0.07),0px 4px 4px rgba(13,115,94,0.07)",
                "&:hover": {
                  backgroundColor: "#096B58",
                },
              }}
            >
              Book Appointment
            </Button>

            <Button
              variant="outlined"
              startIcon={<Icon icon="tabler:video" width="24" />}
              sx={{
                width:"100%",
                maxWidth: "304px",
                height: "48px",
                borderRadius: "8px",
                border: "1px solid #096B58",
                color: "#096B58",
                fontSize: "16px",
                fontWeight: 500,
                textTransform: "none",
              }}
            >
              Consult Online
            </Button>

          </div>

        </div>

      </div>

    </section>
  );
};

export default CallToAction;