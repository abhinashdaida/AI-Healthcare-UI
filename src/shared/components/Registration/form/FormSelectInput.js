import React, { useState } from "react";
import {
  TextField, InputLabel,
  MenuItem,
  Typography,
  InputAdornment,
  Box,
  Select,
  OutlinedInput,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { useField } from "formik";

export default function ReusableSelect({
  label, required = false,
  name,
  options = [],
  placeholder = "Select",
  startIcon, endIcon,
  disabled = false,
  onChange,
  sx,
  ...props
}) {
  const [field, meta, helpers] = useField(name);
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    helpers.setValue(e.target.value);
    setSearch("");
    if (onChange) {
      onChange(e);
    }
  };

  const filteredOptions = options.filter((option) => {
    const label = option.label || option;
    return label.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <>
      {label && (
        <InputLabel
          required={required}
          sx={{
            mb: 1,
            fontSize: "14px",
            fontWeight: 500,
            color: "#111827", "& .MuiFormLabel-asterisk": { color: "red" }
          }}
        >
          {label}
        </InputLabel>
      )}

      <Select
        fullWidth
        size="small"
        {...field}
        {...props}
        value={field.value || ""}
        onChange={handleChange}
        error={meta.touched && Boolean(meta.error)}

        disabled={disabled}
        displayEmpty
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
          "& .MuiOutlinedInput-root": {
            height: 56,
            borderRadius: "8px",
          },
          "& .MuiSelect-icon": {
            display: "none",
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
        {/* Search bar */}
        <Box
          sx={{
            p: 1,
            position: "sticky",
            top: 0,
            backgroundColor: "#fff",
            zIndex: 1,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <TextField
            fullWidth
            size="small"
            placeholder="Search options"
            value={search}
            autoFocus
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon
                      icon="tabler:search"
                      width={18}
                      color="#9CA3AF"
                    />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>

        {/* Placeholder */}
        <MenuItem value="" disabled>
          {placeholder}
        </MenuItem>

        {/* Filtered options */}
        {filteredOptions.length > 0 ? (
          filteredOptions.map((option) => (
            <MenuItem
              key={option.value || option}
              value={option.value || option}
            >
              {option.label || option}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>
            No options found
          </MenuItem>
        )}
      </Select>
    </>
  );
}