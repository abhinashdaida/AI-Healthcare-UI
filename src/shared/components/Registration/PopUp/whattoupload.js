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
import insuranceCard from "../../../../assets/image.png"


const WhatToUpload = ({ open, handleClose }) => {
    const { values } = useFormikContext();
    return (
        <Dialog open={open} onClose={handleClose} PaperProps={{
  sx: {
    width: {
      xs: "95%",
      sm: "90%",
      md: 480,
    },
    maxWidth: 480,
    borderRadius: 2,
    p: 0,
    overflow: "hidden",
    m: 2,
  },
}}>
            <DialogContent className=" flex flex-col gap-6 p-6">
                <Box className="flex justify-between items-start gap-3">

                    <Box className="flex-1">

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

<Box
  className="
    mt-6
    flex
    flex-col
    sm:flex-row
    gap-5
    justify-center
    items-center
  "
>                    <Box className="w-full sm:w-[208px]  h-[150px]flex flex-col items-center">
                        <Box className="w-full max-w-[206px] h-[126px] rounded-md bg-[#47ABA9] border  border-[#A7E6E3] p-2 relative overflow-hidden">

                            {/* <img src={frontCard} alt="profile" className="w-full h-full object-cover" /> */}


                            <Box className="absolute top-[-0.5px] w-[202.5px] h-[128px] bg-[#092B2D] opacity-20 mix-blend-plus-lighter" />


                            <Box className="flex justify-between items-center relative z-8">
                                <Typography className="text-white text-[11px] font-bold">
                                    INSURANCE
                                </Typography>

                                <Box className="flex flex-col left-[12px] top-[6px]">
                                    <Box className="w-[18PX] h-[4px] top-[6px] left-[12px] bg-[#71C5C2]" />
                                    <Box className="w-[18px] h-[2px] top-[11px] left-[12px] bg-[#71C5C2]" />
                                    <Box className="w-[18px] h-[2px] top-[14px] left-[12px] bg-[#71C5C2]" />
                                </Box>
                                <Icon icon="mingcute:cross-fill" color="#71C5C2" width={10} height={10} className="absolute top-[6px] left-[182px]" />

                            </Box>


                            <Box className="absolute left-[8px] top-[54px]">
                                <Icon icon="mingcute:cross-fill" color="#71C5C2" width={21} height={21} />
                            </Box>


                            <Box className="mt-11 space-y-1 top-[82px]">
                                <Box className="w-[95px] h-[10px] top-[82px] rounded bg-[#C9ECEB]" />
                                <Box className="w-[70px] h-[4px] rounded bg-[#91E2DF]" />
                                <Box className="w-[55px] h-[4px] rounded bg-[#91E2DF]" />
                                <Box className="w-[65px] h-[4px] rounded bg-[#91E2DF]" />
                            </Box>


                            <Box className="absolute right-3 bottom-2 w-[46px] h-[58px] rounded bg-[#E6F7F7] overflow-hidden">
                                <img
                                    src={insuranceCard}
                                    alt="profile"
                                    className="w-full h-full object-cover"
                                />
                            </Box>

                        </Box>

                        <Typography sx={{ mt: 0.5, fontSize: "10px", color: "#4B5563" }} className="text-center text-[10px] text-[#4B5563] mt-2">
                            Front side
                        </Typography>
                    </Box>
                    <Box className="w-full sm:w-[208px]  h-[150px] flex flex-col items-center">
                        <Box className="w-full max-w-[206px] h-[126px] rounded-md bg-[#47ABA9] border border-[#A7E6E3] p-2 relative overflow-hidden">

                            {/* Background */}
                            <Box className="absolute top-[-0.5px] w-[202.5px] h-[128px] bg-[#092B2D] opacity-20 mix-blend-plus-lighter" />

                            {/* Header */}
                            <Box className="flex justify-between items-center relative z-10">

                                <Box className="flex items-center gap-1">
                                    <Box className="w-4 h-[2px] bg-[#71C5C2]" />
                                    <Box className="w-2 h-[6px] bg-[#71C5C2]" />
                                    <Box className="w-[6px] h-[2px] bg-[#71C5C2]" />
                                </Box>

                                <Typography className="text-white text-[11px] font-bold">
                                    INSURANCE
                                </Typography>

                            </Box>

                            {/* White Strip */}
                            <Box className="mt-4 w-full h-[8px] rounded bg-[#DDF9F8]" />

                            {/* Text */}
                            <Box className="mt-8 space-y-1">
                                <Box className="w-[70px] h-[4px] rounded bg-[#91E2DF]" />
                                <Box className="w-[60px] h-[4px] rounded bg-[#91E2DF]" />
                                <Box className="w-[75px] h-[4px] rounded bg-[#91E2DF]" />
                            </Box>

                            {/* Cross */}
                            <Box className="absolute top-[68px] left-[149px]">
                                <Icon icon="mingcute:cross-fill" color="#71C5C2" width={41} height={41} />
                            </Box>

                        </Box>

                        <Typography sx={{ mt: 0.5, fontSize: "10px", color: "#4B5563" }} className="text-center text-[10px] text-[#4B5563] mt-2">
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