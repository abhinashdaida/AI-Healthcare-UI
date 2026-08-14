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
      className="
        fixed
        bottom-0  right-0 left-[336px]
        max-lg:left-[280px] max-md:left-0
        z-40
        bg-white border-t  border-gray-200
        px-3  sm:px-5  lg:px-7
        py-3  sm:py-4
        flex  flex-row
        items-center  justify-between
        gap-2 sm:gap-4
        min-h-[68px] sm:min-h-[80px]
      "
    >
      {/* _____________________  LEFT SIDE - SKIP BUTTON  _____________________ */}
      <Box className="shrink-0">
        {showSkipButton && (
          <Button
            variant="outlined"
            onClick={onSkipClick}
            disabled={skipButtonDisabled}
            sx={{
              textTransform: "none",
              borderColor: "#248B8F",
              color: "#175A5D",
              borderRadius: "8px",
              px: {
                xs: 1.5,
                sm: 2,
              },
              py: {
                xs: 0.8,
                sm: 1.2,
              },
              fontSize: {
                xs: "12px",
                sm: "14px",
              },
              whiteSpace: "nowrap",
              "&:hover": {
                borderColor: "#128789",
                backgroundColor: "#F3FCFC",
              },
              "&.Mui-disabled": {
                backgroundColor: "#D1D5DB",
                color: "#9CA3AF",
                borderColor: "#D1D5DB",
              },
            }}
          >
            Skip for now
          </Button>
        )}
      </Box>

      {/* _____________________  RIGHT SIDE   _____________________ */}
      <Box
        className="
          flex flex-row
          items-center  justify-end
          gap-2  sm:gap-4   lg:gap-6
          shrink-0
        "
      >
        {/* _____________________  AUTO SAVE  _____________________ */}
        <Button
          variant="text"
          disableRipple
          onClick={onAutoSaveClick}
          startIcon={<Icon icon="tabler:cloud-upload" width="18" height="18" />}
          sx={{
            textTransform: "none",
            minWidth: "auto",
            padding: {
              xs: "4px",
              sm: "6px 8px",
            },
            color: "#374151",
            display: "flex",
            alignItems: "center",
            "&:hover": {
              backgroundColor: "#F1F5F9",
            },
            "& .MuiButton-startIcon": {
              marginRight: {
                xs: "4px",
                sm: "8px",
              },
              marginLeft: 0,
            },
          }}
        >
          <Box className="flex flex-col items-start">
            <Typography
              className="
                text-[10px]!  sm:text-[12px]! lg:text-[14px]!  text-gray-500! leading-tight  "
            >
              Auto-Saved
            </Typography>

            <Typography className="  text-[10px]!   sm:text-[12px]! lg:text-[14px]!  font-medium!  text-gray-900! leading-tight ">
              Just now
            </Typography>
          </Box>
        </Button>

        {/* _____________________   SAVE BUTTON    _____________________ */}
        <Button
          variant="contained"
          onClick={onPrimaryClick}
          disabled={primaryButtonDisabled}
          sx={{
            textTransform: "none",
            backgroundColor: "#248B8F",
            borderRadius: "8px",
            px: {
              xs: 1.5,
              sm: 2,
            },
            py: {
              xs: 0.9,
              sm: 1.2,
            },
            fontSize: {
              xs: "12px",
              sm: "14px",
            },
            minWidth: {
              xs: "105px",
              sm: "130px",
            },
            whiteSpace: "nowrap",
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
