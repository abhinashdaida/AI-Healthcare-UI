import React from "react";
import { Box } from "@mui/material";

const SuggestedIdCard = ({
    id,
    selected,
    onClick,
}) => {
    return (
        <Box
            onClick={onClick}
            className={`
                min-w-[120px]
                px-5
                h-[40px]
                rounded-lg
                border
                flex
                items-center
                justify-center
                cursor-pointer
                transition-all
                duration-200
                ${
                    selected
                        ? "border-[#2BA39A] bg-[#ECFEFF]"
                        : "border-[#E5E7EB] bg-white hover:border-[#2BA39A]"
                }
            `}
        >
            <span
                className={`
                    text-[13px]
                    font-medium
                    truncate
                    ${
                        selected
                            ? "text-[#2BA39A]"
                            : "text-[#111827]"
                    }
                `}
            >
                {id}
            </span>
        </Box>
    );
};

export default SuggestedIdCard;