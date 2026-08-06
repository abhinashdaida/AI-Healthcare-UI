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
    <Box className="w-full max-w-[1140px] mx-auto pt-8 md:pt-10 px-4 sm:px-5 lg:px-0 flex flex-col gap-5 md:gap-6 box-border">
      {/* Search Container */}
      <Box
        className="
          w-full
          border
          border-[#E5E7EB]
          rounded-2xl
          bg-white
          flex
          flex-col
          lg:flex-row
          items-stretch
          lg:items-center
          p-3
          lg:p-2
          gap-3
          shadow-[0_2px_10px_rgba(0,0,0,0.04)]
        "
      >
        {/* Location */}
        <Select
          value={location}
          displayEmpty
          onChange={(e) => setLocation(e.target.value)}
          IconComponent={CustomChevronIcon}
          renderValue={(selected) =>
            selected || "Select Location"
          }
          className="w-full lg:w-[190px]"
          sx={{
            height: 46,
            borderRadius: "12px",

            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#E5E7EB",
            },

            "& .MuiSelect-select": {
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "14px",
            },

            "& .MuiSelect-icon": {
              color: "#6B7280",
              right: "12px",
              top: "calc(50% - 8px)",
            },
          }}
          startAdornment={
            <InputAdornment position="start">
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

        {/* Search Input */}
        <TextField
          fullWidth
          placeholder="Search Doctors, Specialities, Clinics and Hospitals..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
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
            },
          }}
        />

        {/* Search Button */}
        <Button
          onClick={handleSearch}
          className="w-full lg:w-[120px]"
          sx={{
            height: 46,
            borderRadius: "12px",
            background: "#0F9D8A",
            color: "#fff",
            textTransform: "none",
            fontWeight: 600,
            fontSize: "15px",
            flexShrink: 0,

            "&:hover": {
              background: "#0C8878",
            },
          }}
        >
          Search
        </Button>
      </Box>

      {/* Popular Searches */}
      <Box className="flex flex-col lg:flex-row items-start lg:items-center gap-3">
        <span className="text-[14px] font-medium text-[#111827] whitespace-nowrap">
          Popular Searches:
        </span>

        <Box className="flex flex-wrap gap-2 w-full">
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

                "&:hover": {
                  background: "#F3F4F6",
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