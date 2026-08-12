

import React from "react";
import { useMemo, useState } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import { useField } from "formik";
import { Icon } from "@iconify/react";

const CustomSelect = ({
  name,
  options = [],
  placeholder,
  startIcon,
  endIcon,
  sx,
  ...props
}) => {
  const [field, meta] = useField(name);


  return (
    <FormControl
      fullWidth
      size="small"
      error={meta.touched && Boolean(meta.error)}
    >
      <Select
        {...field}
        {...props}
        displayEmpty
        // Remove default MUI dropdown arrow
        IconComponent={() => null}
        input={
          <OutlinedInput
            startAdornment={
              startIcon ? (
                <InputAdornment position="start">
                  <Icon icon={startIcon} width={24} height={24} />
                </InputAdornment>
              ) : undefined
            }
            endAdornment={
              endIcon ? (
                <InputAdornment position="end">
                  <Icon icon={endIcon} width={24} height={24} />
                </InputAdornment>
              ) : undefined
            }
          />
        }
        sx={{
          height: "56px",
          borderRadius: "10px",
          backgroundColor: "#fff",

          "& .MuiOutlinedInput-notchedOutline": {
            borderRadius: "10px",
          },
          // Dropdown options
          "& .MuiMenuItem-root": {
            minHeight: "51px",
            padding: "10px 16px",
          },
          ...sx,
        }}
        renderValue={(selected) => {
          if (!selected) {
            return <span style={{ color: "#9CA3AF" }}>{placeholder}</span>;
          }

          const selectedOption = options.find(
            (option) => (option.value ?? option) === selected,
          );

          return selectedOption?.label ?? selected;
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.value ?? option} value={option.value ?? option}>
            {option.label ?? option}
          </MenuItem>
        ))}
      </Select>

      {meta.touched && meta.error && (
        <FormHelperText>{meta.error}</FormHelperText>
      )}
    </FormControl>
  );
};

export default CustomSelect;