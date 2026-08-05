import React, { useState } from "react";
import { Box } from "@mui/material";
import { Icon } from "@iconify/react";

const ReviewAccordion = ({
    title,
    children,
    defaultExpanded = false,
}) => {
    const [expanded, setExpanded] = useState(defaultExpanded);

    return (
        <Box className="mb-6">

            {/* Accordion Header */}
            <button
                type="button"
                onClick={() => setExpanded(!expanded)}
                className="w-full flex items-center justify-between py-2 text-left"
            >
                <h2 className="text-lg font-semibold text-[#111827]">
                    {title}
                </h2>

                <Icon
                    icon={
                        expanded
                            ? "tabler:chevron-up"
                            : "tabler:chevron-down"
                    }
                    width={20}
                    className="text-[#6B7280]"
                />
            </button>

            {/* Accordion Content */}
            {expanded && (
                <Box className="mt-6">
                    {children}
                </Box>
            )}

        </Box>
    );
};

export default ReviewAccordion;