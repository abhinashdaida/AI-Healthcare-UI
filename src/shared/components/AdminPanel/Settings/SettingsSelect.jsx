import React from "react";
import { TextField, MenuItem } from "@mui/material";

const SettingsSelect = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  options = [],
  error,
  helperText,
}) => {
  return (
    <TextField
      fullWidth
      select
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      helperText={helperText}
      variant="outlined"
      className="bg-white"
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "8px",
        },
      }}
    >
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SettingsSelect;