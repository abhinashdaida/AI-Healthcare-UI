import React, { useEffect, useState } from "react";
import { Avatar, Divider, IconButton, Typography } from "@mui/material";
import { Icon } from "@iconify/react";

import InputField from "../../components/common/InputField/InputField";
import AddressCard from "../../components/product/AddressCard/AddressCard";

const EMPTY_USER = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
};

const EMPTY_ADDRESS = {
  name: "",
  type: "Home",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  pincode: "",
  country: "India",
};

const INITIAL_ADDRESSES = [
  {
    id: 1,
    name: "Swathi M",
    type: "Home",
    phone: "+91 9876543210",
    addressLine1: "123 Main Street",
    addressLine2: "Near City Center",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500001",
    country: "India",
  },
  {
    id: 2,
    name: "Swathi M",
    type: "Office",
    phone: "+91 9876543210",
    addressLine1: "456 Business Road",
    addressLine2: "Hitech City",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500081",
    country: "India",
  },
];

/* =========================================================
   MESSAGE
========================================================= */

const Message = ({ message }) => {
  if (!message?.text) return null;

  return (
    <div
      className={`mt-4 flex items-center gap-2 rounded-lg border px-4 py-3 text-sm ${
        message.type === "success"
          ? "border-emerald-200 bg-emerald-50 text-emerald-800"
          : "border-rose-200 bg-rose-50 text-rose-800"
      }`}
    >
      <Icon
        icon={
          message.type === "success"
            ? "mdi:check-circle"
            : "mdi:alert-circle"
        }
        width="20"
      />

      <span className="font-medium">{message.text}</span>
    </div>
  );
};

/* =========================================================
   SECTION HEADER
========================================================= */

const SectionHeader = ({ title, subtitle, action }) => {
  return (
    <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
      <div>
        <h2 className="text-xl font-bold text-gray-900">
          {title}
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          {subtitle}
        </p>
      </div>

      {action}
    </div>
  );
};

/* =========================================================
   PROFILE
========================================================= */

const Profile = () => {
  const [activeSection, setActiveSection] = useState("profile");

  /* =========================================================
     GET LOGGED-IN USER
  ========================================================= */

  const getLoggedInUser = () => {
    try {
      const loggedInUser = localStorage.getItem("loggedInUser");

      if (loggedInUser) {
        const parsedUser = JSON.parse(loggedInUser);

        return {
          ...EMPTY_USER,
          ...parsedUser,
        };
      }

      return { ...EMPTY_USER };
    } catch (error) {
      console.error("Error loading logged-in user:", error);

      return { ...EMPTY_USER };
    }
  };

  const [profile, setProfile] = useState(getLoggedInUser);
  const [profileForm, setProfileForm] =
    useState(getLoggedInUser);

  const [isEditingProfile, setIsEditingProfile] =
    useState(false);

  const [profileMessage, setProfileMessage] =
    useState({});

  /* =========================================================
     PASSWORD
  ========================================================= */

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordMessage, setPasswordMessage] =
    useState({});

  /* =========================================================
     ADDRESSES
  ========================================================= */

  const [addresses, setAddresses] = useState(() => {
    try {
      const savedAddresses =
        localStorage.getItem("addresses");

      if (savedAddresses) {
        return JSON.parse(savedAddresses);
      }

      return INITIAL_ADDRESSES;
    } catch (error) {
      console.error("Error loading addresses:", error);

      return INITIAL_ADDRESSES;
    }
  });

  const [selectedAddress, setSelectedAddress] =
    useState(null);

  const [showAddressForm, setShowAddressForm] =
    useState(false);

  const [editingAddressId, setEditingAddressId] =
    useState(null);

  const [addressForm, setAddressForm] =
    useState({
      ...EMPTY_ADDRESS,
    });

  const [addressMessage, setAddressMessage] =
    useState({});

  const [deleteId, setDeleteId] = useState(null);

  /* =========================================================
     LOAD USER
  ========================================================= */

  useEffect(() => {
    const user = getLoggedInUser();

    setProfile(user);
    setProfileForm(user);
  }, []);

  /* =========================================================
     SAVE ADDRESSES
  ========================================================= */

  useEffect(() => {
    localStorage.setItem(
      "addresses",
      JSON.stringify(addresses)
    );
  }, [addresses]);

  /* =========================================================
     SELECTED ADDRESS
  ========================================================= */

  useEffect(() => {
    if (!addresses.length) {
      setSelectedAddress(null);
      localStorage.removeItem("selectedAddress");
      return;
    }

    try {
      const saved =
        localStorage.getItem("selectedAddress");

      if (saved) {
        const parsed = JSON.parse(saved);

        const exists = addresses.some(
          (address) => address.id === parsed.id
        );

        if (exists) {
          setSelectedAddress(parsed.id);
          return;
        }
      }

      const firstAddress = addresses[0];

      setSelectedAddress(firstAddress.id);

      localStorage.setItem(
        "selectedAddress",
        JSON.stringify(firstAddress)
      );
    } catch (error) {
      console.error(
        "Error loading selected address:",
        error
      );
    }
  }, [addresses]);

  /* =========================================================
     GENERIC CHANGE
  ========================================================= */

  const handleChange = (
    setter,
    field,
    value
  ) => {
    setter((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /* =========================================================
     CLEAR MESSAGES
  ========================================================= */

  const clearMessages = () => {
    setProfileMessage({});
    setPasswordMessage({});
    setAddressMessage({});
  };

  /* =========================================================
     SAVE PROFILE
  ========================================================= */

  const handleSaveProfile = () => {
    const updatedUser = {
      ...profile,
      ...profileForm,
      firstName: profileForm.firstName?.trim() || "",
      lastName: profileForm.lastName?.trim() || "",
      email: profileForm.email?.trim() || "",
      phone: profileForm.phone?.trim() || "",
    };

    if (
      !updatedUser.firstName ||
      !updatedUser.lastName ||
      !updatedUser.email ||
      !updatedUser.phone
    ) {
      setProfileMessage({
        type: "error",
        text: "Please fill all profile fields.",
      });

      return;
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        updatedUser.email
      )
    ) {
      setProfileMessage({
        type: "error",
        text: "Please enter a valid email address.",
      });

      return;
    }

    setProfile(updatedUser);
    setProfileForm(updatedUser);

    /* IMPORTANT:
       Save updated user using same key used by Sign In
    */

    localStorage.setItem(
      "loggedInUser",
      JSON.stringify(updatedUser)
    );

    setIsEditingProfile(false);

    setProfileMessage({
      type: "success",
      text: "Profile updated successfully.",
    });
  };

  /* =========================================================
     UPDATE PASSWORD
  ========================================================= */

  const handleUpdatePassword = () => {
    const {
      currentPassword,
      newPassword,
      confirmPassword,
    } = passwordForm;

    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {
      setPasswordMessage({
        type: "error",
        text: "Please fill all password fields.",
      });

      return;
    }

    /* Check current password */

    if (profile.password) {
      if (currentPassword !== profile.password) {
        setPasswordMessage({
          type: "error",
          text: "Current password is incorrect.",
        });

        return;
      }
    }

    if (newPassword.length < 6) {
      setPasswordMessage({
        type: "error",
        text: "Password must contain at least 6 characters.",
      });

      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMessage({
        type: "error",
        text: "New password and confirm password do not match.",
      });

      return;
    }

    if (currentPassword === newPassword) {
      setPasswordMessage({
        type: "error",
        text: "New password must be different from current password.",
      });

      return;
    }

    const updatedUser = {
      ...profile,
      password: newPassword,
    };

    setProfile(updatedUser);

    setProfileForm(updatedUser);

    localStorage.setItem(
      "loggedInUser",
      JSON.stringify(updatedUser)
    );

    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setPasswordMessage({
      type: "success",
      text: "Password updated successfully.",
    });
  };

  /* =========================================================
     SELECT ADDRESS
  ========================================================= */

  const handleSelectAddress = (address) => {
    setSelectedAddress(address.id);

    localStorage.setItem(
      "selectedAddress",
      JSON.stringify(address)
    );

    setAddressMessage({
      type: "success",
      text: `${address.type} address selected successfully.`,
    });
  };

  /* =========================================================
     OPEN ADDRESS FORM
  ========================================================= */

  const handleOpenAddress = (address = null) => {
    setAddressMessage({});
    setDeleteId(null);

    if (address) {
      setEditingAddressId(address.id);

      setAddressForm({
        ...EMPTY_ADDRESS,
        ...address,
      });
    } else {
      setEditingAddressId(null);

      setAddressForm({
        ...EMPTY_ADDRESS,
      });
    }

    setShowAddressForm(true);
  };

  /* =========================================================
     SAVE ADDRESS
  ========================================================= */

  const handleSaveAddress = () => {
    const requiredFields = [
      "name",
      "phone",
      "addressLine1",
      "city",
      "state",
      "pincode",
    ];

    const emptyField = requiredFields.find(
      (field) =>
        !String(addressForm[field] || "").trim()
    );

    if (emptyField) {
      setAddressMessage({
        type: "error",
        text: "Please fill all required address fields.",
      });

      return;
    }

    const phone = String(
      addressForm.phone || ""
    ).trim();

    const pincode = String(
      addressForm.pincode || ""
    ).trim();

    if (phone.length < 10) {
      setAddressMessage({
        type: "error",
        text: "Please enter a valid phone number.",
      });

      return;
    }

    if (pincode.length < 6) {
      setAddressMessage({
        type: "error",
        text: "Please enter a valid pincode.",
      });

      return;
    }

    /* EDIT */

    if (editingAddressId !== null) {
      const updatedAddress = {
        ...addressForm,
        id: editingAddressId,
      };

      setAddresses((prev) =>
        prev.map((address) =>
          address.id === editingAddressId
            ? updatedAddress
            : address
        )
      );

      if (selectedAddress === editingAddressId) {
        localStorage.setItem(
          "selectedAddress",
          JSON.stringify(updatedAddress)
        );
      }

      setAddressMessage({
        type: "success",
        text: "Address updated successfully.",
      });
    }

    /* ADD */

    else {
      const newAddress = {
        ...addressForm,
        id: Date.now(),
      };

      setAddresses((prev) => [
        ...prev,
        newAddress,
      ]);

      setSelectedAddress(newAddress.id);

      localStorage.setItem(
        "selectedAddress",
        JSON.stringify(newAddress)
      );

      setAddressMessage({
        type: "success",
        text: "Address added successfully.",
      });
    }

    setAddressForm({
      ...EMPTY_ADDRESS,
    });

    setEditingAddressId(null);
    setShowAddressForm(false);
  };

  /* =========================================================
     DELETE ADDRESS
  ========================================================= */

  const handleDeleteAddress = (id) => {
    if (deleteId !== id) {
      setDeleteId(id);

      setAddressMessage({
        type: "error",
        text: "Click Delete again to confirm.",
      });

      return;
    }

    const remainingAddresses = addresses.filter(
      (address) => address.id !== id
    );

    setAddresses(remainingAddresses);

    if (selectedAddress === id) {
      if (remainingAddresses.length > 0) {
        const nextAddress =
          remainingAddresses[0];

        setSelectedAddress(nextAddress.id);

        localStorage.setItem(
          "selectedAddress",
          JSON.stringify(nextAddress)
        );
      } else {
        setSelectedAddress(null);

        localStorage.removeItem(
          "selectedAddress"
        );
      }
    }

    setDeleteId(null);

    setAddressMessage({
      type: "success",
      text: "Address deleted successfully.",
    });
  };

  /* =========================================================
     INPUT
  ========================================================= */

  const renderInput = (
    label,
    field,
    form,
    setter,
    props = {}
  ) => {
    return (
      <InputField
        key={field}
        label={label}
        value={form[field] ?? ""}
        onChange={(event) =>
          handleChange(
            setter,
            field,
            event.target.value
          )
        }
        placeholder={label}
        {...props}
      />
    );
  };

  /* =========================================================
     USER DETAILS
  ========================================================= */

  const firstName =
    profile?.firstName || "";

  const lastName =
    profile?.lastName || "";

  const fullName =
    `${firstName} ${lastName}`.trim() ||
    "User";

  const email =
    profile?.email || "";

  const phone =
    profile?.phone || "";

  /* =========================================================
     UI
  ========================================================= */

  return (
  <div className="min-h-screen bg-[#f8f8f8]">

    {/* ================= PAGE CONTAINER ================= */}

    <div className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">

      {/* ================= PAGE TITLE ================= */}

      <div className="mb-8">
        <Typography
          sx={{
            fontSize: {
              xs: "26px",
              sm: "30px",
            },
            lineHeight: 1.2,
            fontWeight: 600,
            color: "#171717",
            letterSpacing: "-0.5px",
          }}
        >
          My Account
        </Typography>

        <p className="mt-2 text-[13px] text-[#777777]">
          Manage your profile, security and saved addresses
        </p>
      </div>

      {/* ================= MAIN LAYOUT ================= */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[270px_minmax(0,1fr)]">

        {/* =====================================================
            LEFT SIDEBAR
        ===================================================== */}

        <aside className="h-fit overflow-hidden rounded-[14px] border border-[#e5e5e5] bg-white">

          {/* USER INFO */}

          <div className="px-5 py-6">

            <div className="flex flex-col items-center text-center">

              <Avatar
                sx={{
                  width: 72,
                  height: 72,
                  backgroundColor: "#f1f1f1",
                  color: "#222222",
                  fontSize: "26px",
                  fontWeight: 600,
                  marginBottom: "14px",
                }}
              >
                {firstName
                  ? firstName.charAt(0).toUpperCase()
                  : "U"}
              </Avatar>

              <h2 className="text-[16px] font-semibold text-[#171717]">
                {fullName}
              </h2>

              <p className="mt-1 max-w-full truncate text-[12px] text-[#888888]">
                {email || "No email available"}
              </p>

              {phone && (
                <p className="mt-1 text-[12px] text-[#888888]">
                  {phone}
                </p>
              )}

            </div>

          </div>

          <Divider />

          {/* MENU */}

          <div className="p-3">

            {[
              [
                "profile",
                "mdi:account-outline",
                "Profile Overview",
              ],
              [
                "settings",
                "mdi:shield-lock-outline",
                "Security & Preferences",
              ],
              [
                "addresses",
                "mdi:map-marker-outline",
                "Saved Addresses",
              ],
            ].map(([key, icon, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setActiveSection(key);
                  clearMessages();
                }}
                className={`mb-1.5 flex w-full items-center gap-3 rounded-[9px] px-4 py-3 text-left text-[13px] font-medium transition-all ${
                  activeSection === key
                    ? "bg-[#171717] text-white"
                    : "text-[#555555] hover:bg-[#f5f5f5]"
                }`}
              >
                <Icon
                  icon={icon}
                  width="19"
                  className="shrink-0"
                />

                <span>{label}</span>
              </button>
            ))}

          </div>
        </aside>

        {/* =====================================================
            MAIN CONTENT
        ===================================================== */}

        <div className="min-w-0">

          {/* ===================================================
              PROFILE
          =================================================== */}

          {activeSection === "profile" && (
            <div className="rounded-[14px] border border-[#e5e5e5] bg-white">

              <div className="p-5 sm:p-7 lg:p-8">

                {/* HEADER */}

                <SectionHeader
                  title="Personal Details"
                  subtitle="Update your basic profile information"
                  action={
                    !isEditingProfile && (
                      <button
                        type="button"
                        onClick={() => {
                          setProfileForm({
                            ...profile,
                          });

                          setProfileMessage({});

                          setIsEditingProfile(true);
                        }}
                        className="inline-flex items-center gap-2 rounded-[8px] border border-[#dedede] bg-white px-4 py-2 text-[12px] font-semibold text-[#222222] transition hover:bg-[#f7f7f7]"
                      >
                        <Icon
                          icon="mdi:pencil-outline"
                          width="16"
                        />

                        Edit Details
                      </button>
                    )
                  }
                />

                {/* PROFILE SUMMARY */}

                <div className="mb-7 flex items-center gap-4 rounded-[10px] bg-[#fafafa] p-4">

                  <Avatar
                    sx={{
                      width: 58,
                      height: 58,
                      backgroundColor: "#eeeeee",
                      color: "#222222",
                      fontSize: "22px",
                      fontWeight: 600,
                    }}
                  >
                    {firstName
                      ? firstName.charAt(0).toUpperCase()
                      : "U"}
                  </Avatar>

                  <div className="min-w-0">

                    <p className="truncate text-[14px] font-semibold text-[#222222]">
                      {fullName}
                    </p>

                    <p className="mt-1 truncate text-[12px] text-[#888888]">
                      {email || "No email available"}
                    </p>

                  </div>

                </div>

                {/* FORM */}

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                  {[
                    ["First Name", "firstName"],
                    ["Last Name", "lastName"],
                    ["Email Address", "email"],
                    ["Phone Number", "phone"],
                  ].map(([label, field]) =>
                    renderInput(
                      label,
                      field,
                      profileForm,
                      setProfileForm,
                      {
                        disabled: !isEditingProfile,
                      }
                    )
                  )}

                </div>

                <Message message={profileMessage} />

                {/* ACTIONS */}

                {isEditingProfile && (
                  <div className="mt-7 flex flex-wrap gap-3">

                    <button
                      type="button"
                      onClick={handleSaveProfile}
                      className="inline-flex items-center gap-2 rounded-[8px] bg-[#171717] px-5 py-2.5 text-[12px] font-semibold text-white transition hover:bg-[#333333]"
                    >
                      <Icon
                        icon="mdi:content-save-outline"
                        width="17"
                      />

                      Save Changes
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setProfileForm({
                          ...profile,
                        });

                        setIsEditingProfile(false);

                        setProfileMessage({});
                      }}
                      className="rounded-[8px] border border-[#dddddd] bg-white px-5 py-2.5 text-[12px] font-semibold text-[#555555] transition hover:bg-[#f7f7f7]"
                    >
                      Cancel
                    </button>

                  </div>
                )}

              </div>
            </div>
          )}

          {/* ===================================================
              SECURITY
          =================================================== */}

          {activeSection === "settings" && (
            <div className="space-y-6">

              {/* PASSWORD */}

              <div className="rounded-[14px] border border-[#e5e5e5] bg-white p-5 sm:p-7 lg:p-8">

                <SectionHeader
                  title="Password Security"
                  subtitle="Manage your login password"
                />

                <div className="max-w-[600px] space-y-5">

                  {[
                    [
                      "Current Password",
                      "currentPassword",
                    ],
                    [
                      "New Password",
                      "newPassword",
                    ],
                    [
                      "Confirm New Password",
                      "confirmPassword",
                    ],
                  ].map(([label, field]) =>
                    renderInput(
                      label,
                      field,
                      passwordForm,
                      setPasswordForm,
                      {
                        type: "password",
                      }
                    )
                  )}

                </div>

                <Message message={passwordMessage} />

                <div className="mt-7">

                  <button
                    type="button"
                    onClick={handleUpdatePassword}
                    className="inline-flex items-center gap-2 rounded-[8px] bg-[#171717] px-5 py-2.5 text-[12px] font-semibold text-white transition hover:bg-[#333333]"
                  >
                    <Icon
                      icon="mdi:lock-check-outline"
                      width="17"
                    />

                    Update Password
                  </button>

                </div>

              </div>

              {/* PREFERENCES */}

              <div className="rounded-[14px] border border-[#e5e5e5] bg-white p-5 sm:p-7 lg:p-8">

                <div className="mb-5 border-b border-[#eeeeee] pb-4">

                  <h3 className="text-[18px] font-semibold text-[#171717]">
                    Preferences
                  </h3>

                  <p className="mt-1 text-[12px] text-[#888888]">
                    Manage your communication preferences
                  </p>

                </div>

                {/* EMAIL NOTIFICATION */}

                <div className="flex items-center justify-between gap-5 border-b border-[#eeeeee] py-5">

                  <div>

                    <p className="text-[13px] font-semibold text-[#222222]">
                      Email Notifications
                    </p>

                    <p className="mt-1 text-[11px] text-[#888888]">
                      Receive order updates and invoices via email
                    </p>

                  </div>

                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 cursor-pointer accent-black"
                  />

                </div>

                {/* MARKETING */}

                <div className="flex items-center justify-between gap-5 py-5">

                  <div>

                    <p className="text-[13px] font-semibold text-[#222222]">
                      Marketing & Promotions
                    </p>

                    <p className="mt-1 text-[11px] text-[#888888]">
                      Get early access to sales and exclusive offers
                    </p>

                  </div>

                  <input
                    type="checkbox"
                    className="h-4 w-4 cursor-pointer accent-black"
                  />

                </div>

              </div>

            </div>
          )}

          {/* ===================================================
              ADDRESSES
          =================================================== */}

          {activeSection === "addresses" && (
            <div className="rounded-[14px] border border-[#e5e5e5] bg-white p-5 sm:p-7 lg:p-8">

              {/* HEADER */}

              <SectionHeader
                title="Delivery Addresses"
                subtitle="Manage your saved shipping and billing locations"
                action={
                  !showAddressForm && (
                    <button
                      type="button"
                      onClick={() =>
                        handleOpenAddress()
                      }
                      className="inline-flex items-center gap-2 rounded-[8px] bg-[#171717] px-4 py-2.5 text-[12px] font-semibold text-white transition hover:bg-[#333333]"
                    >
                      <Icon
                        icon="mdi:plus"
                        width="17"
                      />

                      Add New Address
                    </button>
                  )
                }
              />

              <Message message={addressMessage} />

              {/* =================================================
                  ADDRESS FORM
              ================================================= */}

              {showAddressForm ? (
                <div className="mt-6 rounded-[12px] border border-[#e5e5e5] bg-[#fafafa] p-5 sm:p-6">

                  <div className="mb-6 flex items-start justify-between">

                    <div>

                      <h3 className="text-[16px] font-semibold text-[#171717]">
                        {editingAddressId !== null
                          ? "Edit Address"
                          : "Add New Address"}
                      </h3>

                      <p className="mt-1 text-[11px] text-[#888888]">
                        Provide accurate details for seamless deliveries
                      </p>

                    </div>

                    <IconButton
                      size="small"
                      onClick={() => {
                        setShowAddressForm(false);

                        setEditingAddressId(null);

                        setAddressForm({
                          ...EMPTY_ADDRESS,
                        });
                      }}
                      sx={{
                        border: "1px solid #dddddd",
                        backgroundColor: "#ffffff",
                      }}
                    >
                      <Icon
                        icon="mdi:close"
                        width="18"
                      />
                    </IconButton>

                  </div>

                  {/* ADDRESS INPUTS */}

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                    {[
                      ["Full Name", "name"],
                      ["Address Tag", "type"],
                      ["Phone Number", "phone"],
                      ["Country", "country"],
                      ["City", "city"],
                      ["State", "state"],
                      ["Pincode", "pincode"],
                    ].map(([label, field]) =>
                      renderInput(
                        label,
                        field,
                        addressForm,
                        setAddressForm
                      )
                    )}

                    <div className="md:col-span-2">
                      {renderInput(
                        "Address Line 1",
                        "addressLine1",
                        addressForm,
                        setAddressForm,
                        {
                          placeholder:
                            "House/Flat number, Street name",
                        }
                      )}
                    </div>

                    <div className="md:col-span-2">
                      {renderInput(
                        "Address Line 2",
                        "addressLine2",
                        addressForm,
                        setAddressForm,
                        {
                          placeholder:
                            "Apartment name, Landmark (Optional)",
                        }
                      )}
                    </div>

                  </div>

                  {/* FORM BUTTONS */}

                  <div className="mt-7 flex flex-wrap gap-3">

                    <button
                      type="button"
                      onClick={handleSaveAddress}
                      className="inline-flex items-center gap-2 rounded-[8px] bg-[#171717] px-5 py-2.5 text-[12px] font-semibold text-white transition hover:bg-[#333333]"
                    >
                      <Icon
                        icon={
                          editingAddressId !== null
                            ? "mdi:check-bold"
                            : "mdi:content-save-outline"
                        }
                        width="17"
                      />

                      {editingAddressId !== null
                        ? "Update Address"
                        : "Save Address"}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setShowAddressForm(false);

                        setEditingAddressId(null);
                      }}
                      className="rounded-[8px] border border-[#dddddd] bg-white px-5 py-2.5 text-[12px] font-semibold text-[#555555] transition hover:bg-[#f7f7f7]"
                    >
                      Cancel
                    </button>

                  </div>

                </div>
              ) : addresses.length === 0 ? (

                /* =================================================
                    EMPTY ADDRESS
                ================================================= */

                <div className="mt-6 rounded-[12px] border border-dashed border-[#dddddd] px-6 py-14 text-center">

                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f6f6f6]">

                    <Icon
                      icon="mdi:map-marker-off-outline"
                      width="28"
                      className="text-[#aaaaaa]"
                    />

                  </div>

                  <p className="mt-4 text-[14px] font-semibold text-[#333333]">
                    No saved addresses found
                  </p>

                  <p className="mt-1 text-[11px] text-[#888888]">
                    Add an address to speed up checkout.
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      handleOpenAddress()
                    }
                    className="mt-5 inline-flex items-center gap-2 rounded-[8px] bg-[#171717] px-4 py-2.5 text-[12px] font-semibold text-white"
                  >
                    <Icon
                      icon="mdi:plus"
                      width="17"
                    />

                    Add First Address
                  </button>

                </div>

              ) : (

                /* =================================================
                    ADDRESS LIST
                ================================================= */

                <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">

                  {addresses.map((address) => (

                    <div
                      key={address.id}
                      className={`relative rounded-[12px] border bg-white p-5 transition-all ${
                        selectedAddress === address.id
                          ? "border-[#171717] shadow-sm"
                          : "border-[#e5e5e5] hover:border-[#cccccc]"
                      }`}
                    >

                      {/* SELECTED LABEL */}

                      {selectedAddress === address.id && (
                        <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-[#171717] px-2.5 py-1 text-[9px] font-semibold text-white">

                          <Icon
                            icon="mdi:check"
                            width="12"
                          />

                          Selected

                        </div>
                      )}

                      {/* ADDRESS CARD */}

                      <AddressCard
                        address={address}
                        selected={
                          selectedAddress === address.id
                        }
                        onSelect={() =>
                          handleSelectAddress(address)
                        }
                      />

                      {/* ACTION BUTTONS */}

                      <div className="mt-5 flex justify-end gap-2 border-t border-[#eeeeee] pt-4">

                        <button
                          type="button"
                          onClick={() =>
                            handleOpenAddress(address)
                          }
                          className="inline-flex items-center gap-1.5 rounded-[7px] border border-[#dddddd] bg-white px-3 py-1.5 text-[11px] font-semibold text-[#444444] transition hover:bg-[#f7f7f7]"
                        >
                          <Icon
                            icon="mdi:pencil-outline"
                            width="14"
                          />

                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteAddress(address.id)
                          }
                          className={`inline-flex items-center gap-1.5 rounded-[7px] px-3 py-1.5 text-[11px] font-semibold transition ${
                            deleteId === address.id
                              ? "bg-[#171717] text-white"
                              : "bg-[#fff2f2] text-[#d04444] hover:bg-[#ffe5e5]"
                          }`}
                        >
                          <Icon
                            icon="mdi:trash-can-outline"
                            width="14"
                          />

                          {deleteId === address.id
                            ? "Confirm Delete"
                            : "Delete"}
                        </button>

                      </div>

                    </div>

                  ))}

                </div>

              )}

            </div>
          )}

        </div>
      </div>
    </div>
  </div>
);
};

export default Profile;