import {
    Box,
    Button,
    Modal, Dialog,
    Typography,
} from "@mui/material";
import React from "react";
import InfoRow from "./InfoRow";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

export default function SuccessModal({
    open,
    handleClose,
    email,
    mobile,
}) {
    const navigate=useNavigate();
    const maskPhone = (phone) => {
        if (!phone) return "";

        return `******${phone.slice(-4)}`;
    };

    const maskEmail = (email) => {
        if (!email) return "";

        const [name, domain] = email.split("@");

        return `${name.slice(0, 2)}***@${domain}`;
    };

    return (
        <Modal open={open}>
            <Box
                sx={{
                    width: {
                        xs: "92%",
                        sm: "464px",
                    },
                    height: { sm: "632px" },
                    bgcolor: "#fff",
                    pt: 4,
                    pl:4,
                    pr:4,
                    borderRadius: 4,
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        mb: 5,

                    }}
                >
                    <Box
                        sx={{
                            width: 76,
                            height: 76,
                            borderRadius: "50%",
                            background:
                                "linear-gradient(180deg, #7BC7C5 0%, #248B8F 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            position: "relative",
                            mb: 10
                        }}
                    >
                        <Icon icon="tabler:check" width={75} color="#fff"
                            sx={{
                                color: "#fff",
                                fontSize: 40,
                            }}
                        />

                        {/* Decorative Rays */}

                        {[...Array(12)].map((_, i) => (
                            <Box
                                key={i}
                                sx={{
                                    position: "absolute",
                                    width: 2,
                                    height: 14,
                                    bgcolor: "#248B8F",
                                    borderRadius: 1,
                                    transform: `rotate(${i * 30}deg) translateY(-58px)`,
                                }}
                            />
                        ))}
                    </Box>

                    <Box className="w-full max-w-[280px] " sx={{
                        display: "flex",
                        flexDirection: "column", justifyContent: "center", alignItems: "center",
                    }}>


                        <Typography 
                            variant="h5"
                            sx={{textAlign:"center",
                            mb:4
                            }}
                        >
                            Thank you!
                        </Typography>

                        <Typography
                            sx={{
                                fontWeight: 400,
                                fontStyle: "normal",
                                fontSize: "14px", // xs usually = 12px
                                lineHeight: "1.5",
                                letterSpacing: "0",
                                textAlign: "center",
                                color: "#6B7280"
                            }}
                        >
                            Account created successfully your account details has been
                            shared to registered phone number and email
                        </Typography>
                    </Box>
                </Box>
                <Box className="w-full max-w-[416px] flex flex-col mb-10 gap-[16px]">

                    <InfoRow
                        title="Mobile Confirmation"
                        value={`Your registered mobile number ${maskPhone(
                            mobile
                        )} has been verified.`}
                    />

                    <InfoRow
                        title="Email Confirmation"
                        value={`Confirmation email sent to: ${maskEmail(
                            email
                        )}`}
                    />

                </Box>
                <Box
                    sx={{
                        width: "416px",
                        height: "64px",
                        borderRadius: "8px",
                        border: "1px solid #D1D5DB",
                        p: "8px 16px",
                        mb:"20px",
                        display: "flex",
                        gap: "12px",
                        alignItems: "center",
                        opacity: 1,
                        display: "flex",
                        flexDirection: "row",
                    }}
                >
                    <Icon icon="tabler:heart-plus" width={24} height={24} color="#248B8F" />
                    <Typography
                        sx={{
                            fontWeight: 400,
                            fontStyle: "normal",
                            fontSize: "14px", // replace with your xs token value
                            lineHeight: "100%",
                            letterSpacing: "0",
                        }}
                    >
                        We're here to support your health journey every step of this way.
                    </Typography>
                </Box>
                <Box
                    
                    
                    sx={{
                        display:"flex",
                    flexDirection:"row",
                    gap:2,
                        width: "416px",
                        height: "48px",
                        display: "flex",
                        gap: "12px",
                        mt:"20px",
                        opacity: 1,
                        alignItems: "center",
                    }}

                >
                    <Button
                        fullWidth
                        variant="outlined"
                        color="#248B8F"
                        border= "#248B8F"
                        sx={{
                            width: "202px",
                            height: "48px",
                            gap: "8px",
                            borderRadius: "8px",
                            borderWidth: "1px",
                            borderColor:"#248B8F",
                            color:"#248B8F",
                            px: "24px",
                            textTransform: "none",
                        }}
                    >
                        Download Application
                    </Button>

                    <Button
                        fullWidth
                        variant="contained"
                        background="#248B8F"
                        color="#ffffff"
                        sx={{
                            width: 202,
                            height: 48,
                            gap: 1,          // 8px
                            borderRadius: 2,
                            background:"#248B8F",
                            color:"#ffffff", // 8px
                            px: 3,           // 24px left & right
                            textTransform: "none",
                        }}
                    onClick={()=>navigate("/medical-conditions")}
                    >
                        Go to Dashboard
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}