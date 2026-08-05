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
        w-full
        bg-white
        border-b border-gray-200
        px-4 sm:px-6 lg:px-8 py-4
        flex flex-col sm:flex-row sm:items-center
        justify-between gap-4 "
    >
      {/* Left Section */}
      <Box className="flex-1">
        <Typography className="text-[18px]! font-medium! text-gray-900!">
          {title}
        </Typography>

        <Typography className="text-[14px]! text-gray-500! mt-1 max-w-sm">
          {subtitle}
        </Typography>
      </Box>

      {/* Right Section */}
      <Box
        className="
          flex flex-col
          items-start
          sm:items-end
          gap-2 "
      >
        {/* Help Text */}
        <Box className="flex items-center gap-2">
          <Icon
            icon="tabler:headset"
            width="18"
            height="18"
            className="text-gray-500"
          />

          <Typography className="text-[12px]! text-gray-500!">
            Need Help?
          </Typography>
        </Box>

        {/* Button */}
        <Button
          variant="outlined"
          onClick={() => navigate("/login")}
          sx={{
            textTransform: "none",
            fontSize: "14px",
            borderColor: "#159A9C",
            color: "#159A9C",
            px: 0.5,
            py: 0.8,
            minWidth: "140px",
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
