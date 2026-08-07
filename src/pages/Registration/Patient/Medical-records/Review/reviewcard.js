import React from "react";
import { Box, Divider } from "@mui/material";
import { Icon } from "@iconify/react";

const ReviewCard = ({
    title,
    headerIcon,
    data,
}) => {
    return (
        <Box
            className="
                bg-white
                border
                border-[#F2F2F2]
                rounded-xl
                shadow-sm
                overflow-hidden
                w-full
            "
        >
            {/* Header */}
            <Box className="flex items-center justify-between px-6 py-4">

                <Box className="flex items-center gap-4">

                    <Box className="w-9 h-9 rounded-md bg-[#F9FAFB] flex items-center justify-center">
                        <Icon
                            icon={headerIcon}
                            width={20}
                            className="text-[#6B7280]"
                        />
                    </Box>

                    <h5 className="text-xS font-500 font-medium text-[#0B1117]">
                        {title}
                    </h5>

                </Box>

                <button
                    className="flex items-center gap-1 bg-[#ECFEFF] text-[#14B8A6] px-3 py-1.5 rounded-md text-sm font-medium">
                    <Icon
                        icon="tabler:edit"
                        width={16}
                    />

                    Edit
                </button>

            </Box>

            <Divider />

            {/* Body */}
            <Box className="grid grid-cols-2 gap-x-12 gap-y-8 px-8 py-7">
                {data.map((item, index) => (

                    <Box
                        key={index}
                        className="flex items-start gap-4"
                    >

                        <Icon
                            icon={item.icon}
                            width={20}
                            className="text-[#6B7280] mt-1"
                        />

                        <Box>

                            <p className="text-xs text-[#6B7280]">
                                {item.label}
                            </p>

                            <h5 className="text-xs font-medium text-[#0B1117]">
                                {item.value}
                            </h5>

                        </Box>

                    </Box>

                ))}

            </Box>
        </Box>
    );
};

export default ReviewCard;