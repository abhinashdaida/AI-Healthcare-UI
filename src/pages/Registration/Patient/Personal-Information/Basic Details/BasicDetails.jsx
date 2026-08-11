import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import FormHeader from "../../components/layout/FormHeader";
import SiderBar from "../../components/layout/SiderBar";
import Footer from "../../components/layout/Footer";

import {
  Box,
  Grid,
  Typography,
  TextField,
  MenuItem,
  InputAdornment,
} from "@mui/material";

import { Icon } from "@iconify/react";

/* ===========================
   Dropdown Options
=========================== */

const genderOptions = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Transgender", value: "Transgender" },
];

const bloodGroupOptions = [
  { label: "A+", value: "A+" },
  { label: "A-", value: "A-" },
  { label: "B+", value: "B+" },
  { label: "B-", value: "B-" },
  { label: "AB+", value: "AB+" },
  { label: "AB-", value: "AB-" },
  { label: "O+", value: "O+" },
  { label: "O-", value: "O-" },
];

const maritalStatusOptions = [
  { label: "Single", value: "Single" },
  { label: "Married", value: "Married" },
];

const occupationOptions = [
  { label: "Student", value: "Student" },
  { label: "Private Employee", value: "Private Employee" },
  { label: "Government Employee", value: "Government Employee" },
  { label: "Business", value: "Business" },
];

/* ===========================
   Component
=========================== */

const BasicDetails = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    gender: "",
    bloodGroup: "",
    maritalStatus: "",
    occupation: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ===========================
     Footer Actions
  =========================== */

  const handleContinue = () => {
    console.log(formData);
    navigate("/emergency-contact");
  };

  const handleAutoSave = () => {
    console.log("Auto Save");
  };

  const footerConfig = useMemo(
    () => ({
      showAutoSave: true,
      showSkipButton: false,

      primaryButtonLabel: "Upload & Continue",
      primaryButtonDisabled: false,

      onPrimaryClick: handleContinue,
      onAutoSaveClick: handleAutoSave,
    }),
    [formData]
  );

  return (
    <div className="min-h-screen bg-[#F5F7F8] flex justify-center p-3">
      <div className="w-full max-w-[1400px] bg-white rounded-lg overflow-hidden shadow-sm flex min-h-screen">

        <SiderBar />

        <main className="flex flex-1 flex-col">

          <FormHeader
            title="Personal Information"
            subtitle="Add your basic information to complete your profile and personalize your healthcare journey."
          />

          <section className="flex-1 overflow-y-auto p-8">

            <Box
              sx={{
                maxWidth: "980px",
                mx: "auto",
                bgcolor: "#fff",
                border: "1px solid #E5E7EB",
                borderRadius: "16px",
                p: 4,
              }}
            >

              <Typography
                sx={{
                  fontSize: 24,
                  fontWeight: 600,
                  color: "#111827",
                  mb: 1,
                }}
              >
                Basic Details
              </Typography>

              <Typography
                sx={{
                  fontSize: 14,
                  color: "#6B7280",
                  mb: 4,
                }}
              >
                Tell us a little about yourself so we can personalize your
                healthcare experience.
              </Typography>

              <Grid container spacing={3}>
                              {/* Full Name */}

                <Grid item xs={2} md={2}>
                  <Typography
                    sx={{
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "#111827",
                      mb: 1,
                    }}
                  >
                    Full Name
                    <span style={{ color: "#EF4444" }}> *</span>
                  </Typography>

                  <TextField
                    fullWidth
                    name="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Icon
                            icon="tabler:user"
                            width={18}
                            color="#9CA3AF"
                          />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        height: 48,
                        borderRadius: "10px",

                        "& fieldset": {
                          borderColor: "#E5E7EB",
                        },

                        "&:hover fieldset": {
                          borderColor: "#14B8A6",
                        },

                        "&.Mui-focused fieldset": {
                          borderColor: "#14B8A6",
                        },
                      },

                      "& input::placeholder": {
                        color: "#9CA3AF",
                        opacity: 1,
                      },
                    }}
                  />
                </Grid>

                {/* Date of Birth */}

                <Grid item xs={2} md={2}>
                  <Typography
                    sx={{
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "#111827",
                      mb: 1,
                    }}
                  >
                    Date of Birth
                    <span style={{ color: "#EF4444" }}> *</span>
                  </Typography>

                  <TextField
                    fullWidth
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Icon
                            icon="tabler:calendar-due"
                            width={18}
                            color="#9CA3AF"
                          />
                        </InputAdornment>
                      ),
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        height: 48,
                        borderRadius: "10px",

                        "& fieldset": {
                          borderColor: "#E5E7EB",
                        },

                        "&:hover fieldset": {
                          borderColor: "#14B8A6",
                        },

                        "&.Mui-focused fieldset": {
                          borderColor: "#14B8A6",
                        },
                      },
                    }}
                  />
                </Grid>
                                {/* Gender */}

                <Grid item xs={22} md={2}>
                  <Typography
                    sx={{
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "#111827",
                      mb: 1,
                    }}
                  >
                    Gender
                    <span style={{ color: "#EF4444" }}> *</span>
                  </Typography>

                  <TextField
                    select
                    fullWidth
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    SelectProps={{
                      displayEmpty: true,
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Icon
                            icon="tabler:gender-bigender"
                            width={18}
                            color="#9CA3AF"
                          />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        height: 48,
                        borderRadius: "10px",

                        "& fieldset": {
                          borderColor: "#E5E7EB",
                        },

                        "&:hover fieldset": {
                          borderColor: "#14B8A6",
                        },

                        "&.Mui-focused fieldset": {
                          borderColor: "#14B8A6",
                        },
                      },
                    }}
                  >
                    <MenuItem value="">
                      <span style={{ color: "#9CA3AF" }}>
                        Select your gender
                      </span>
                    </MenuItem>

                    {genderOptions.map((option) => (
                      <MenuItem
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                {/* Blood Group */}

                <Grid item xs={2} md={2}>
                  <Typography
                    sx={{
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "#111827",
                      mb: 1,
                    }}
                  >
                    Blood Group
                    <span style={{ color: "#EF4444" }}> *</span>
                  </Typography>

                  <TextField
                    select
                    fullWidth
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    SelectProps={{
                      displayEmpty: true,
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Icon
                            icon="tabler:droplet"
                            width={18}
                            color="#9CA3AF"
                          />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        height: 48,
                        borderRadius: "10px",

                        "& fieldset": {
                          borderColor: "#E5E7EB",
                        },

                        "&:hover fieldset": {
                          borderColor: "#14B8A6",
                        },

                        "&.Mui-focused fieldset": {
                          borderColor: "#14B8A6",
                        },
                      },
                    }}
                  >
                    <MenuItem value="">
                      <span style={{ color: "#9CA3AF" }}>
                        Select your blood group
                      </span>
                    </MenuItem>

                    {bloodGroupOptions.map((option) => (
                      <MenuItem
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                                {/* Marital Status */}

                <Grid item xs={2} md={2}>
                  <Typography
                    sx={{
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "#111827",
                      mb: 1,
                    }}
                  >
                    Marital Status
                    <span style={{ color: "#EF4444" }}> *</span>
                  </Typography>

                  <TextField
                    select
                    fullWidth
                    name="maritalStatus"
                    value={formData.maritalStatus}
                    onChange={handleChange}
                    SelectProps={{
                      displayEmpty: true,
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Icon
                            icon="tabler:heart-handshake"
                            width={18}
                            color="#9CA3AF"
                          />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        height: 48,
                        borderRadius: "10px",

                        "& fieldset": {
                          borderColor: "#E5E7EB",
                        },

                        "&:hover fieldset": {
                          borderColor: "#14B8A6",
                        },

                        "&.Mui-focused fieldset": {
                          borderColor: "#14B8A6",
                        },
                      },
                    }}
                  >
                    <MenuItem value="">
                      <span style={{ color: "#9CA3AF" }}>
                        Select your marital status
                      </span>
                    </MenuItem>

                    {maritalStatusOptions.map((option) => (
                      <MenuItem
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                {/* Occupation */}

                <Grid item xs={2} md={2}>
                  <Typography
                    sx={{
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "#111827",
                      mb: 1,
                    }}
                  >
                    Occupation
                    <span style={{ color: "#EF4444" }}> *</span>
                  </Typography>

                  <TextField
                    select
                    fullWidth
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    SelectProps={{
                      displayEmpty: true,
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Icon
                            icon="tabler:briefcase"
                            width={18}
                            color="#9CA3AF"
                          />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        height: 48,
                        borderRadius: "10px",

                        "& fieldset": {
                          borderColor: "#E5E7EB",
                        },

                        "&:hover fieldset": {
                          borderColor: "#14B8A6",
                        },

                        "&.Mui-focused fieldset": {
                          borderColor: "#14B8A6",
                        },
                      },
                    }}
                  >
                    <MenuItem value="">
                      <span style={{ color: "#9CA3AF" }}>
                        Select your occupation
                      </span>
                    </MenuItem>

                    {occupationOptions.map((option) => (
                      <MenuItem
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                                {/* Phone Number */}

                <Grid item xs={2} md={2}>
                  <Typography
                    sx={{
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "#111827",
                      mb: 1,
                    }}
                  >
                    Phone Number
                    <span style={{ color: "#EF4444" }}> *</span>
                  </Typography>

                  <TextField
                    fullWidth
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Icon
                            icon="tabler:phone"
                            width={18}
                            color="#9CA3AF"
                          />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        height: 48,
                        borderRadius: "10px",

                        "& fieldset": {
                          borderColor: "#E5E7EB",
                        },

                        "&:hover fieldset": {
                          borderColor: "#14B8A6",
                        },

                        "&.Mui-focused fieldset": {
                          borderColor: "#14B8A6",
                        },
                      },

                      "& input::placeholder": {
                        color: "#9CA3AF",
                        opacity: 1,
                      },
                    }}
                  />
                </Grid>

                {/* Email Address */}

                <Grid item xs={2} md={2}>
                  <Typography
                    sx={{
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "#111827",
                      mb: 1,
                    }}
                  >
                    Email Address
                    <span style={{ color: "#EF4444" }}> *</span>
                  </Typography>

                  <TextField
                    fullWidth
                    name="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Icon
                            icon="tabler:mail"
                            width={18}
                            color="#9CA3AF"
                          />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        height: 48,
                        borderRadius: "10px",

                        "& fieldset": {
                          borderColor: "#E5E7EB",
                        },

                        "&:hover fieldset": {
                          borderColor: "#14B8A6",
                        },

                        "&.Mui-focused fieldset": {
                          borderColor: "#14B8A6",
                        },
                      },

                      "& input::placeholder": {
                        color: "#9CA3AF",
                        opacity: 1,
                      },
                    }}
                  />
                </Grid>
                              </Grid>

            </Box>

          </section>

          {/* Footer */}

          <Footer config={footerConfig} />

        </main>

      </div>

    </div>

  );
};

export default BasicDetails;