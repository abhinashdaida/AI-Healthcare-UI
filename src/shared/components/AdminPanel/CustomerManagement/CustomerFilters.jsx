import React from "react";

import {
    Button,
    InputAdornment,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";

import { Icon } from "@iconify/react";

const CustomerFilters = ({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  onClear,
}) => {
  const hasFilter = search.trim() !== "" || statusFilter !== "All";

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Search */}

      <TextField
        size="small"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search customer..."
        className="w-[320px]"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon icon="lucide:search" width={18} className="text-gray-400" />
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "7px",
            fontSize: "13px",
            backgroundColor: "#FFFFFF",
          },
        }}
      />

      {/* Filter */}

      <div className="flex items-center gap-2">
        <Icon icon="lucide:filter" width={18} className="text-gray-500" />

        <Select
          size="small"
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          sx={{
            minWidth: 150,
            borderRadius: "7px",
            fontSize: "13px",
            backgroundColor: "#FFFFFF",
          }}
        >
          <MenuItem value="All">All Status</MenuItem>

          <MenuItem value="Active">Active</MenuItem>

          <MenuItem value="Blocked">Blocked</MenuItem>
        </Select>
      </div>

      {/* Clear */}

      {hasFilter && (
        <Button
          onClick={onClear}
          startIcon={<Icon icon="lucide:x" width={16} />}
          sx={{
            color: "#7B0FB5",
            textTransform: "none",
            fontSize: "13px",
          }}
        >
          Clear
        </Button>
      )}
    </div>
  );
};

export default CustomerFilters;
