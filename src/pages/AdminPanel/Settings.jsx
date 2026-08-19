import React, { useState } from "react";

import Header from "@/shared/components/AdminPanel/Header";
import Sidebar from "@/shared/components/AdminPanel/Sidebar";

import SettingsCard from "@/shared/components/AdminPanel/Settings/SettingsCard";
import SettingsInput from "@/shared/components/AdminPanel/Settings/SettingsInput";
import SettingsSelect from "@/shared/components/AdminPanel/Settings/SettingsSelect";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const [profileData, setProfileData] = useState({
    shopName: "The Gift Shop",
    phone: "+91 98765 43210",
    email: "shop@example.com",
    address: "123, MG Road, Bangalore - 560001, India",
  });

  const [adminData, setAdminData] = useState({
    name: "Karthick",
    email: "admin@example.com",
    phone: "+91 98765 43210",
    username: "admin_giftshop",
    password: "",
    confirmPassword: "",
  });

  const [generalData, setGeneralData] = useState({
    websiteName: "The Gift Shop",
    currency: "Indian Rupee (₹)",
    country: "India",
    language: "English",
  });

  const [showPassword, setShowPassword] = useState(false);

  // Profile Change
  const handleProfileChange = (e) => {
    const { name, value } = e.target;

    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Admin Change
  const handleAdminChange = (e) => {
    const { name, value } = e.target;

    setAdminData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // General Change
  const handleGeneralChange = (e) => {
    const { name, value } = e.target;

    setGeneralData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save
  const handleSave = (e) => {
    e.preventDefault();

    if (activeTab === "profile") {
      console.log("Profile Saved:", profileData);
    }

    if (activeTab === "settings") {
      console.log("Admin Settings Saved:", adminData);
    }

    if (activeTab === "general") {
      console.log("General Settings Saved:", generalData);
    }
  };

  // Cancel
  const handleCancel = () => {
    console.log("Changes cancelled");
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <Sidebar />

      <Header />

      <main className="ml-[250px] pt-[60px]">

        <div className="w-full box-border px-10 py-6">

          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">
              Settings
            </h1>

            <p className="mt-1 text-gray-500">
              Manage your admin account and application settings
            </p>
          </div>

          {/* Tabs */}
          <div className="mb-6 flex gap-2 rounded-xl border border-gray-200 bg-white p-2">

            <button
              type="button"
              onClick={() => setActiveTab("profile")}
              className={`rounded-lg px-6 py-3 text-sm font-medium ${
                activeTab === "profile"
                  ? "bg-purple-100 text-purple-700"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              Admin Profile
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("settings")}
              className={`rounded-lg px-6 py-3 text-sm font-medium ${
                activeTab === "settings"
                  ? "bg-purple-100 text-purple-700"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              Profile Settings
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("general")}
              className={`rounded-lg px-6 py-3 text-sm font-medium ${
                activeTab === "general"
                  ? "bg-purple-100 text-purple-700"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              General Settings
            </button>

          </div>

          {/* =====================================================
              ADMIN PROFILE
          ===================================================== */}

          {activeTab === "profile" && (
            <form onSubmit={handleSave}>

              <SettingsCard
                title="Shop Information"
                onSave={handleSave}
                onCancel={handleCancel}
              >

                <div className="space-y-5">

                  <SettingsInput
                    label="Shop Name"
                    name="shopName"
                    value={profileData.shopName}
                    onChange={handleProfileChange}
                  />

                  <div className="grid grid-cols-2 gap-6">

                    <SettingsInput
                      label="Contact Number"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleProfileChange}
                    />

                    <SettingsInput
                      label="Email"
                      name="email"
                      type="email"
                      value={profileData.email}
                      onChange={handleProfileChange}
                    />

                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-800">
                      Address
                    </label>

                    <textarea
                      name="address"
                      value={profileData.address}
                      onChange={handleProfileChange}
                      rows="3"
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
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
            <form onSubmit={handleSave}>

              <SettingsCard
                title="Administrator Information"
                onSave={handleSave}
                onCancel={handleCancel}
              >

                <div className="grid grid-cols-2 gap-8">

                  {/* LEFT - ADMINISTRATOR INFORMATION */}

                  <div className="space-y-5">

                    <SettingsInput
                      label="Admin Name"
                      name="name"
                      value={adminData.name}
                      onChange={handleAdminChange}
                    />

                    <SettingsInput
                      label="Admin Email"
                      name="email"
                      type="email"
                      value={adminData.email}
                      onChange={handleAdminChange}
                    />

                    <SettingsInput
                      label="Phone Number"
                      name="phone"
                      value={adminData.phone}
                      onChange={handleAdminChange}
                    />

                    <SettingsInput
                      label="Username"
                      name="username"
                      value={adminData.username}
                      onChange={handleAdminChange}
                    />

                  </div>

                  {/* RIGHT - SECURITY */}

                  <div className="border-l border-gray-200 pl-8">

                    <h3 className="mb-5 text-base font-semibold text-gray-900">
                      Security
                    </h3>

                    <div className="space-y-5">

                      <SettingsInput
                        label="Password"
                        name="password"
                        type={
                          showPassword
                            ? "text"
                            : "password"
                        }
                        value={adminData.password}
                        onChange={handleAdminChange}
                        placeholder="Enter password"
                      />

                      <SettingsInput
                        label="Confirm Password"
                        name="confirmPassword"
                        type={
                          showPassword
                            ? "text"
                            : "password"
                        }
                        value={adminData.confirmPassword}
                        onChange={handleAdminChange}
                        placeholder="Confirm password"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword(!showPassword)
                        }
                        className="text-sm font-medium text-purple-700 hover:text-purple-800"
                      >
                        {showPassword
                          ? "Hide Password"
                          : "Show Password"}
                      </button>

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
            <form onSubmit={handleSave}>

              <SettingsCard
                title="Application Settings"
                onSave={handleSave}
                onCancel={handleCancel}
              >

                <div className="space-y-5">

                  {/* Website Name + Currency */}

                  <div className="grid grid-cols-2 gap-6">

                    <SettingsInput
                      label="Website Name"
                      name="websiteName"
                      value={generalData.websiteName}
                      onChange={handleGeneralChange}
                    />

                    <SettingsSelect
                      label="Currency"
                      name="currency"
                      value={generalData.currency}
                      onChange={handleGeneralChange}
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
                      value={generalData.country}
                      onChange={handleGeneralChange}
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
                      value={generalData.language}
                      onChange={handleGeneralChange}
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