import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { CloudUploadOutlined } from "@mui/icons-material";

const Footer = ({ onSave }) => {
  return (
    <Box
      component="footer"
      className="h-[136px] border-t border-gray-200 bg-white flex items-center justify-end px-7 gap-6"
    >
      {/* Auto Save Section */}
      <Box className="flex items-center gap-2">
        <CloudUploadOutlined
          sx={{
            fontSize: 15,
            color: "#777",
          }}
        />

        <Box className="flex flex-col">
          <Typography
            variant="caption"
            className="text-[10px] text-gray-500"
          >
            Auto-Saved
          </Typography>

          <Typography
            variant="caption"
            className="text-[10px] font-medium text-gray-800"
          >
            Just now
          </Typography>
        </Box>
      </Box>

      {/* Save Button */}
      <Button
        variant="contained"
        onClick={onSave}
        className="normal-case"
        sx={{
          fontSize: "11px",
          paddingX: "20px",
          paddingY: "9px",
          borderRadius: "7px",
        }}
      >
        Save & Continue
      </Button>
    </Box>
  );
};

export default Footer;
