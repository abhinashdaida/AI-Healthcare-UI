import { MenuItem, Select } from "@mui/material";

export default function SortDropdown({
  value = "best",
  onChange,
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="hidden text-sm text-gray-500 sm:block">
        Sort by:
      </span>

      <Select
        value={value}
        onChange={(event) =>
          onChange?.(event.target.value)
        }
        size="small"
        displayEmpty
        sx={{
          minWidth: 170,
          fontSize: "13px",
          backgroundColor: "#fff",

          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#e5e5e5",
          },

          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#111",
          },

          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#111",
          },
        }}
      >
        <MenuItem value="best">
          Best Selling
        </MenuItem>

        <MenuItem value="newest">
          Newest
        </MenuItem>

        <MenuItem value="price-low">
          Price: Low to High
        </MenuItem>

        <MenuItem value="price-high">
          Price: High to Low
        </MenuItem>

        <MenuItem value="rating">
          Highest Rated
        </MenuItem>
      </Select>
    </div>
  );
}