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
  placeholder,
  icon,
  sx,
}) => {
  const [search, setSearch] = useState("");

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
  };

  const removeItem = (item) => {
    setFieldValue(
      name,
      values.filter((value) => value !== item)
    );
  };

  return (
    <Box sx={sx}>
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

      <Box className="flex items-center border border-gray-300 rounded-lg px-3 h-14 bg-white">
        <Icon
          icon={icon}
          width={20}
          className="text-gray-500 mr-2"
        />

        <TextField
          fullWidth
          variant="standard"
          value={search}
          placeholder={placeholder}
          onChange={(e) => setSearch(e.target.value)}
          error={meta.touched && Boolean(meta.error)}
          helperText={meta.touched && meta.error}
          slotProps={{
            input: {
              disableUnderline: true,
            },
          }}
          sx={{
            "& .MuiInput-root:before": {
              borderBottom: "none !important",
            },
            "& .MuiInput-root:after": {
              borderBottom: "none !important",
            },
            "& .MuiInput-root:hover:not(.Mui-disabled):before": {
              borderBottom: "none !important",
            },
          }}
        />
      </Box>

      {search && filteredOptions.length > 0 && (
        <Paper elevation={2} className="mt-2 rounded-lg">
          <List>
            {filteredOptions.map((item) => (
              <ListItem key={item} disablePadding>
                <ListItemButton onClick={() => addItem(item)}>
                  {item}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default ReusableChipInput;