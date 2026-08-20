import React from "react";
import { TextField } from "@mui/material";

const SettingsInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  onBlur,
  placeholder = "",
  error,
  helperText,
}) => {
  return (
    <TextField
      fullWidth
      label={label}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      error={error}
      helperText={helperText}
      variant="outlined"
      className="bg-white"
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "8px",
        },
      }}
    />
  );
};

export default SettingsInput;