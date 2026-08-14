import React, { useState } from "react";
import { useField, useFormikContext } from "formik";
import { Icon } from "@iconify/react";
import {
  Box,
  Chip,
  TextField,
  Paper,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";

const ReusableChipInput = ({
  label,
  name,
  options = [],
  placeholder = "Select an option",
  icon,
  sx,
}) => {
  const [search, setSearch] = useState("");
  const [openOptions, setOpenOptions] = useState(false);

  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  const values = field.value || [];

  const filteredOptions = options.filter(
    (item) =>
      item.toLowerCase().includes(search.toLowerCase()) &&
      !values.includes(item)
  );

  const addItem = (item) => {
    setFieldValue(name, [...values, item]);
    setSearch("");
    setOpenOptions(false)
  };

  const removeItem = (item) => {
    setFieldValue(
      name,
      values.filter((value) => value !== item)
    );
  };

  return (
    <Box sx={sx}>
      {/* Label */}
      {label && (
        <Typography sx={{mb: 1,fontSize: "14px",fontWeight: 500,color: "#111827",}}>
          {label}
        </Typography>
      )}

      {/* Selected Chips */}
      {values.length > 0 && (
        <Box className="flex flex-wrap gap-2 mb-3">
          {values.map((item) => (
            <Chip
              key={item}
              label={item}
              onDelete={() => removeItem(item)}
              deleteIcon={
                <Icon
                  icon="material-symbols:close-rounded"
                  width={14}
                />
              }
              sx={{
                backgroundColor: "#E6F8F5",
                color: "#0F766E",
                borderRadius: "8px",
                "& .MuiChip-deleteIcon": {
                  color: "#0F766E",
                },
                "& .MuiChip-deleteIcon:hover": {
                  backgroundColor: "#0F766E",
                  color: "#fff",
                  borderRadius: "50%",
                },
              }}
            />
          ))}
        </Box>
      )}

      {/* Main Select Input */}
      <Box className="flex items-center border border-gray-300 rounded-lg px-3 h-14 bg-white cursor-pointer"
        onClick={() => setOpenOptions(true)}
      >
        <Icon icon={icon} width={20} className="text-gray-500 mr-2" />

        <Typography sx={{ color: values.length ? "#111827" : "#9CA3AF", fontSize: "14px", }} >
          {values.length
            ? `${values.length} selected`
            : placeholder}
        </Typography>
      </Box>

      {/* Validation Error */}
      {meta.touched && meta.error && (
        <Typography sx={{ color: "#d32f2f", fontSize: "12px", mt: 0.5, }} >
          {meta.error}
        </Typography>
      )}

      {/* Options Dropdown */}
      {openOptions && (
        <Paper elevation={3}
          sx={{  mt: 1, borderRadius: "8px", overflow: "hidden" }} >
          {/* Search Bar */}
          <Box sx={{ p: 1.5 }}>
            
            <TextField
              fullWidth
              size="small"
              autoFocus
              placeholder="Search options"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              slotProps={{
                input:{
                startAdornment: (
                  <Icon
                    icon="tabler:search"
                    width={18}
                    style={{
                      marginRight: 8,
                      color: "#6B7280",
                    }}
                  />
                ),
                  },
              }}
            />
          </Box>

          {/* Options */}
          <List sx={{ maxHeight: 200, overflowY: "auto", p: 0, }} >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((item) => (
                <ListItem key={item} disablePadding >
                  <ListItemButton onClick={() => addItem(item)} >
                    {item}
                  </ListItemButton>
                </ListItem>
              ))
            ) : (
              <Typography sx={{ p: 2, fontSize: "13px", color: "#6B7280", textAlign: "center", }} >
                No options found
              </Typography>
            )}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default ReusableChipInput;