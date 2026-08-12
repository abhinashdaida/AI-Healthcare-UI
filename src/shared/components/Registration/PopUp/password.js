import React, { useState } from "react";
import {
    Dialog, DialogContent,
    Box, Typography,
    TextField, Button,
    LinearProgress,
    InputAdornment,
    IconButton,
} from "@mui/material";
import {
  resetRegistration,
} from "@/state-management/modules/patientRegistration/patientRegistrationActions";
import { useDispatch } from "react-redux";
import ReusableInput from "../form/FormInput";
import { Icon } from "@iconify/react";
import { Formik } from "formik";
import SectionHeader from "../form/SectionHeader";
import { getStrength, passwordRules } from "@/shared/constants/PatientRegistration/MedicalRecords/PasswordConstants";
import { Passwordvalidation } from "@/shared/validations/patientRegistration/MedicalrecordsValidations";

export default function PasswordDialog({ open, handleClose, onSuccess }) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);
    const dispatch = useDispatch();

    const handleClick =()=>{
        setSuccessOpen(true)
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth={false}
            slotProps={{
                paper: {
                    sx: {
                        width: { xs: "85%", sm: "80%", md: "624px", },
                        maxWidth: "624px",
                        borderRadius: "8px",
                        p: 0, overflow: "visible", m: 0,
                    },
                },
            }}
        >
            <IconButton
                onClick={handleClose}
                sx={{
                    position: "absolute",
                    right: { xs: 8, sm: -40 },
                    top: { xs: 8, sm: 0 },
                    color: "#000",
                    backgroundColor: "#fff",
                    borderRadius: "50%",
                    "&:hover": {
                        backgroundColor: "#f5f5f5",
                    },
                }}
            >
                <Icon icon="tabler:letter-x" color="#4B5563" width={20} height={20} />
            </IconButton>
            <DialogContent
                className="p-6 md:p-8"
                sx={{
                    height: "100%",
                    overflowY: "auto",
                }}>
                <Formik
                    initialValues={{
                        password: "",
                        confirmPassword: "",
                    }}
                    validationSchema={Passwordvalidation}
                    onSubmit={(values) => {
                        console.log(values);
                        onSuccess();
                        handleClose();
                    }}
                >
                    {({
                        values,
                        handleSubmit,
                    }) =>  (
                            <form onSubmit={handleSubmit}>
                                <Box className="w-full p-4 md:p-6">

                                    {/* Header */}
                                    <div className="w-full flex justify-between items-start ">
                                            <SectionHeader
                                                title="Secure Your Account"
                                                subtitle="Create a strong password to protect your account and personal information."
                                                maxWidth="335px"
                                            />
                                            <Box className="flex flex-col items-end gap-2">
                                                <Box className="flex items-center gap-2">
                                                    <Icon icon="tabler:headset" width={18} className="text-gray-500" />
                                                    <Typography className="text-[12px]! text-gray-500!">
                                                        Need Help?
                                                    </Typography>
                                                </Box>
                                                <Button
                                                    variant="outlined"
                                                    sx={{
                                                        width:{xs:"100%",sm:"140px"},
                                                        textTransform: "none",
                                                        fontSize: {sm:"14px", xs:"8px"},
                                                        borderColor: "#159A9C",
                                                        color: "#159A9C",
                                                        
                                                        "&:hover": {
                                                            borderColor: "#128789",
                                                            backgroundColor: "#f0fafa",
                                                        },
                                                    }}
                                                >
                                                    Contact Support
                                                </Button>
                                            </Box>
                                    </div>
                                    <Box className="w-full rounded-lg pt-6 pb-6  flex flex-col gap-6 bg-white"
                                        sx={{ maxWidth: "624px", minHeight: "102px", borderRadius: "8px", }}
                                    >
                                        <SectionHeader title="Create a strong password"
                                            subtitle="Create a strong password with mix of letters, numbers and symbols." />
                                    </Box>
                                    {/* Inputs */}

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                        {/* Create Password */}
                                        <div>
                                            <ReusableInput
                                                label="Create Password"
                                                name="password"
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Enter password"
                                                startIcon="tabler:lock"
                                                endIcon={showPassword ? "tabler:eye" : "tabler:eye-off"}
                                                onEndIconClick={() => setShowPassword(!showPassword)}
                                            />
                                        </div>

                                        {/* Confirm Password */}
                                        <div>
                                            <ReusableInput
                                                label="Confirm Password"
                                                name="confirmPassword"
                                                type={showConfirmPassword ? "text" : "password"}
                                                placeholder="Re-enter password"
                                                startIcon="tabler:lock"
                                                endIcon={showConfirmPassword ? "tabler:eye" : "tabler:eye-off"}
                                                onEndIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            />
                                        </div>
                                    </div>
                                    {/* Strength */}
                                    <Box className="w-full max-w-[280px] mt-6">
                                        {values.password ? (
                                            <>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={getStrength(values.password).value}
                                                    sx={{
                                                        height: 6,
                                                        borderRadius: 4,
                                                        backgroundColor: "#E0E0E0",
                                                        "& .MuiLinearProgress-bar": {
                                                            backgroundColor: getStrength(values.password).color,
                                                        },
                                                    }}
                                                    className="mt-6 rounded"
                                                />

                                                <Typography
                                                    className="mt-2"
                                                    sx={{
                                                        color: getStrength(values.password).color,
                                                        fontWeight: 500,
                                                        fontStyle: "normal",
                                                        fontSize: "12px", // xs (change according to your design system)
                                                        lineHeight: "100%",
                                                        letterSpacing: "0%",

                                                    }}
                                                >
                                                    {getStrength(values.password).label}
                                                </Typography>
                                            </>
                                        ) : (<Box className="h-[32px]" />
                                        )}
                                    </Box>
                                    {/* Rules */}
                                    <Box className="w-[576px] h-[148px] flex flex-col gap-2 pt-2 opacity-100">
                                        <Typography className="mt-6 mb-3" fontWeight={600}>
                                            Should Contain:
                                        </Typography>

                                        <div className="space-y-2">
                                            {passwordRules(values.password).map((rule) => (
                                                <div key={rule.text} className="flex items-center gap-2">
                                                    <Icon icon={ rule.ok ? "mdi:check-circle" : "mdi:close-circle" }
                                                        color={rule.ok ? "#248B8F" : "#ef4444"}
                                                    />
                                                    <Typography  sx={{ color: `${rule.ok ? "#248B8F" : "#ef4444"} !important`  }}>
                                                        {rule.text}
                                                    </Typography>
                                                </div>
                                            ))}
                                        </div>
                                    </Box>

                                    {/* Button */}
                                    <Button
                                        fullWidth
                                        type="submit"
                                        variant="contained"
                                        className="!mt-8 !h-12"
                                        onClick={handleClick}
                                        disabled={!values.password || !values.confirmPassword}
                                        sx={{
                                            backgroundColor: "#248B8F",
                                            color: "#fff",
                                            "&:hover": { backgroundColor: "#1E767A", },
                                            "&.Mui-disabled": {
                                                backgroundColor: "#F2F2F2",
                                                color: "#6B7280",
                                            },
                                        }}
                                    >
                                        Create Profile
                                    </Button>
                                </Box>
                            </form>
                        )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
}