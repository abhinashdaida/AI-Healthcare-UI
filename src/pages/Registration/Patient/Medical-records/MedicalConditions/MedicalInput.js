import React, { useState } from "react";
import { Icon } from "@iconify/react";
import {
    Box,
    Chip,
    TextField,
    Paper,
    List,
    ListItem,
    ListItemButton,
} from "@mui/material";

const MedicalInput = ({
    label,
    name,
    values,
    setFieldValue,
    options,
    placeholder,
    icon,
}) => {
    const [search, setSearch] = useState("");

    const filteredOptions = options.filter(
        (item) =>
            item.toLowerCase().includes(search.toLowerCase()) &&
            !values[name]?.includes(item)
    );

    return (
        <Box className="flex flex-col">

            {/* Label */}
            <label className="text-sm font-medium text-[#111827] mb-2">
                {label}
            </label>

            {/* Selected Chips */}
            {values[name]?.length > 0 && (
                <Box className="flex flex-wrap gap-2 mb-3">
                    {values[name].map((item) => (
                        <Chip
                            key={item}
                            label={item}
                            onDelete={() =>
                                setFieldValue(
                                    name,
                                    values[name].filter(
                                        (value) => value !== item
                                    )
                                )
                            }
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
                                    borderRadius: "50%",
                                    padding: "2px",
                                    transition: "all 0.2s ease",
                                },

                                "& .MuiChip-deleteIcon:hover": {
                                    backgroundColor: "#0F766E",
                                    color: "#FFFFFF",
                                },
                            }}
                        />
                    ))}
                </Box>
            )}

            {/* Search Input */}
            <Box className="flex items-center border border-gray-300 rounded-lg px-3 h-12 bg-white">

                <Icon
                    icon={icon}
                    width={20}
                    className="text-gray-500 mr-2"
                />

                <TextField
                    variant="standard"
                    fullWidth
                    value={search}
                    placeholder={placeholder}
                    onChange={(e) => setSearch(e.target.value)}
                    InputProps={{
                        disableUnderline: true,
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
                        "& .MuiInputBase-input": {
                            padding: "8px 0",
                        },
                    }}
                />

            </Box>

            {/* Suggestions */}
            {search && filteredOptions.length > 0 && (
                <Paper
                    elevation={2}
                    className="mt-2 rounded-lg"
                >
                    <List>
                        {filteredOptions.map((item) => (
                            <ListItem
                                key={item}
                                disablePadding
                            >
                                <ListItemButton
                                    onClick={() => {
                                        setFieldValue(
                                            name,
                                            [...values[name], item]
                                        );
                                        setSearch("");
                                    }}
                                >
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

export default MedicalInput;