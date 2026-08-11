import React from "react";
import {
  TextField,
  MenuItem,
  Typography,
  InputAdornment,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { useField } from "formik";

export default function ReusableSelect({
  label,
  name,
  options = [],
  placeholder = "Select",
  startIcon,
  disabled = false,
  onChange,
  sx,
  ...props
}) {
  const [field, meta, helpers] = useField(name);

  const handleChange = (e) => {
    helpers.setValue(e.target.value);

    if (onChange) {
      onChange(e);
    }
  };

  return (
    <>
      {label && (
        <Typography
          sx={{
            mb: 1,
            fontSize: "14px",
            fontWeight: 500,
            color: "#111827",
          }}
        >
          {label}
        </Typography>
      )}

      <TextField
  select
  fullWidth
  size="small"
  {...field}
  {...props}
  value={field.value || ""}
  onChange={handleChange}
  error={meta.touched && Boolean(meta.error)}
  helperText={meta.touched && meta.error}
  disabled={disabled}
  slotProps={{
    select: {
      displayEmpty: true,
      renderValue: (selected) => {
        if (!selected) {
          return (
            <span style={{ color: "#9CA3AF" }}>
              {placeholder}
            </span>
          );
        }

        const selectedOption = options.find(
          (option) =>
            (option.value || option) === selected
        );

        return selectedOption?.label || selectedOption || selected;
      },
    },
    input: {
      startAdornment: startIcon ? (
        <InputAdornment position="start">
          <Icon
            icon={startIcon}
            width={18}
            color="#9CA3AF"
          />
        </InputAdornment>
      ) : undefined,
    },
  }}
  sx={{
    "& .MuiOutlinedInput-root": {
      height: 56,
      borderRadius: "8px",
    },
    ...sx,
  }}
>
  <MenuItem value="" disabled>
    {placeholder}
  </MenuItem>

  {options.map((option) => (
    <MenuItem
      key={option.value || option}
      value={option.value || option}
    >
      {option.label || option}
    </MenuItem>
  ))}
</TextField>
    </>
  );
}