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
        <Box className="mb-4 md:mb-6">

            {/* Accordion Header */}
            <button
                type="button"
                onClick={() => setExpanded(!expanded)}
                className="
                    w-full
                    flex
                    items-center
                    justify-between
                    py-2
                    md:py-3
                    text-left
                "
            >
                <h5
                    className="
                        text-sm
                        md:text-base
                        font-medium
                        text-[#0B1117]
                    "
                >
                    {title}
                </h5>

                <Icon
                    icon={
                        expanded
                            ? "tabler:chevron-up"
                            : "tabler:chevron-down"
                    }
                    width={20}
                    className="text-[#6B7280] md:w-6 md:h-6"
                />
            </button>

            {/* Accordion Content */}
            {expanded && (
                <Box className="mt-4 md:mt-6">
                    {children}
                </Box>
            )}

        </Box>
    );
};

export default ReviewAccordion;