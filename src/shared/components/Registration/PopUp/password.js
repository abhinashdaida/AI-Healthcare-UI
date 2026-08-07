import React, {useState} from "react";
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
import { Icon } from "@iconify/react";
import { Formik } from "formik";
import * as Yup from "yup";
import SuccessModal from "../layout/SuccessModal";

export default function PasswordDialog({ open,handleClose,onSuccess }) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);
    const validation = Yup.object({
        password: Yup.string()
            .required("Please enter your password.")
            .min(8, "Password must be at least 8 characters.")
            .matches(/[A-Z]/, "Add at least one uppercase letter.")
            .matches(/[a-z]/, "Add at least one lowercase letter.")
            .matches(/[0-9!@#$%^&*]/, "Add at least one number.")
            .test(
        "strong-password",
        "Please create a stronger password.",
        (value) => {
            if (!value) return false;
            return getStrength(value).label === "Great";
        }
    ),
        confirmPassword: Yup.string()
            .required("Confirm password is required.")
            .oneOf([Yup.ref("password")], "Passwords do not match."),
    });

    const getStrength = (password) => {
        let score = 0;
        if (password.length >= 8) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9!@#$%^&*]/.test(password)) score++;

        if (score <= 2)
            return { value: 25, label: "Poor", color: "#EF4444" };
        if (score === 3)
            return { value: 50, label: "Moderate", color: "#F59E0B" };
        return { value: 100, label: "Great", color: "#248B8F" };
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth={false}
            slotProps={{
                paper: {
                    sx: {
                        width: { xs: "95%",sm: "90%", md: "624px",},
                        height: {xs: "auto",md: "640px"},
                        maxWidth: "624px",
                        maxHeight: "640px",
                        borderRadius: "8px",
                        p: 0,overflow: "visible",m: 0,
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
                    validationSchema={validation}
                    onSubmit={(values) => {console.log(values);
                        onSuccess();
                        handleClose();
                    }}
                >
                    {({
                        values,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        touched,
                        errors,
                    }) => {
                        const strength = getStrength(values.password);

                        const rules = [
                            {
                                text: "At least 8 Characters",
                                ok: values.password.length >= 8,
                            },
                            {
                                text: "At least one small letter",
                                ok: /[a-z]/.test(values.password),
                            },
                            {
                                text: "At least one capital letter",
                                ok: /[A-Z]/.test(values.password),
                            },
                            {
                                text: "At least one number or symbol",
                                ok: /[0-9!@#$%^&*]/.test(values.password),
                            },
                        ];

                        return (
                            <form onSubmit={handleSubmit}>
                                <Box className="w-full p-4 md:p-6">

                                    {/* Header */}

                                    <div className="flex justify-between items-start">
                                        <div className="w-full max-w-[335px]">
                                            <Typography sx={{
                                                // or Poppins, Roboto, etc.
                                                fontWeight: 500,
                                                fontSize: "16px", // md = 16px in most design systems
                                                lineHeight: 1, // 100% of 16px
                                                letterSpacing: 0,
                                            }}>
                                                Secure Your Account
                                            </Typography>

                                            <Typography
                                                sx={{
                                                    // replace with your actual font (e.g. Inter, Poppins)
                                                    fontWeight: 400,
                                                    fontStyle: "normal",
                                                    fontSize: "12px",         // if "Font Size/xs" = 12px
                                                    lineHeight: 1,
                                                    pt: 1,          // 100%
                                                    letterSpacing: 0,
                                                    color: "#6B7280"
                                                }}
                                            >
                                                Create a striong password to protect your account and personal information.
                                            </Typography>
                                        </div>
                                        <Box
                                            className="
                                                  flex flex-col
                                                  items-start
                                                  sm:items-end
                                                  gap-2 "
                                        >
                                            <Box className="flex items-center gap-2">
                                                <Icon
                                                    icon="tabler:headset"
                                                    width="18"
                                                    height="18"
                                                    className="text-gray-500"
                                                />

                                                <Typography className="text-[12px]! text-gray-500!">
                                                    Need Help?
                                                </Typography>
                                            </Box>

                                            {/* Button */}
                                            <Button
                                                variant="outlined"
                                                onClick={() => navigate("/login")}
                                                sx={{
                                                    textTransform: "none",
                                                    fontSize: "14px",
                                                    borderColor: "#159A9C",
                                                    color: "#159A9C",
                                                    px: 0.5,
                                                    py: 0.8,
                                                    minWidth: "140px",
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
    <Typography
      sx={{
        fontSize: "14px",
        fontWeight: 500,
        color: "#111827",
        mb: 1,
      }}
    >
      Create New Password
    </Typography>

    <TextField
      fullWidth
      name="password"
      type={showPassword ? "text" :"password"}
      placeholder="Enter password"
      value={values.password}
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.password && Boolean(errors.password)}
      helperText={touched.password && errors.password}
      slotProps={{
        input:{
        startAdornment: (
          <InputAdornment position="start">
            <Icon
              icon="tabler:lock"
              width={18}
              color="#9CA3AF"
            />
          </InputAdornment>
        ),
        endAdornment: (
    <InputAdornment position="end">
        <IconButton
            size="small"
            onClick={() => setShowPassword(!showPassword)}
            edge="end"
        >
            <Icon
                icon={showPassword ? "tabler:eye" : "tabler:eye-off"}
                width={18}
                color="#9CA3AF"
            />
        </IconButton>
          </InputAdornment>
        ),
    },
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          height: 56,
          borderRadius: "8px",
        },
      }}
    />
  </div>

  {/* Confirm Password */}
  <div>
    <Typography
      sx={{
        fontSize: "14px",
        fontWeight: 500,
        color: "#111827",
        mb: 1,
      }}
    >
      Confirm Password
    </Typography>

    <TextField
      fullWidth
      name="confirmPassword"
      type={showConfirmPassword ? "text" :"password"}
      placeholder="Re-enter password"
      value={values.confirmPassword}
      onChange={handleChange}
      onBlur={handleBlur}
      error={
        touched.confirmPassword &&
        Boolean(errors.confirmPassword)
      }
      helperText={
        touched.confirmPassword &&
        errors.confirmPassword
      }
      slotProps={{
        input:{
        startAdornment: (
          <InputAdornment position="start">
            <Icon
              icon="tabler:lock"
              width={18}
              color="#9CA3AF"
            />
          </InputAdornment>
        ),
        endAdornment: (
    <InputAdornment position="end">
        <IconButton
            size="small"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            edge="end"
        >
            <Icon
                icon={showConfirmPassword ? "tabler:eye" : "tabler:eye-off"}
                width={18}
                color="#9CA3AF"
            />
        </IconButton>
          </InputAdornment>
        ),
    },
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          height: 56,
          borderRadius: "8px",
        },
      }}
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
                                               sx={{color:strength.color,
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
                                    ):( <Box className="h-[32px]"/>
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
                                        onClick={()=>setSuccessOpen(true)}
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
                <SuccessModal
  open={successOpen}
  handleClose={() => setSuccessOpen(false)}
/>
            </DialogContent>
        </Dialog>
    );
}