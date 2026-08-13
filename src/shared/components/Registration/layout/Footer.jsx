import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Icon } from "@iconify/react";

const Footer = ({ config = {} }) => {
  const {
    primaryButtonLabel = "Save & Continue",
    onPrimaryClick,
    primaryButtonDisabled = false,
    showSkipButton = false,
    onSkipClick,
    onAutoSaveClick,
    skipButtonDisabled = false,
  } = config;

  return (
    <Box
      component="footer"
      className=" fixed
        bottom-0 right-0
        left-[336px] max-lg:left-[280px] max-md:left-0 z-40
        bg-white border-t border-gray-200
        px-4 sm:px-6 lg:px-7
        py-4
        flex flex-col sm:flex-row
        gap-4 sm:gap-0
        items-stretch sm:items-center justify-between
      "
    >
      {/* ================= LEFT SIDE ================= */}
      <Box className="w-full sm:w-auto">
        {showSkipButton && (
          <Button
            fullWidth
            variant="outlined"
            onClick={onSkipClick}
            disabled={skipButtonDisabled}
            sx={{
              textTransform: "none",
              borderColor: "#248B8F",
              color: "#175A5D",
              borderRadius: "8px",
              px: 2,
              py: 1.2,

              "&:hover": {
                borderColor: "#128789",
                backgroundColor: "#F3FCFC",
              },

              "&.Mui-disabled": {
                backgroundColor: "#D1D5DB",
                color: "#9CA3AF",
              },

              "@media (min-width:600px)": {
                width: "auto",
              },
            }}
          >
            Skip for now
          </Button>
        )}
      </Box>

      {/* ================= RIGHT SIDE ================= */}
      <Box
        className=" flex flex-col sm:flex-row
          items-stretch
          gap-3 sm:gap-6
          w-full sm:w-auto
        "
      >
        {/* AUTO SAVE */}
        <Button
          variant="text"
          disableRipple
          onClick={onAutoSaveClick}
          startIcon={<Icon icon="tabler:cloud-upload" width="20" height="20" />}
          sx={{
            width: "100%",
            textTransform: "none",
            minWidth: "auto",
            padding: 0.8,
            color: "#374151",
            display: "flex",
            alignItems: "center",

            "@media (min-width:600px)": {
              width: "auto",
            },

            "&:hover": {
              backgroundColor: "#F1F5F9",
            },
          }}
        >
          <Box className="flex flex-col items-start">
            <Typography className="text-[14px]! text-gray-500!">
              Auto-Saved
            </Typography>

            <Typography className="text-[14px]! font-medium! text-gray-900!">
              Just now
            </Typography>
          </Box>
        </Button>

        {/* SAVE BUTTON */}
        <Button
          variant="contained"
          onClick={onPrimaryClick}
          disabled={primaryButtonDisabled}
          sx={{
            width: "100%",
            textTransform: "none",
            backgroundColor: "#248B8F",
            borderRadius: "8px",
            px: 2,
            py: 1.2,
            fontSize: "14px",

            "@media (min-width:600px)": {
              width: "auto",
            },

            "&:hover": {
              backgroundColor: "#128789",
            },

            "&.Mui-disabled": {
              backgroundColor: "#D1D5DB",
              color: "#9CA3AF",
            },
          }}
        >
          {primaryButtonLabel}
        </Button>
      </Box>
    </Box>
  );
};

export default Footer;
