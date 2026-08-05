import React from "react";
import {
    Dialog,
    DialogContent,
    Box,
    Typography,
    Button,
    IconButton,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { useFormikContext } from "formik";
import insuranceCard from "../../../../../assets/image.png";

const WhatToUpload = ({ open, handleClose }) => {
    const { values } = useFormikContext();
    return (
        <Dialog open={open} onClose={handleClose} PaperProps={{
        sx: {
            width: 480,
            borderRadius: "12px",
            p: 1,
        },
    }}>
            <DialogContent className="w-full max-w-[432px] h-[415px] gap-[24px] flex flex-col">
                <Box className="flex justify-between items-start">

    <Box>

        <Typography
            sx={{
                fontWeight: 700,
                fontSize: 18,
            }}
        >
            Insurance Information
        </Typography>

        <Typography
            sx={{
                mt: 1,
                color: "#4B5563",
                fontSize: 14,
            }}
        >
            Providing insurance information helps us verify your
            coverage, speed up claim processing, and provide a
            smoother healthcare experience for you.
        </Typography>

    </Box>

    <IconButton onClick={handleClose}>
        <Icon icon="tabler:x" />
    </IconButton>

</Box>

                <Box className="w-full max-w-[432px] h-[150px]  rounded-[6px] flex flex-row gap-[16px]">
                    <Box className="w-[208px] h-[150px] flex flex-col gap-1 bg-[#FCFCFC] border-b border-[#E6E6E6] ">
                        <Box className="w-[208px] h-[24px] flex flex-col gap-1 justify-between">
                            <Typography className="text-sm text-500! font-bold text-[#0B1117]">
                                Insurance
                            </Typography>
                            <Box className="w-[18px] h-[4px] absolute top-[6px] left-[162px] rounded-[1px] bg-[#71C5C2] flex flex-col gap-1" />
                            <Box className="w-[18px] h-[2px] absolute top-[11px] left-[162px] rounded-[1px] bg-[#71C5C2] flex flex-col gap-1" />
                            <Box className="w-[18px] h-[2px] absolute top-[14px] left-[162px] rounded-[1px] bg-[#71C5C2] flex flex-col gap-1" />
                            <Icon icon="mingcute:plus-fill" color="#71C5C2" width="10" height="10" style={{ position: "absolute", top: "6px", left: "182px" }} />
                        </Box>
                        <Box className="w-[57px] h-[64px] flex flex-col gap-1">
                            <Icon icon="mingcute:plus-fill" width="21" height="21" color="#71C5C2" style={{ top: "54px", left: "8px" }} />
                            <Box className="w-[95px] h-[10px] top-[82px] left-[8px] rounded-[2px] bg-[#C9ECEB]" />
                            <Box className="w-[71px] h-[5px] top-[99px] left-[8px] rounded-[1px] bg-[#71C5C2]" />
                            <Box className="w-[50px] h-[5px] top-[106px] left-[8px] rounded-[1px] bg-[#71C5C2]" />
                            <Box className="w-[56px] h-[5px] top-[113px] left-[8px] rounded-[1px] bg-[#71C5C2]" />
                            <img src={insuranceCard} style={{ width: "100%", height: "100%", top: "54px", left: "135px", rounded: "4px" }} />
                        </Box>
                        <Typography className="w-[41px] h-[14px] text-[#4B5563]" sx={{ mt: 1, fontSize: "10px", fontWeight: 500 }}>
                            Front side
                        </Typography>
                    </Box>
                    <Box className="w-[208px] h-[150px] flex flex-col gap-1">
                        <Box className="w-[208px] h-[24px] flex flex-col gap-1 justify-between">
                            <Box className="w-[18px] h-[4px] absolute top-[6px] left-[8px] rounded-[1px] bg-[#71C5C2] flex flex-col gap-1" />
                            <Box className="w-[18px] h-[2px] absolute top-[11px] left-[8px] rounded-[1px] bg-[#71C5C2] flex flex-col gap-1" />
                            <Box className="w-[18px] h-[2px] absolute top-[14px] left-[8px] rounded-[1px] bg-[#71C5C2] flex flex-col gap-1" />
                            <Icon icon="mingcute:plus-fill" color="#71C5C2" width="10" height="10" style={{ position: "absolute", top: "6px", left: "28px" }} />
                            <Typography className="top-[6px] left-[110px] text-sm text-500! font-bold text-[#0B1117]">
                                Insurance
                            </Typography>
                        </Box>
                        <Box className="w-[184px] h-[10px] top-[37px] left-[8px] rounded-[2px] bg-[#C9ECEB]" />
                        <Box className="w-[57px] h-[64px] flex flex-col gap-1">
                            <Icon icon="mingcute:plus-fill" width="41" height="41" color="#71C5C2" style={{ top: "68px", left: "149px" }} />
                            <Box className="w-[93px] h-[5px] top-[77px] left-[8px] rounded-[1px] bg-[#71C5C2]" />
                            <Box className="w-[65px] h-[5px] top-[86px] left-[8px] rounded-[1px] bg-[#71C5C2]" />
                            <Box className="w-[73px] h-[5px] top-[95px] left-[8px] rounded-[1px] bg-[#71C5C2]" />
                           
                        </Box>
                        <Typography className="w-[41px] h-[14px] justify-center text-[#4B5563]" sx={{ mt: 1, fontSize: "10px", fontWeight: 500 }}>
                            Back side
                        </Typography>
                    </Box>
                    </Box>
                    <Box
    className="flex gap-3 mt-6 p-4 rounded-lg"
    sx={{ background: "#F3F4F6" }}
>

    <Icon
        icon="tabler:shield-lock"
        color="#0F766E"
        width={22}
    />

    <Typography
        sx={{
            fontSize: 13,
            color: "#4B5563",
        }}
    >
        Your information remains private, encrypted, and accessible
        only for authorized healthcare purposes.
    </Typography>

</Box>
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={handleClose}
                        sx={{
                            mt: 3,
                            height: "48px",
                            borderRadius: "8px",
                            textTransform: "none",
                            background: "#16858D",
                            fontSize: "16px",
                            fontWeight: 500,

                            "&:hover": {
                                background: "#15757D",
                            },
                        }}
                    >
                        Ok, I understand
                    </Button>
                
            </DialogContent>
        </Dialog>
    );
};

export default WhatToUpload;