import React from "react";
import {
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import { useField, useFormikContext } from "formik";
import { Icon } from "@iconify/react";

const CustomTextField = ({
  name,
  sx,
  startIcon,
  endIcon,
  endText,
  endSelectName,
  endSelectOptions = [],
  ...props
}) => {
  const [field, meta] = useField(name);
  const { values, setFieldValue } = useFormikContext();

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
              <Icon
                icon={startIcon}
                width={24}
                height={24}
              />
            </InputAdornment>
          ) : undefined,

          endAdornment: endSelectName ? (
            <InputAdornment
              position="end"
              sx={{
                margin: 0,
                height: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  height: "100%",
                  minWidth: "58px",
                }}
              >
                {/* Dropdown Icon */}
                <Icon
                  icon="tabler:circle-chevron-down"
                  width={24}
                  height={24}
                  style={{
                    flexShrink: 0,
                  }}
                />

                {/* Unit Dropdown */}
                <Select
                  value={values[endSelectName] || ""}
                  onChange={(event) => {
                    setFieldValue(
                      endSelectName,
                      event.target.value
                    );
                  }}
                  variant="standard"
                  disableUnderline
                  IconComponent={() => null}
                  sx={{
                    width: "24px",
                    minWidth: "24px",

                    "& .MuiSelect-select": {
                      padding: "0 !important",
                      minWidth: "24px !important",
                      width: "24px",
                      height: "19px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "14px",
                      lineHeight: "19px",
                    },
                  }}
                >
                  {endSelectOptions.map((option) => (
                    <MenuItem
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </InputAdornment>
          ) : endText ? (
            <InputAdornment
              position="end"
              sx={{
                margin: 0,
                color: "#111827",
                fontSize: "12px",
                whiteSpace: "nowrap",
              }}
            >
              {endText}
            </InputAdornment>
          ) : endIcon ? (
            <InputAdornment position="end">
              <Icon
                icon={endIcon}
                width={24}
                height={24}
              />
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