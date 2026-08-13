import { TextField, InputLabel,Typography, InputAdornment, IconButton } from "@mui/material";
import { Icon } from "@iconify/react";
import { useField } from "formik";
import React from "react";

export default function ReusableInput({
  label,
  required=false,
  name,
  sx,
  startIcon,
  endIcon,
  onEndIconClick,
  ...props
}) {
    const [field,meta]=useField(name);
  return (
    <>
      <InputLabel 
      required={required}
        sx={{
          mb: 1,
          fontSize: "14px",
          fontWeight: 500,
          color: "#111827","& .MuiFormLabel-asterisk":{color:"red"}
        }}
      >
        {label}
      </InputLabel>

      <TextField
        fullWidth
       {...field}
       {...props}
       size="small"
       error={meta.touched && Boolean(meta.error)}
        helperText={meta.touched && meta.error}
        slotProps={{
          input: {
            startAdornment: startIcon && (
              <InputAdornment position="start">
                <Icon icon={startIcon} width={18} color="#9CA3AF" />
              </InputAdornment>
            ),

            endAdornment: endIcon ? (
              <InputAdornment position="end">
                <IconButton type="button" size="small" onClick={onEndIconClick}>
                  <Icon icon={endIcon} width={18} color="#9CA3AF" />
                </IconButton>
              </InputAdornment>
            ):null,
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            height: 56,
            borderRadius: "8px",
          },
          ...sx,
        }}
      />
    </>
  );
}