import { TextField, InputAdornment } from "@mui/material";
import { useField } from "formik";
import React from "react";
import { Icon } from "@iconify/react";

const CustomTextField = ({ name, sx, startIcon, endIcon, ...props }) => {
  const [field, meta] = useField(name);
  return (
    <TextField
      {...field}
      {...props}
      fullWidth
      size="small"
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
      slotProps={{
        input: {
          startAdornment: startIcon ? (
            <InputAdornment position="start">
              <Icon icon={startIcon} width={24} height={24} />
            </InputAdornment>
          ) : undefined,

          endAdornment: endIcon ? (
            <InputAdornment position="end">
              <Icon icon={endIcon} width={24} height={24} />
            </InputAdornment>
          ) : undefined,
        },
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          height: "56px",
          borderRadius: "10px",
          backgroundColor: "#fff",
        },
        ...sx,
      }}
    />
  );
};
export default CustomTextField;
