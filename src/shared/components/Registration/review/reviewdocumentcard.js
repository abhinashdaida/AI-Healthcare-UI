import { Card, Typography, Box, Divider } from "@mui/material";
import { Icon } from "@iconify/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const ReviewDocumentCard = ({ title, files = [],editPath }) => {
    const navigate =useNavigate();
    const handleEdit=()=>{
        if(editPath){
        navigate(editPath);
        }
    }
    return (
        <Card
            sx={{
                borderRadius: "12px",
                border: "1px solid #E5E7EB",
                boxShadow: "none",
                height: "100%",
            }}
        >
            {/* Header */}
            <Box className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 " >
                <Box className="flex items-center gap-2">
                    <Icon
                        icon="tabler:file-text"
                        width={18}
                        color="#248B8F"
                    />
                    <h5 className="text-sm md:text-base font-medium text-[#0B1117]">
                        {title}
                    </h5>
                </Box>
                <Box onClick={handleEdit} className="flex items-center gap-1 cursor-pointer text-[#248B8F]">
                    <Icon icon="ic:round-plus"
                        width={18}
                        color="#248B8F"
                    />
                    <Typography
                        sx={{
                            color: "#248B8F",
                            fontSize: { xs: "13px",  md: "14px", },
                        }}
                    >
                        Upload
                    </Typography>
                </Box>
            </Box>
            <Divider />
            {/* Files */}
            <Box className=" p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 ">
                {files?.map((file, index) => (
                    <Box key={file.fileName || `${file.name}-${index}`}
                        className=" flex items-center gap-3  w-full rounded-lg border border-gray-100  p-2 " >
                        <Icon
                            icon="teenyicons:pdf-solid"
                            width={18}
                            color="#248B8F"
                        />
                        <Box className="min-w-0">
                            <Typography
                                className="truncate"
                                sx={{
                                    fontWeight: 500,
                                    fontSize: { xs: "12px", md: "13px", },
                                }}
                            >
                                {file.fileName || file.name}
                            </Typography>
                            <Typography
                                sx={{
                                    color: "#98A2B3",
                                    fontSize: { xs: "11px", md: "12px", },
                                }}
                            >
                                PDF • {file.size}
                            </Typography>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Card>
    );
};

export default ReviewDocumentCard;