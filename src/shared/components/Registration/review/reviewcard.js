import React from "react";
import { Box, Divider } from "@mui/material";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

const ReviewCard = ({
    title,
    headerIcon,
    editPath,
    data,
}) => {
    const navigate =useNavigate();
    const handleEdit =()=>{
        if(editPath){
            navigate(editPath);
        }
    }
    return (
        <Box className=" bg-white border border-[#E5E7EB] rounded-xl shadow-sm overflow-hidden w-full " >
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

                    <h3 className="text-xl font-semibold text-[#1F2937]">
                        {title}
                    </h3>
                </Box>

                <button type="button" onClick={handleEdit} 
                className=" flex items-center gap-1 bg-[#ECFEFF] text-[#14B8A6] px-3 py-1.5 rounded-md text-sm font-medium">
                    <Icon
                        icon="tabler:edit"
                        width={16}
                    />

                    Edit
                </button>

            </Box>

            <Divider />

            {/* Body */}
            <Box className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8 px-4 sm:px-6 md:px-8 px-8 py-6 w-full">
                {Array.isArray(data) &&
                    data.map((item, index) => (
                        <Box key={index} className="flex items-start gap-4" >
                            <Icon
                                icon={item.icon}
                                width={20} height={20}
                                className="text-[#6B7280] mt-1 flex-shrink-0"
                            />

                            <Box className="w-full max-w-[184.5px]">
                                <p className=" w-full max-w-[248.5px] text-xs text-[#6B7280]">
                                    {item.label}
                                </p>
                                <p className="text-xxs font-medium text-[12px] leading-none tracking-normal text-[#0B1117]">
                                    {item.value}
                                </p>
                            </Box>
                        </Box>
                    ))}
            </Box>
        </Box>
    );
};

export default ReviewCard;