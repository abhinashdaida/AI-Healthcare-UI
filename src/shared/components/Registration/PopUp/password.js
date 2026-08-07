import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    Box,
    Typography,
    TextField,
    Button,
    LinearProgress,
    InputAdornment,
    IconButton,
} from "@mui/material";
import ReusableInput from "../form/FormInput";
import { Icon } from "@iconify/react";
import { Formik } from "formik";
import * as Yup from "yup";
import SuccessModal from "../layout/SuccessModal";
import FormHeader from "../layout/FormHeader";
import { getStrength,passwordRules} from "@/shared/constants/PatientRegistration/MedicalRecords/PasswordConstants";
import { Passwordvalidation } from "@/shared/validations/patientRegistration/MedicalrecordsValidations";

export default function PasswordDialog({ open, handleClose, onSuccess }) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);
    

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth={false}
            slotProps={{
                paper: {
                    sx: {
                        width: { xs: "95%", sm: "90%", md: "624px", },
                        height: { xs: "auto", md: "640px" },
                        maxWidth: "624px",
                        maxHeight: "640px",
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
                    right: -40,   // outside right side
                    top: 0,
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
                }}
            >
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
                    }) => {
                        const strength = getStrength(values.password);

                        const rules = passwordRules(values.password);

                        return (
                            <form onSubmit={handleSubmit}>
                                <Box className="w-full p-4 md:p-6">

                                    {/* Header */}

                                    <div className="w-full flex justify-between items-start mt-0! ml-0! px-0! py-0! sm:px-0! lg:px-0!">
                                        <FormHeader
  title="Secure Your Account"
  subtitle="Create a strong password to protect your account and personal information."
  
/>
                                    </div>

                                    <Box
                                        className="w-full rounded-lg pt-6 pb-6  flex flex-col gap-6 bg-white"
                                        sx={{
                                            maxWidth: "624px",
                                            minHeight: "102px",
                                            borderRadius: "8px",
                                        }}
                                    >
                                        <Box className="w-full max-w-[328px] h-[54px]">
                                            <Typography
                                                sx={{
                                                    color: "#0B1117", // or remove if using theme font
                                                    fontWeight: 500,
                                                    fontSize: "14px",
                                                    lineHeight: 1,
                                                    letterSpacing: 0,
                                                }}
                                            >
                                                Create a strong password
                                            </Typography>

                                            <Typography
                                                sx={{
                                                    pt: 1,
                                                    fontSize: "12px",
                                                    fontWeight: 400,
                                                    color: "#4B5563",
                                                    lineHeight: 1,
                                                }}
                                            >
                                                Create a strong password with mix of letters, numbers and symbols.
                                            </Typography>
                                        </Box>
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
                                                    value={strength.value}
                                                    sx={{
                                                        height: 6,
                                                        borderRadius: 4,
                                                        backgroundColor: "#E0E0E0",
                                                        "& .MuiLinearProgress-bar": {
                                                            backgroundColor: strength.color,
                                                        },
                                                    }}
                                                    className="mt-6 rounded"
                                                />

                                                <Typography
                                                    className="mt-2"
                                                    sx={{
                                                        color: strength.color,
                                                        fontWeight: 500,
                                                        fontStyle: "normal",
                                                        fontSize: "12px", // xs (change according to your design system)
                                                        lineHeight: "100%",
                                                        letterSpacing: "0%",

                                                    }}
                                                >
                                                    {strength.label}
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

                                            {rules.map((rule) => (
                                                <div
                                                    key={rule.text}
                                                    className="flex items-center gap-2"
                                                >
                                                    <Icon
                                                        icon={
                                                            rule.ok
                                                                ? "mdi:check-circle"
                                                                : "mdi:close-circle"
                                                        }
                                                        color={rule.ok ? "#248B8F" : "#ef4444"}
                                                    />

                                                    <Typography
                                                        sx={{
                                                            color: `${rule.ok ? "#248B8F" : "#ef4444"} !important`,
                                                        }}
                                                    >
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
                                        onClick={() => setSuccessOpen(true)}
                                        disabled={!values.password || !values.confirmPassword}
                                        sx={{
                                            backgroundColor: "#248B8F",
                                            color: "#fff",
                                            "&:hover": {
                                                backgroundColor: "#1E767A",
                                            },
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
                        );
                    }}
                </Formik>
            </DialogContent>
        </Dialog>
    );
}