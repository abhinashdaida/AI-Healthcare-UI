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
import insuranceCard from "../../../../assets/image.png";
import FrontCard from "../../../../assets/CardFront.png";
import BackCard from "../../../../assets/CardBack.png";

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

                            <img src={FrontCard} alt="profile" className="w-full h-full object-cover" /> 


                            

                        </Box>

                        <Typography sx={{ mt: 0.5, fontSize: "10px", color: "#4B5563" }} className="text-center text-[10px] text-[#4B5563] mt-2">
                            Front side
                        </Typography>
                    </Box>
                    <Box className="w-full sm:w-[208px]  h-[150px] flex flex-col items-center">
                        <Box className="w-full max-w-[206px] h-[126px] rounded-md bg-[#47ABA9] border border-[#A7E6E3] p-2 relative overflow-hidden">

                            <img src={BackCard} alt="profile" className="w-full h-full object-cover" /> 

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