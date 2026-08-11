import { InputLabel } from "@mui/material";
import React from "react";

const CustomLabel = ({ children, required = false }) => {
  return (
    <InputLabel
      required={required}
      sx={{
        mb: 1,
        color: "#0B1117",
        fontSize: "14px",
        fontWeight: 500,
        "& .MuiFormLabel-asterisk": { color: "red" },
      }}
    >
      {children}
    </InputLabel>
  );
};
export default CustomLabel;
