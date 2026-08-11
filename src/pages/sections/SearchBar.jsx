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

const CustomChevronIcon = (props) => (
  <Icon
    icon="lucide:chevron-down"
    width={15}
    height={15}
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

  const fieldSx = {
    height: 50,
    borderRadius: "10px",

    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#D5D5D5",
    },

    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#D5D5D5",
    },

    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#D5D5D5",
    },
  };

  return (
    <Box
      className="
        mx-auto
        flex
        w-full
        max-w-[1140px]
        flex-col
        gap-2.5
        px-2
        pt-4
        sm:px-5
        sm:pt-7
        lg:px-0
        lg:pt-8
      "
    >
      {/* Search */}
      <Box
        className="
          flex
          w-full
          items-center
          gap-2
          rounded-[10px]
          border
          border-[#D9D9D9]
          bg-white
          p-2
          max-md:flex-col
        "
      >
        {/* Location */}
        <Select
          value={location}
          displayEmpty
          onChange={(e) => setLocation(e.target.value)}
          IconComponent={CustomChevronIcon}
          startAdornment={
            <InputAdornment position="start">
              <Icon
                icon="lucide:map-pin"
                width={17}
                height={17}
                color="#777777"
              />
            </InputAdornment>
          }
          renderValue={(selected) =>
            selected || "Select Location"
          }
          className="
            w-[210px]
            shrink-0
            max-md:w-full
          "
          sx={{
            ...fieldSx,

            "& .MuiSelect-select": {
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "14px",
              fontWeight: 500,
              color: "#555",
              paddingLeft: "9px",
              paddingRight: "30px",
            },

            "& .MuiSelect-icon": {
              right: "9px",
              color: "#777",
            },
          }}
        >
          {LOCATIONS.map((city) => (
            <MenuItem key={city} value={city}>
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
          className="min-w-0 flex-1"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Icon
                    icon="lucide:search"
                    width={19}
                    height={19}
                    color="#777777"
                  />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            ...fieldSx,

            "& .MuiOutlinedInput-root": {
              ...fieldSx,
              width: "100%",
              fontSize: "14px",
            },

            "& input::placeholder": {
              color: "#666",
              opacity: 1,
            },
          }}
        />

        {/* Search Button */}
        <Button
          onClick={handleSearch}
          className="
            h-[50px]
            w-[118px]
            shrink-0
            rounded-[10px]
            max-md:w-full
          "
          sx={{
            height: 50,
            width: 118,
            borderRadius: "10px",
            background: "#0F9D8A",
            color: "#fff",
            textTransform: "none",
            fontWeight: 600,
            fontSize: "15px",
            boxShadow: "0 2px 6px rgba(15,157,138,.14)",

            "&:hover": {
              background: "#0C8878",
            },
          }}
        >
          Search
        </Button>
      </Box>

      {/* Popular Searches */}
      <Box
        className="
          flex
          w-full
          items-center
          gap-2.5

          max-md:flex-col
          max-md:items-start
          max-md:gap-2
        "
      >
        {/* Label */}
        <span
          className="
            shrink-0
            whitespace-nowrap
            text-[13px]
            font-semibold
            text-[#202020]
            sm:text-[14px]
          "
        >
          Popular Searches:
        </span>

        {/* Chips */}
        <Box
          className="
            flex
            min-w-0
            items-center
            gap-2.5
            overflow-x-auto
            scrollbar-hide

            max-md:w-full
            max-md:flex-col
            max-md:items-start
            max-md:gap-2
            max-md:overflow-visible

            sm:flex-row
            sm:flex-wrap
          "
        >
          {popularSearches.map((item) => (
            <Button
              key={item}
              onClick={() => setSearch(item)}
              sx={{
                minWidth: "auto",
                width: "auto",
                height: 34,
                px: "14px",
                borderRadius: "999px",
                background: "#FAFAFA",
                color: "#666",
                border: "1px solid #E1E1E1",
                textTransform: "none",
                fontSize: "13px",
                fontWeight: 500,
                whiteSpace: "nowrap",
                flexShrink: 0,
                justifyContent: "center",

                "&:hover": {
                  background: "#FAFAFA",
                  borderColor: "#0F9D8A",
                  color: "#0F9D8A",
                },

                /* Mobile */
                "@media (max-width: 767px)": {
                  width: "180px",
                  minWidth: "180px",
                  height: 34,
                  fontSize: "13px",
                  paddingLeft: "14px",
                  paddingRight: "14px",
                },

                /* Tablet */
                "@media (min-width: 768px) and (max-width: 1023px)": {
                  height: 32,
                  fontSize: "12px",
                  paddingLeft: "12px",
                  paddingRight: "12px",
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