import React, { useState, useRef, useEffect } from "react";
import { Container } from "@mui/material";
import { Icon } from "@iconify/react";
import { SEARCH_LOCATIONS as locations, POPULAR_SEARCHES as popularSearches } from "../../../../shared/constants/landingPage";
 
const SearchCompound = () => {
 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);
 
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
 
  return (
    <div className="w-full mx-auto p-4">
      <Container maxWidth="lg">
        {/* Search Bar Container */}
        <div className="bg-white border border-[#D0D0D0] rounded-xl shadow-sm p-3 md:p-4 mb-6">
          <div className="flex flex-col md:flex-row items-center gap-3">
 
            {/* Location Selector with Dropdown */}
            <div className="relative w-full md:w-1/4" ref={dropdownRef}>
              <div
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="flex items-center w-full border border-[#D0D0D0] rounded-lg px-3 py-2.5 bg-white cursor-pointer hover:border-[#0D8B72] hover:bg-gray-50 transition-all duration-200 select-none"
              >
                <Icon
                  icon="famicons:location-outline"
                  width="24"
                  height="24"
                  className={`mr-2 flex-shrink-0 transition-colors duration-200 ${
                    selectedLocation ? "text-[#0D8B72]" : "text-gray-400"
                  }`}
                />
                <span
                  className={`text-sm flex-grow truncate transition-colors duration-200 ${
                    selectedLocation ? "text-[#202020] font-medium" : "text-[#4D4D4D]"
                  }`}
                >
                  {selectedLocation || "Select Location"}
                </span>
                <Icon
                  icon="iconamoon:arrow-down-2-light"
                  width="24"
                  height="24"
                  className={`ml-1 text-gray-400 transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
 
              {/* Dropdown List */}
              {isDropdownOpen && (
                <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-[#D0D0D0] rounded-lg shadow-lg overflow-hidden animate-fadeIn">
                  <ul className="max-h-52 overflow-y-auto py-1">
                    {locations.map((loc, i) => (
                      <li
                        key={i}
                        onClick={() => {
                          setSelectedLocation(loc);
                          setIsDropdownOpen(false);
                        }}
                        className={`flex items-center gap-2 px-4 py-2.5 text-sm cursor-pointer transition-colors duration-150 ${
                          selectedLocation === loc
                            ? "bg-[#E6F5F1] text-[#0D8B72] font-medium"
                            : "text-[#4D4D4D] hover:bg-[#F0FAF7] hover:text-[#0D8B72]"
                        }`}
                      >
                        <Icon
                          icon="famicons:location-outline"
                          width="16"
                          height="16"
                          className="flex-shrink-0"
                        />
                        {loc}
                        {selectedLocation === loc && (
                          <Icon
                            icon="iconamoon:check-circle-1-light"
                            width="16"
                            height="16"
                            className="ml-auto text-[#0D8B72]"
                          />
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
 
            {/* Divider */}
            <div className="hidden md:block w-px h-8 bg-[#D0D0D0] flex-shrink-0" />
 
            {/* Search Input */}
            <div className="relative flex items-center flex-grow w-full border border-[#D0D0D0] rounded-lg px-3 py-2.5 bg-white hover:border-[#0D8B72] focus-within:border-[#0D8B72] focus-within:ring-2 focus-within:ring-[#0D8B72]/10 transition-all duration-200">
              <Icon
                icon="iconamoon:search-light"
                width="24"
                height="24"
                className="text-gray-400 mr-2 flex-shrink-0"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Doctors, Specialities, Clinics and Hospitals..."
                className="w-full text-sm outline-none bg-transparent text-gray-700 placeholder-gray-400 cursor-text"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="ml-2 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors duration-150"
                >
                  <Icon icon="iconamoon:close-circle-1-light" width="20" height="20" />
                </button>
              )}
            </div>
 
            {/* Search Button */}
            <button className="w-full md:w-auto bg-[#0D8B72] hover:bg-[#0c725a] active:bg-[#0a5e4a] text-white font-medium py-2.5 px-8 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer flex items-center justify-center gap-2 select-none">
       
              Search
            </button>
          </div>
        </div>
 
        {/* Popular Searches Section */}
        <div className="flex flex-wrap items-center gap-3 px-1">
          <span className="text-[#202020] font-semibold text-[13px] whitespace-nowrap">
            Popular Searches:
          </span>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((item, index) => (
              <button
                key={index}
                onClick={() => setSearchQuery(item)}
                className="px-4 py-1.5 border border-[#D0D0D0] bg-[#FBFBFB] hover:bg-[#0D8B72] hover:text-white hover:border-[#0D8B72] text-gray-500 text-[12px] rounded-full transition-all duration-200 cursor-pointer hover:shadow-sm active:scale-95 select-none"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};
 
export default SearchCompound;