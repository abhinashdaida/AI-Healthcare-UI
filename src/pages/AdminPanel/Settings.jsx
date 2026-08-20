import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Typography, Button, TextField } from "@mui/material";

import Header from "@/shared/components/AdminPanel/Header";
import Sidebar from "@/shared/components/AdminPanel/Sidebar";

import SettingsCard from "@/shared/components/AdminPanel/Settings/SettingsCard";
import SettingsInput from "@/shared/components/AdminPanel/Settings/SettingsInput";
import SettingsSelect from "@/shared/components/AdminPanel/Settings/SettingsSelect";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);

  // ================= TABS NAVIGATION =================

  const getTabButtonStyle = (tabName) => {
    const isActive = activeTab === tabName;
    return {
      borderRadius: "8px",
      px: 3,
      py: 1.5,
      fontSize: "0.875rem",
      fontWeight: 500,
      textTransform: "none",
      backgroundColor: isActive ? "#F7ECFB" : "transparent",
      color: isActive ? "#7B0FB5" : "#4B5563",
      "&:hover": {
        backgroundColor: isActive ? "#F3E1F8" : "#F9FAFB",
      },
    };
  };

  // ================= CANCEL ACTION =================

  const handleCancel = (formikInstance) => {
    formikInstance.resetForm();
    console.log("Changes cancelled");
  };

  // ================= FORMIK FOR PROFILE SETTINGS =================

  const profileForm = useFormik({
    initialValues: (() => {
      const saved = sessionStorage.getItem("profileData");
      return saved ? JSON.parse(saved) : {
        shopName: "The Gift Shop",
        phone: "+91 98765 43210",
        email: "shop@example.com",
        address: "123, MG Road, Bangalore - 560001, India",
      };
    })(),
    validationSchema: Yup.object({
      shopName: Yup.string().required("Shop Name is required"),
      phone: Yup.string().required("Contact Number is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      address: Yup.string().required("Address is required"),
    }),
    onSubmit: (values) => {
      sessionStorage.setItem("profileData", JSON.stringify(values));
      console.log("Profile Saved:", values);
    },
  });

  // ================= FORMIK FOR ADMINISTRATOR INFORMATION =================

  const adminForm = useFormik({
    initialValues: (() => {
      const saved = sessionStorage.getItem("adminData");
      return saved ? JSON.parse(saved) : {
        name: "Karthick",
        email: "admin@example.com",
        phone: "+91 98765 43210",
        username: "admin_giftshop",
        password: "",
        confirmPassword: "",
      };
    })(),
    validationSchema: Yup.object({
      name: Yup.string().required("Admin Name is required"),
      email: Yup.string().email("Invalid email address").required("Admin Email is required"),
      phone: Yup.string().required("Phone Number is required"),
      username: Yup.string().required("Username is required"),
      password: Yup.string().min(6, "Password must be at least 6 characters"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .test("confirmPassword-required", "Confirm Password is required", function(value) {
          const { password } = this.parent;
          if (password && password.length > 0) {
            return value && value.length > 0;
          }
          return true;
        }),
    }),
    onSubmit: (values) => {
      
      sessionStorage.setItem("adminData", JSON.stringify(values));
      console.log("Admin Settings Saved:", values);
    },
  });

  // ================= FORMIK FOR GENERAL SETTINGS =================

  const generalForm = useFormik({
    initialValues: (() => {
      const saved = sessionStorage.getItem("generalData");
      return saved ? JSON.parse(saved) : {
        websiteName: "The Gift Shop",
        currency: "Indian Rupee (₹)",
        country: "India",
        language: "English",
      };
    })(),
    validationSchema: Yup.object({
      websiteName: Yup.string().required("Website Name is required"),
      currency: Yup.string().required("Currency is required"),
      country: Yup.string().required("Country is required"),
      language: Yup.string().required("Language is required"),
    }),
    onSubmit: (values) => {
      sessionStorage.setItem("generalData", JSON.stringify(values));
      console.log("General Settings Saved:", values);
    },
  });

  return (
    <div className="min-h-screen bg-gray-50">

      <Sidebar />

      <Header />

      <main className="ml-[250px] pt-[60px]">

        <div className="w-full box-border px-10 py-6">

          {/* Page Header */}
          <div className="mb-6">
            <Typography variant="h5" component="h1" className="!text-2xl !font-semibold !text-gray-900">
              Settings
            </Typography>

            <p className="mt-1 text-gray-500">
              Manage your admin account and application settings
            </p>
          </div>

          {/* Tabs */}
          <div className="mb-6 flex gap-2 rounded-xl border border-gray-200 bg-white p-2">
            <Button
              type="button"
              onClick={() => setActiveTab("profile")}
              sx={{
                px: 3,
                py: 1,
                borderRadius: "8px",
                textTransform: "none",
                fontWeight: 500,
                fontSize: "0.875rem",
                backgroundColor: activeTab === "profile" ? "#F3E1F8" : "white",
                color: activeTab === "profile" ? "#7B0FB5" : "#4B5563",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: activeTab === "profile" ? "#EAD0F5" : "#F9FAFB",
                  color: activeTab === "profile" ? "#6B0DA0" : "#7B0FB5",
                  boxShadow: "none",
                },
              }}
            >
              Admin Profile
            </Button>

            <Button
              type="button"
              onClick={() => setActiveTab("settings")}
              sx={{
                px: 3,
                py: 1,
                borderRadius: "8px",
                textTransform: "none",
                fontWeight: 500,
                fontSize: "0.875rem",
                backgroundColor: activeTab === "settings" ? "#F3E1F8" : "white",
                color: activeTab === "settings" ? "#7B0FB5" : "#4B5563",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: activeTab === "settings" ? "#EAD0F5" : "#F9FAFB",
                  color: activeTab === "settings" ? "#6B0DA0" : "#7B0FB5",
                  boxShadow: "none",
                },
              }}
            >
              Profile Settings
            </Button>

            <Button
              type="button"
              onClick={() => setActiveTab("general")}
              sx={{
                px: 3,
                py: 1,
                borderRadius: "8px",
                textTransform: "none",
                fontWeight: 500,
                fontSize: "0.875rem",
                backgroundColor: activeTab === "general" ? "#F3E1F8" : "white",
                color: activeTab === "general" ? "#7B0FB5" : "#4B5563",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: activeTab === "general" ? "#EAD0F5" : "#F9FAFB",
                  color: activeTab === "general" ? "#6B0DA0" : "#7B0FB5",
                  boxShadow: "none",
                },
              }}
            >
              General Settings
            </Button>
          </div>

          {/* =====================================================
              ADMIN PROFILE
          ===================================================== */}

          {activeTab === "profile" && (
            <form onSubmit={profileForm.handleSubmit}>

              <SettingsCard
                title="Shop Information"
                onSave={profileForm.handleSubmit}
                onCancel={() => handleCancel(profileForm)}
              >

                <div className="flex flex-col gap-5">

                  <SettingsInput
                    label="Shop Name"
                    name="shopName"
                    value={profileForm.values.shopName}
                    onChange={profileForm.handleChange}
                    onBlur={profileForm.handleBlur}
                    error={profileForm.touched.shopName && Boolean(profileForm.errors.shopName)}
                    helperText={profileForm.touched.shopName && profileForm.errors.shopName}
                  />

                  <div className="grid grid-cols-2 gap-6">

                    <SettingsInput
                      label="Contact Number"
                      name="phone"
                      value={profileForm.values.phone}
                      onChange={profileForm.handleChange}
                      onBlur={profileForm.handleBlur}
                      error={profileForm.touched.phone && Boolean(profileForm.errors.phone)}
                      helperText={profileForm.touched.phone && profileForm.errors.phone}
                    />

                    <SettingsInput
                      label="Email"
                      name="email"
                      type="email"
                      value={profileForm.values.email}
                      onChange={profileForm.handleChange}
                      onBlur={profileForm.handleBlur}
                      error={profileForm.touched.email && Boolean(profileForm.errors.email)}
                      helperText={profileForm.touched.email && profileForm.errors.email}
                    />

                  </div>

                  <div>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      label="Address"
                      name="address"
                      value={profileForm.values.address}
                      onChange={profileForm.handleChange}
                      onBlur={profileForm.handleBlur}
                      error={profileForm.touched.address && Boolean(profileForm.errors.address)}
                      helperText={profileForm.touched.address && profileForm.errors.address}
                      variant="outlined"
                      className="bg-white"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "8px",
                        },
                      }}
                    />
                  </div>

                </div>

              </SettingsCard>

            </form>
          )}

          {/* =====================================================
              PROFILE SETTINGS
          ===================================================== */}

          {activeTab === "settings" && (
            <form onSubmit={adminForm.handleSubmit}>

              <SettingsCard
                title="Administrator Information"
                onSave={adminForm.handleSubmit}
                onCancel={() => handleCancel(adminForm)}
              >

                <div className="grid grid-cols-2 gap-8">

                  {/* LEFT - ADMINISTRATOR INFORMATION */}

                  <div className="flex flex-col gap-5">

                    <SettingsInput
                      label="Admin Name"
                      name="name"
                      value={adminForm.values.name}
                      onChange={adminForm.handleChange}
                      onBlur={adminForm.handleBlur}
                      error={adminForm.touched.name && Boolean(adminForm.errors.name)}
                      helperText={adminForm.touched.name && adminForm.errors.name}
                    />

                    <SettingsInput
                      label="Admin Email"
                      name="email"
                      type="email"
                      value={adminForm.values.email}
                      onChange={adminForm.handleChange}
                      onBlur={adminForm.handleBlur}
                      error={adminForm.touched.email && Boolean(adminForm.errors.email)}
                      helperText={adminForm.touched.email && adminForm.errors.email}
                    />

                    <SettingsInput
                      label="Phone Number"
                      name="phone"
                      value={adminForm.values.phone}
                      onChange={adminForm.handleChange}
                      onBlur={adminForm.handleBlur}
                      error={adminForm.touched.phone && Boolean(adminForm.errors.phone)}
                      helperText={adminForm.touched.phone && adminForm.errors.phone}
                    />

                    <SettingsInput
                      label="Username"
                      name="username"
                      value={adminForm.values.username}
                      onChange={adminForm.handleChange}
                      onBlur={adminForm.handleBlur}
                      error={adminForm.touched.username && Boolean(adminForm.errors.username)}
                      helperText={adminForm.touched.username && adminForm.errors.username}
                    />

                  </div>

                  {/* RIGHT - SECURITY */}

                  <div className="border-l border-gray-200 pl-8 flex flex-col gap-5">

                    <Typography variant="h6" className="!text-base !font-semibold !text-gray-900">
                      Security
                    </Typography>

                    <div className="flex flex-col gap-5">

                      <SettingsInput
                        label="Password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={adminForm.values.password}
                        onChange={adminForm.handleChange}
                        onBlur={adminForm.handleBlur}
                        error={adminForm.touched.password && Boolean(adminForm.errors.password)}
                        helperText={adminForm.touched.password && adminForm.errors.password}
                        placeholder="Enter password"
                      />

                      <SettingsInput
                        label="Confirm Password"
                        name="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        value={adminForm.values.confirmPassword}
                        onChange={adminForm.handleChange}
                        onBlur={adminForm.handleBlur}
                        error={adminForm.touched.confirmPassword && Boolean(adminForm.errors.confirmPassword)}
                        helperText={adminForm.touched.confirmPassword && adminForm.errors.confirmPassword}
                        placeholder="Confirm password"
                      />

                      <Button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        variant="text"
                        className="text-sm font-medium text-purple-700 hover:text-purple-800 normal-case !p-0"
                        sx={{
                          color: "unset !important",
                          minWidth: "unset",
                          "&:hover": {
                            backgroundColor: "transparent",
                          },
                        }}
                      >
                        {showPassword ? "Hide Password" : "Show Password"}
                      </Button>

                    </div>

                  </div>

                </div>

              </SettingsCard>

            </form>
          )}

          {/* =====================================================
              GENERAL SETTINGS
          ===================================================== */}

          {activeTab === "general" && (
            <form onSubmit={generalForm.handleSubmit}>

              <SettingsCard
                title="Application Settings"
                onSave={generalForm.handleSubmit}
                onCancel={() => handleCancel(generalForm)}
              >

                <div className="flex flex-col gap-5">

                  {/* Website Name + Currency */}

                  <div className="grid grid-cols-2 gap-6">

                    <SettingsInput
                      label="Website Name"
                      name="websiteName"
                      value={generalForm.values.websiteName}
                      onChange={generalForm.handleChange}
                      onBlur={generalForm.handleBlur}
                      error={generalForm.touched.websiteName && Boolean(generalForm.errors.websiteName)}
                      helperText={generalForm.touched.websiteName && generalForm.errors.websiteName}
                    />

                    <SettingsSelect
                      label="Currency"
                      name="currency"
                      value={generalForm.values.currency}
                      onChange={generalForm.handleChange}
                      onBlur={generalForm.handleBlur}
                      error={generalForm.touched.currency && Boolean(generalForm.errors.currency)}
                      helperText={generalForm.touched.currency && generalForm.errors.currency}
                      options={[
                        "Indian Rupee (₹)",
                        "US Dollar ($)",
                        "Euro (€)",
                        "British Pound (£)",
                      ]}
                    />

                  </div>

                  {/* Country + Language */}

                  <div className="grid grid-cols-2 gap-6">

                    <SettingsSelect
                      label="Country"
                      name="country"
                      value={generalForm.values.country}
                      onChange={generalForm.handleChange}
                      onBlur={generalForm.handleBlur}
                      error={generalForm.touched.country && Boolean(generalForm.errors.country)}
                      helperText={generalForm.touched.country && generalForm.errors.country}
                      options={[
                        "India",
                        "United States",
                        "United Kingdom",
                        "Australia",
                      ]}
                    />

                    <SettingsSelect
                      label="Language"
                      name="language"
                      value={generalForm.values.language}
                      onChange={generalForm.handleChange}
                      onBlur={generalForm.handleBlur}
                      error={generalForm.touched.language && Boolean(generalForm.errors.language)}
                      helperText={generalForm.touched.language && generalForm.errors.language}
                      options={[
                        "English",
                        "Tamil",
                        "Hindi",
                      ]}
                    />

                  </div>

                </div>

              </SettingsCard>

            </form>
          )}

        </div>

      </main>

    </div>
  );
};

export default Settings;