import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Box, Typography, Button } from "@mui/material";
import { useLocation } from "react-router-dom";

import Header from "@/shared/components/AdminPanel/Header";
import Sidebar from "@/shared/components/AdminPanel/Sidebar";

import AdminProfile from "@/shared/components/AdminPanel/Settings/AdminProfile";
import ProfileSettings from "@/shared/components/AdminPanel/Settings/ProfileSettings";
import GeneralSettings from "@/shared/components/AdminPanel/Settings/GeneralSettings";

import {
  profileValidationSchema,
  adminValidationSchema,
  generalValidationSchema,
} from "@/shared/validation/SettingsValidation";

const Settings = () => {
  const location = useLocation();

  const [activeTab, setActiveTab] = useState(() => {
    return location.state?.activeTab || "profile";
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

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
    validationSchema: profileValidationSchema,
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
    validationSchema: adminValidationSchema,
    onSubmit: (values) => {
      sessionStorage.setItem("adminData", JSON.stringify(values));
      console.log("Admin Settings Saved:", values);

      // Synchronize changes to Header user session data
      const user = JSON.parse(sessionStorage.getItem("user")) || {};
      const updatedUser = {
        ...user,
        username: values.name || values.username,
      };
      sessionStorage.setItem("user", JSON.stringify(updatedUser));

      // Trigger header profile update
      window.dispatchEvent(new Event("user-profile-updated"));
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
    validationSchema: generalValidationSchema,
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
            <AdminProfile form={profileForm} onCancel={handleCancel} />
          )}

          {/* =====================================================
              PROFILE SETTINGS
          ===================================================== */}

          {activeTab === "settings" && (
            <ProfileSettings
              form={adminForm}
              onCancel={handleCancel}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
          )}

          {/* =====================================================
              GENERAL SETTINGS
          ===================================================== */}

          {activeTab === "general" && (
            <GeneralSettings form={generalForm} onCancel={handleCancel} />
          )}

        </div>

      </main>

    </div>
  );
};

export default Settings;