import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

const FormHeader = ({ title, subtitle }) => {
  const navigate = useNavigate();

  return (
    <Box
      component="header"
      className="
        fixed top-0 right-0
        left-[336px]
        max-lg:left-[280px]
        max-md:left-0
        z-40  w-auto
        bg-white
        border-b border-gray-200
        px-4  sm:px-6  lg:px-8 py-3 sm:py-4
        flex  flex-row
        items-center justify-between
        gap-3 sm:gap-4 min-h-[76px] sm:min-h-[88px]
      "
    >
      {/* _____________________ LEFT SECTION _____________________ */}
      <Box className="flex-1 min-w-0">
        <Typography
          className="
            text-[16px]!
            sm:text-[18px]!
            font-medium!
            text-gray-900!
            truncate
            sm:whitespace-nowrap
          "
        >
          {title}
        </Typography>

        <Typography
          className="
            text-[12px]! sm:text-[14px]!  text-gray-500!
            mt-1  truncate
            sm:whitespace-normal
            max-w-[180px]  sm:max-w-sm md:max-w-lg
          "
        >
          {subtitle}
        </Typography>
      </Box>

      {/* _____________________ RIGHT SECTION _____________________ */}
      <Box
        className="
          flex flex-col
          items-end justify-center
          gap-1  sm:gap-2 shrink-0
        "
      >
        {/* Help Text */}
        <Box className="flex items-center gap-1 sm:gap-2">
          <Icon
            icon="tabler:headset"
            width="16"
            height="16"
            className="text-gray-500 sm:w-[18px] sm:h-[18px]"
          />

          <Typography
            className="
              text-[10px]!
              sm:text-[12px]!
              text-gray-500!
              whitespace-nowrap
            "
          >
            Need Help?
          </Typography>
        </Box>

        {/* Contact Support */}
        <Button
          variant="outlined"
          onClick={() => navigate("/login")}
          className="
            whitespace-nowrap
            !text-[11px]
            sm:!text-[14px]
            !px-2
            sm:!px-3
            !py-1
            sm:!py-2
          "
          sx={{
            textTransform: "none",
            borderColor: "#159A9C",
            color: "#159A9C",
            minWidth: {
              xs: "105px",
              sm: "140px",
            },
            "&:hover": {
              borderColor: "#128789",
              backgroundColor: "#f0fafa",
            },
          }}
        >
          Contact Support
        </Button>
      </Box>
    </Box>
  );
};

export default FormHeader;
