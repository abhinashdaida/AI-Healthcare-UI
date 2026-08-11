import React from "react";
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
        input={
          <OutlinedInput
            startAdornment={
              startIcon ? (
                <InputAdornment position="start">
                  <Icon icon={startIcon} width={24} height={24} />
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
        <MenuItem value="">
          <em>{placeholder}</em>
        </MenuItem>

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
