import { Box, Typography } from "@mui/material";
import React from "react";

export default function InfoRow({
  title,
  value,
}) {
  return (
    <Box  mb={2} className="w-full max-w-[416px]flex flex-col gap-14">
      <Typography
  sx={{
     // replace with actual font name
    fontWeight: 500,
    fontStyle: "normal",
    fontSize: "14px", // replace with your xs token value
    lineHeight: "100%",
    letterSpacing: "0",
    color:"#111827",
    mb:"4px"
  }}
>
  {title}
</Typography>
      <Typography sx={{
        fontWeight:400,
        fontStyle:"normal",
        fontSize:"14px",
        lineHeight:"100%",
        color:"#4B5563"
      }}>
        {value}
      </Typography>
    </Box>
  );
}