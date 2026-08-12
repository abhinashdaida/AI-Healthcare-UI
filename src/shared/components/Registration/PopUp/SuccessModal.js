import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";
import InfoRow from "../PopUp/InfoRow";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function SuccessModal({ open, handleClose, }) {
    const navigate = useNavigate();
    const basicDetails = useSelector((state) => state.patientRegistration.basicDetails);
    const mobile =basicDetails?.phoneNumber ||"";
    const email = basicDetails?.email ||"";

    const maskPhone = (phone) =>
        phone ? `******${phone.slice(-4)}` : "";

    const maskEmail = (email) => {
        if (!email) return "";
        const [name, domain] = email.split("@");
        if (!domain) return email;
        return `${name.slice(0, 2)}***@${domain}`;
    };
    return (
        <Modal
            open={open}
            onClose={handleClose}
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 2,
            }}>
            <Box
                sx={{
                    width: { xs: "100%", sm: 464 },
                    maxWidth: 464,
                    maxHeight: "calc(100vh - 32px)",
                    overflowY: "auto",
                    bgcolor: "#fff",
                    borderRadius: 2,
                    p: { xs: 2, sm: 3, md: 4 },
                    position: "relative",
                    outline: "none",
                    boxSizing: "border-box",
                }}>
                {/* Close */}
                <Box
                    onClick={handleClose}
                    sx={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        width: 32,
                        height: 32,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        borderRadius: "50%",
                        "&:hover": { bgcolor: "#F3F4F6" },
                    }}
                >
                    <Icon icon="tabler:x" width={20} color="#6B7280" />
                </Box>

                {/* Success Icon */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        mb: { xs: 3, sm: 4 },
                    }}
                >
                    <Box
                        sx={{
                            width: { xs: 64, sm: 76 },
                            height: { xs: 64, sm: 76 },
                            borderRadius: "50%",
                            background:
                                "linear-gradient(180deg,#7BC7C5 0%,#248B8F 100%)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            position: "relative",
                            mb: { xs: 5, sm: 6 },
                        }}
                    >
                        <Icon icon="tabler:check" width={48} color="#fff" />
                        {[...Array(12)].map((_, i) => (
                            <Box
                                key={i}
                                sx={{
                                    position: "absolute",
                                    width: 2,
                                    height: { xs: 10, sm: 14 },
                                    bgcolor: "#248B8F",
                                    borderRadius: 1,
                                    transform: `rotate(${i * 30}deg) translateY(-52px)`,
                                }}
                            />
                        ))}
                    </Box>

                    <Box
                        sx={{
                            width: "100%",
                            maxWidth: 320,
                            textAlign: "center",
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: { xs: 22, sm: 24 },
                                fontWeight: 600,
                                mb: 2,
                            }}
                        >
                            Thank you!
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: { xs: 13, sm: 14 },
                                lineHeight: 1.5,
                                color: "#6B7280",
                            }}
                        >
                            Account created successfully. Your account
                            details have been shared to your registered
                            phone number and email.
                        </Typography>
                    </Box>
                </Box>

                {/* Confirmation */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        mb: { xs: 3, sm: 4 },
                    }}
                >
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

                {/* Support Message */}
                <Box
                    sx={{
                        width: "100%",
                        minHeight: 64,
                        boxSizing: "border-box",
                        border: "1px solid #D1D5DB",
                        borderRadius: 2,
                        p: { xs: 1.5, sm: 2 },
                        mb: { xs: 3, sm: 4 },
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                    }}
                >
                    <Icon
                        icon="tabler:heart-plus"
                        width={24}
                        color="#248B8F"
                    />
                    <Typography
                        sx={{
                            fontSize: { xs: 13, sm: 14 },
                            lineHeight: 1.4,
                        }}
                    >
                        We're here to support your health journey every
                        step of this way.
                    </Typography>
                </Box>

                {/* Buttons */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        gap: 2,
                    }}
                >
                    <Button
                        fullWidth
                        variant="outlined"
                        sx={{
                            height: 48,
                            borderRadius: 2,
                            borderColor: "#248B8F",
                            color: "#248B8F",
                            textTransform: "none",
                            "&:hover": {
                                borderColor: "#248B8F",
                                bgcolor: "#F5FCFC",
                            },
                        }}
                    >
                        Download Application
                    </Button>

                    <Button
                        fullWidth
                        variant="contained"
                        onClick={() => navigate("/basic-details")}
                        sx={{
                            height: 48,
                            borderRadius: 2,
                            bgcolor: "#248B8F",
                            color: "#fff",
                            textTransform: "none",
                            "&:hover": {
                                bgcolor: "#1D7478",
                            },
                        }}
                    >
                        Go to Dashboard
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}