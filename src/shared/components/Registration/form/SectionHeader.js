import { Box, Typography } from "@mui/material";
import React from "react";

const SectionHeader = ({
    title,
    subtitle,
    maxWidth = "328px",
}) => {
    return (
        <Box
            className="w-full flex flex-col gap-2"
            sx={{
                maxWidth,
            }}
        >
            <Typography
                sx={{
                    color: "#0B1117",
                    fontWeight: 500,
                    fontSize: "14px",
                    lineHeight: 1,
                }}
            >
                {title}
            </Typography>

            <Typography
                sx={{
                    fontSize: "12px",
                    fontWeight: 400,
                    color: "#4B5563",
                    lineHeight: 1,
                }}
            >
                {subtitle}
            </Typography>
        </Box>
    );
};

export default SectionHeader;