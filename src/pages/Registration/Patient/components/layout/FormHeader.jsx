import { Box, Button, Typography } from "@mui/material";
import { HeadphonesOutlined } from "@mui/icons-material";
import React from "react";
const FormHeader = ({ title, subtitle }) => {
  return (
    <Box
      component="header"
      className="h-[146px] w-full border-b border-gray-200 bg-white px-7 flex items-center justify-between"
    >
      {/* Left Section */}
      <Box>
        <Typography className="text-14px! font-medium! text-base! text-gray-900!">
          {title}
        </Typography>

        <Typography className="text-14px! text-xs! text-gray-500! max-w-xs mt-1">
          {subtitle}
        </Typography>
      </Box>

      {/* Right Section */}
      <Box className="flex flex-col items-end gap-1">
        {/* Help Text */}
        <Box className="flex items-center gap-1 text-[10px] text-gray-500">
          <HeadphonesOutlined sx={{ fontSize: 14 }} />
          <Typography variant="caption" className="text-[10px] text-gray-500">
            Need Help?
          </Typography>
        </Box>
        {/* Contact Support Button */}
        <Button
          variant="outlined"
          size="small"
          className="normal-case"
          sx={{
            fontSize: "11px",
            borderColor: "#159A9C",
            color: "#159A9C",
            padding: "4px 10px",
            minWidth: "auto",
            "&:hover": { borderColor: "#128789", backgroundColor: "#f0fafa" },
          }}
        >
          Contact Support
        </Button>
      </Box>
    </Box>
  );
};
export default FormHeader;
