import React, { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  InputAdornment,
} from "@mui/material";
import { Icon } from "@iconify/react";

import {
  LOCATIONS,
  POPULAR_SEARCHES,
} from "../../shared/constants/landingPage";

// Custom Select Icon
const CustomChevronIcon = (props) => (
  <Icon
    icon="lucide:chevron-down"
    width={16}
    {...props}
  />
);

const SearchBar = () => {
  const [location, setLocation] = useState("");
  const [search, setSearch] = useState("");
  const [popularSearches, setPopularSearches] =
    useState(POPULAR_SEARCHES);

  const handleSearch = () => {
    const value = search.trim();

    if (!value) return;

    if (!popularSearches.includes(value)) {
      setPopularSearches([...popularSearches, value]);
    }

    setSearch("");
  };

  return (
    <Box
      className="
        w-full
        max-w-[1140px]
        mx-auto
        px-4
        sm:px-6
        lg:px-8
      "
    >
      {/* =========================================================
          SEARCH CONTROLS
      ========================================================= */}
      <Box
        className="
          w-full
          flex
          flex-col
          sm:flex-row
          items-stretch
          gap-3

          sm:items-center

          lg:gap-3
        "
      >
        {/* =======================================================
            LOCATION
        ======================================================= */}
        <Select
          value={location}
          displayEmpty
          onChange={(e) => setLocation(e.target.value)}
          IconComponent={CustomChevronIcon}
          renderValue={(selected) =>
            selected || "Select Location"
          }
          className="
            w-full
            sm:w-[180px]
            md:w-[190px]
            lg:w-[190px]
            shrink-0
          "
          sx={{
            height: 46,
            borderRadius: "12px",
            backgroundColor: "#FFFFFF",

            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#E5E7EB",
            },

            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#D1D5DB",
            },

            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#0F9D8A",
            },

            "& .MuiSelect-select": {
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "14px",
              color: "#374151",
              paddingLeft: "42px",
              paddingRight: "38px",
            },

            "& .MuiSelect-icon": {
              color: "#6B7280",
              right: "12px",
              top: "calc(50% - 8px)",
            },
          }}
          startAdornment={
            <InputAdornment
              position="start"
              sx={{
                position: "absolute",
                left: "14px",
                pointerEvents: "none",
              }}
            >
              <Icon
                icon="famicons:location-outline"
                width={18}
                color="#6B7280"
              />
            </InputAdornment>
          }
        >
          {LOCATIONS.map((city) => (
            <MenuItem
              key={city}
              value={city}
            >
              {city}
            </MenuItem>
          ))}
        </Select>

        {/* =======================================================
            SEARCH INPUT
        ======================================================= */}
        <TextField
          fullWidth
          placeholder="Search Doctors, Specialities, Clinics and Hospitals..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full
            sm:flex-1
            min-w-0
          "
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Icon
                    icon="iconamoon:search-light"
                    width={20}
                    color="#9CA3AF"
                  />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              height: 46,
              borderRadius: "12px",
              width: "100%",
              backgroundColor: "#FFFFFF",
            },

            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#E5E7EB",
            },

            "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#D1D5DB",
              },

            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "#0F9D8A",
              },

            "& input": {
              fontSize: "14px",
              minWidth: 0,
              textOverflow: "ellipsis",
            },

            "& input::placeholder": {
              color: "#9CA3AF",
              opacity: 1,
            },
          }}
        />

        {/* =======================================================
            SEARCH BUTTON
        ======================================================= */}
        <Button
          onClick={handleSearch}
          className="
            w-full
            sm:w-[110px]
            md:w-[115px]
            lg:w-[120px]
            shrink-0
          "
          sx={{
            height: 46,
            minWidth: 0,
            borderRadius: "12px",
            background: "#0F9D8A",
            color: "#FFFFFF",
            textTransform: "none",
            fontWeight: 600,
            fontSize: "15px",
            whiteSpace: "nowrap",
            flexShrink: 0,

            "&:hover": {
              background: "#0C8878",
            },
          }}
        >
          Search
        </Button>
      </Box>

      {/* =========================================================
          POPULAR SEARCHES
      ========================================================= */}
      <Box
        className="
          flex
          flex-col
          sm:flex-row
          sm:items-start
          lg:items-center

          gap-2
          sm:gap-3

          mt-4
          sm:mt-3
        "
      >
        {/* Label */}
        <span
          className="
            text-[13px]
            sm:text-[14px]
            font-medium
            text-[#111827]
            whitespace-nowrap
            shrink-0
          "
        >
          Popular Searches:
        </span>

        {/* Search Tags */}
        <Box
          className="
            flex
            flex-wrap
            gap-2
            w-full
            min-w-0
          "
        >
          {popularSearches.map((item) => (
            <Button
              key={item}
              onClick={() => setSearch(item)}
              sx={{
                minWidth: "auto",
                height: 30,
                px: 2,
                borderRadius: "999px",
                background: "#F9FAFB",
                color: "#6B7280",
                border: "1px solid #E5E7EB",
                textTransform: "none",
                fontSize: "12px",
                lineHeight: 1,
                whiteSpace: "nowrap",

                "&:hover": {
                  background: "#F3F4F6",
                  borderColor: "#D1D5DB",
                },
              }}
            >
              {item}
            </Button>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default SearchBar;