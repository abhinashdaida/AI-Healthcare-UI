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
      className={`mt-5 flex items-center gap-2 rounded-xl border px-4 py-3 text-sm ${
        message.type === "success"
          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
          : "border-rose-200 bg-rose-50 text-rose-700"
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

const SectionHeader = ({
  title,
  subtitle,
  action,
  icon = "mdi:account-heart-outline",
}) => {
  return (
    <div className="mb-7 flex flex-col gap-4 border-b border-purple-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100">
          <Icon
            icon={icon}
            width="22"
            className="text-[#6C63FF]"
          />
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-900">
            {title}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {subtitle}
          </p>
        </div>
      </div>

      {action}
    </div>
  );
};

/* =========================================================
   PROFILE
========================================================= */

const Profile = () => {
  const [activeSection, setActiveSection] =
    useState("profile");

  /* =========================================================
     GET LOGGED-IN USER
  ========================================================= */

  const getLoggedInUser = () => {
    try {
      const loggedInUser =
        localStorage.getItem("loggedInUser");

      if (loggedInUser) {
        const parsedUser =
          JSON.parse(loggedInUser);

        return {
          ...EMPTY_USER,
          ...parsedUser,
        };
      }

      return { ...EMPTY_USER };
    } catch (error) {
      console.error(
        "Error loading logged-in user:",
        error
      );

      return { ...EMPTY_USER };
    }
  };

  const [profile, setProfile] =
    useState(getLoggedInUser);

  const [profileForm, setProfileForm] =
    useState(getLoggedInUser);

  const [isEditingProfile, setIsEditingProfile] =
    useState(false);

  const [profileMessage, setProfileMessage] =
    useState({});

  /* =========================================================
     PASSWORD
  ========================================================= */

  const [passwordForm, setPasswordForm] =
    useState({
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
      console.error(
        "Error loading addresses:",
        error
      );

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

  const [deleteId, setDeleteId] =
    useState(null);

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

      localStorage.removeItem(
        "selectedAddress"
      );

      return;
    }

    try {
      const saved =
        localStorage.getItem(
          "selectedAddress"
        );

      if (saved) {
        const parsed = JSON.parse(saved);

        const exists = addresses.some(
          (address) =>
            address.id === parsed.id
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
      firstName:
        profileForm.firstName?.trim() || "",
      lastName:
        profileForm.lastName?.trim() || "",
      email:
        profileForm.email?.trim() || "",
      phone:
        profileForm.phone?.trim() || "",
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

    if (profile.password) {
      if (
        currentPassword !==
        profile.password
      ) {
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

    if (
      newPassword !== confirmPassword
    ) {
      setPasswordMessage({
        type: "error",
        text: "New password and confirm password do not match.",
      });

      return;
    }

    if (
      currentPassword === newPassword
    ) {
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

  const handleOpenAddress = (
    address = null
  ) => {
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

    const emptyField =
      requiredFields.find(
        (field) =>
          !String(
            addressForm[field] || ""
          ).trim()
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

      if (
        selectedAddress ===
        editingAddressId
      ) {
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

    const remainingAddresses =
      addresses.filter(
        (address) =>
          address.id !== id
      );

    setAddresses(remainingAddresses);

    if (selectedAddress === id) {
      if (remainingAddresses.length > 0) {
        const nextAddress =
          remainingAddresses[0];

        setSelectedAddress(
          nextAddress.id
        );

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
    <div className="min-h-screen bg-gradient-to-br from-[#F7F5FF] via-white to-[#FFF5F8] py-8">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <div className="mb-8">

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6C63FF] to-[#9B8CFF] shadow-lg shadow-purple-200">
              <Icon
                icon="mdi:account-heart-outline"
                width="27"
                className="text-white"
              />
            </div>

            <div>
              <Typography
                sx={{
                  fontSize: {
                    xs: 26,
                    sm: 32,
                  },
                  fontWeight: 700,
                  color: "#1F2937",
                }}
              >
                My Account
              </Typography>

              <p className="mt-1 text-sm text-gray-500">
                Manage your profile, security
                and saved addresses
              </p>
            </div>

          </div>

        </div>

        {/* =================================================
            MAIN GRID
        ================================================= */}

        <div className="grid grid-cols-1 gap-7 lg:grid-cols-4">

          {/* =================================================
              SIDEBAR
          ================================================= */}

          <aside className="h-fit overflow-hidden rounded-2xl border border-purple-100 bg-white shadow-[0_10px_35px_rgba(108,99,255,0.10)]">

            {/* PROFILE HEADER */}

            <div className="relative overflow-hidden bg-gradient-to-br from-[#6C63FF] via-[#786FFF] to-[#A394FF] px-5 py-8 text-center">

              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/10" />

              <div className="absolute -bottom-10 -left-8 h-28 w-28 rounded-full bg-white/10" />

              <div className="relative">

                <Avatar
                  sx={{
                    width: 86,
                    height: 86,
                    margin: "0 auto 14px",
                    bgcolor: "#ffffff",
                    color: "#6C63FF",
                    fontSize: 32,
                    fontWeight: 700,
                    border:
                      "4px solid rgba(255,255,255,0.45)",
                    boxShadow:
                      "0 10px 25px rgba(0,0,0,0.15)",
                  }}
                >
                  {firstName
                    ? firstName
                        .charAt(0)
                        .toUpperCase()
                    : "U"}
                </Avatar>

                <h2 className="text-lg font-bold text-white">
                  {fullName}
                </h2>

                <p className="mt-1 break-all text-xs text-purple-100">
                  {email ||
                    "No email available"}
                </p>

                {phone && (
                  <p className="mt-1 text-xs text-purple-100">
                    {phone}
                  </p>
                )}

              </div>
            </div>

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
              ].map(
                ([key, icon, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      setActiveSection(
                        key
                      );

                      clearMessages();
                    }}
                    className={`mb-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition-all duration-200 ${
                      activeSection === key
                        ? "bg-gradient-to-r from-[#6C63FF] to-[#8C83FF] text-white shadow-md shadow-purple-200"
                        : "text-gray-600 hover:bg-purple-50 hover:text-[#6C63FF]"
                    }`}
                  >
                    <Icon
                      icon={icon}
                      width="21"
                    />

                    {label}
                  </button>
                )
              )}

            </div>
          </aside>

          {/* =================================================
              MAIN CONTENT
          ================================================= */}

          <main className="lg:col-span-3">

            {/* =================================================
                PROFILE
            ================================================= */}

            {activeSection ===
              "profile" && (
              <div className="rounded-2xl border border-purple-100 bg-white p-5 shadow-[0_10px_35px_rgba(108,99,255,0.07)] sm:p-8">

                <SectionHeader
                  title="Personal Details"
                  subtitle="Update your basic profile information"
                  icon="mdi:account-heart-outline"
                  action={
                    !isEditingProfile && (
                      <button
                        type="button"
                        onClick={() => {
                          setProfileForm({
                            ...profile,
                          });

                          setProfileMessage(
                            {}
                          );

                          setIsEditingProfile(
                            true
                          );
                        }}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-50 px-5 py-2.5 text-sm font-semibold text-[#6C63FF] transition hover:bg-purple-100"
                      >
                        <Icon
                          icon="mdi:pencil-outline"
                          width="18"
                        />

                        Edit Details
                      </button>
                    )
                  }
                />

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                  {[
                    [
                      "First Name",
                      "firstName",
                    ],
                    [
                      "Last Name",
                      "lastName",
                    ],
                    [
                      "Email Address",
                      "email",
                    ],
                    [
                      "Phone Number",
                      "phone",
                    ],
                  ].map(
                    ([label, field]) =>
                      renderInput(
                        label,
                        field,
                        profileForm,
                        setProfileForm,
                        {
                          disabled:
                            !isEditingProfile,
                        }
                      )
                  )}

                </div>

                <Message
                  message={
                    profileMessage
                  }
                />

                {isEditingProfile && (
                  <div className="mt-7 flex flex-wrap gap-3">

                    <button
                      type="button"
                      onClick={
                        handleSaveProfile
                      }
                      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#6C63FF] to-[#8B83FF] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-200 transition hover:-translate-y-0.5 hover:shadow-xl"
                    >
                      <Icon
                        icon="mdi:content-save-outline"
                        width="19"
                      />

                      Save Changes
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setProfileForm({
                          ...profile,
                        });

                        setIsEditingProfile(
                          false
                        );

                        setProfileMessage(
                          {}
                        );
                      }}
                      className="inline-flex items-center gap-2 rounded-xl bg-gray-100 px-6 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-200"
                    >
                      <Icon
                        icon="mdi:close"
                        width="18"
                      />

                      Cancel
                    </button>

                  </div>
                )}
              </div>
            )}

            {/* =================================================
                SECURITY
            ================================================= */}

            {activeSection ===
              "settings" && (
              <div className="space-y-6">

                {/* PASSWORD */}

                <div className="rounded-2xl border border-purple-100 bg-white p-5 shadow-[0_10px_35px_rgba(108,99,255,0.07)] sm:p-8">

                  <SectionHeader
                    title="Password Security"
                    subtitle="Keep your account safe and secure"
                    icon="mdi:shield-lock-outline"
                  />

                  <div className="max-w-lg space-y-5">

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
                    ].map(
                      ([label, field]) =>
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

                  <Message
                    message={
                      passwordMessage
                    }
                  />

                  <div className="mt-7">

                    <button
                      type="button"
                      onClick={
                        handleUpdatePassword
                      }
                      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#6C63FF] to-[#8B83FF] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-200 transition hover:-translate-y-0.5 hover:shadow-xl"
                    >
                      <Icon
                        icon="mdi:lock-check-outline"
                        width="19"
                      />

                      Update Password
                    </button>

                  </div>

                </div>

                {/* PREFERENCES */}

                <div className="rounded-2xl border border-pink-100 bg-white p-5 shadow-[0_10px_35px_rgba(255,107,157,0.07)] sm:p-8">

                  <SectionHeader
                    title="Preferences"
                    subtitle="Choose how you want to receive updates"
                    icon="mdi:bell-heart-outline"
                  />

                  {/* EMAIL */}

                  <div className="flex items-center justify-between rounded-xl border border-purple-100 bg-purple-50/40 px-4 py-4">

                    <div className="flex items-start gap-3">

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100">
                        <Icon
                          icon="mdi:email-outline"
                          width="20"
                          className="text-[#6C63FF]"
                        />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-gray-800">
                          Email Notifications
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          Receive order updates
                          and invoices via
                          email
                        </p>
                      </div>

                    </div>

                    <input
                      type="checkbox"
                      defaultChecked
                      className="h-5 w-5 cursor-pointer accent-[#6C63FF]"
                    />

                  </div>

                  {/* MARKETING */}

                  <div className="mt-3 flex items-center justify-between rounded-xl border border-pink-100 bg-pink-50/40 px-4 py-4">

                    <div className="flex items-start gap-3">

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pink-100">
                        <Icon
                          icon="mdi:tag-heart-outline"
                          width="20"
                          className="text-[#FF6B9D]"
                        />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-gray-800">
                          Marketing &
                          Promotions
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          Get early access
                          to sales and
                          exclusive offers
                        </p>
                      </div>

                    </div>

                    <input
                      type="checkbox"
                      className="h-5 w-5 cursor-pointer accent-[#FF6B9D]"
                    />

                  </div>

                </div>
              </div>
            )}

            {/* =================================================
                ADDRESSES
            ================================================= */}

            {activeSection ===
              "addresses" && (
              <div className="rounded-2xl border border-purple-100 bg-white p-5 shadow-[0_10px_35px_rgba(108,99,255,0.07)] sm:p-8">

                <SectionHeader
                  title="Delivery Addresses"
                  subtitle="Manage your saved shipping and billing locations"
                  icon="mdi:map-marker-heart-outline"
                  action={
                    !showAddressForm && (
                      <button
                        type="button"
                        onClick={() =>
                          handleOpenAddress()
                        }
                        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#FF6B9D] to-[#FF8DB5] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-pink-200 transition hover:-translate-y-0.5 hover:shadow-lg"
                      >
                        <Icon
                          icon="mdi:plus"
                          width="20"
                        />

                        Add New Address
                      </button>
                    )
                  }
                />

                <Message
                  message={
                    addressMessage
                  }
                />

                {/* ADDRESS FORM */}

                {showAddressForm ? (
                  <div className="mt-6 rounded-2xl border border-purple-100 bg-gradient-to-br from-purple-50/70 to-pink-50/50 p-5 sm:p-6">

                    <div className="mb-6 flex items-start justify-between">

                      <div className="flex items-start gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
                          <Icon
                            icon="mdi:map-marker-plus-outline"
                            width="22"
                            className="text-[#6C63FF]"
                          />
                        </div>

                        <div>
                          <h3 className="text-lg font-bold text-gray-900">
                            {editingAddressId !==
                            null
                              ? "Edit Address"
                              : "Add New Address"}
                          </h3>

                          <p className="mt-1 text-xs text-gray-500">
                            Provide accurate
                            details for
                            seamless
                            deliveries
                          </p>
                        </div>

                      </div>

                      <IconButton
                        size="small"
                        onClick={() => {
                          setShowAddressForm(
                            false
                          );

                          setEditingAddressId(
                            null
                          );

                          setAddressForm({
                            ...EMPTY_ADDRESS,
                          });
                        }}
                        sx={{
                          backgroundColor:
                            "white",
                          "&:hover": {
                            backgroundColor:
                              "#f3f4f6",
                          },
                        }}
                      >
                        <Icon
                          icon="mdi:close"
                          width="20"
                        />
                      </IconButton>

                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                      {[
                        [
                          "Full Name",
                          "name",
                        ],
                        [
                          "Address Tag",
                          "type",
                        ],
                        [
                          "Phone Number",
                          "phone",
                        ],
                        [
                          "Country",
                          "country",
                        ],
                        [
                          "City",
                          "city",
                        ],
                        [
                          "State",
                          "state",
                        ],
                        [
                          "Pincode",
                          "pincode",
                        ],
                      ].map(
                        ([label, field]) =>
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

                    <div className="mt-7 flex flex-wrap gap-3">

                      <button
                        type="button"
                        onClick={
                          handleSaveAddress
                        }
                        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#6C63FF] to-[#8B83FF] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-200 transition hover:-translate-y-0.5 hover:shadow-xl"
                      >
                        <Icon
                          icon={
                            editingAddressId !==
                            null
                              ? "mdi:check-bold"
                              : "mdi:content-save-outline"
                          }
                          width="19"
                        />

                        {editingAddressId !==
                        null
                          ? "Update Address"
                          : "Save Address"}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setShowAddressForm(
                            false
                          );

                          setEditingAddressId(
                            null
                          );
                        }}
                        className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-gray-600 shadow-sm ring-1 ring-gray-200 transition hover:bg-gray-50"
                      >
                        Cancel
                      </button>

                    </div>
                  </div>
                ) : addresses.length ===
                  0 ? (

                  /* EMPTY ADDRESS */

                  <div className="mt-6 rounded-2xl border-2 border-dashed border-purple-200 bg-gradient-to-br from-purple-50/50 to-pink-50/50 p-12 text-center">

                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm">
                      <Icon
                        icon="mdi:map-marker-off-outline"
                        width="35"
                        className="text-[#6C63FF]"
                      />
                    </div>

                    <p className="mt-4 text-base font-bold text-gray-800">
                      No saved addresses
                      found
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Add an address to
                      speed up checkout.
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        handleOpenAddress()
                      }
                      className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#FF6B9D] to-[#FF8DB5] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-pink-200"
                    >
                      <Icon
                        icon="mdi:plus"
                        width="19"
                      />

                      Add First Address
                    </button>

                  </div>

                ) : (

                  /* ADDRESS LIST */

                  <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">

                    {addresses.map(
                      (address) => (
                        <div
                          key={address.id}
                          className={`overflow-hidden rounded-2xl border bg-white transition-all duration-200 ${
                            selectedAddress ===
                            address.id
                              ? "border-[#6C63FF] shadow-lg shadow-purple-100"
                              : "border-gray-200 hover:-translate-y-0.5 hover:border-purple-200 hover:shadow-md"
                          }`}
                        >

                          {/* CARD TOP */}

                          <div
                            className={`h-1.5 ${
                              selectedAddress ===
                              address.id
                                ? "bg-gradient-to-r from-[#6C63FF] to-[#FF6B9D]"
                                : "bg-gray-100"
                            }`}
                          />

                          <div className="p-5">

                            <AddressCard
                              address={
                                address
                              }
                              selected={
                                selectedAddress ===
                                address.id
                              }
                              onSelect={() =>
                                handleSelectAddress(
                                  address
                                )
                              }
                            />

                            <div className="mt-4 flex justify-end gap-2 border-t border-gray-100 pt-4">

                              <button
                                type="button"
                                onClick={() =>
                                  handleOpenAddress(
                                    address
                                  )
                                }
                                className="inline-flex items-center gap-1.5 rounded-lg bg-purple-50 px-3.5 py-2 text-xs font-semibold text-[#6C63FF] transition hover:bg-purple-100"
                              >
                                <Icon
                                  icon="mdi:pencil-outline"
                                  width="15"
                                />

                                Edit
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  handleDeleteAddress(
                                    address.id
                                  )
                                }
                                className="inline-flex items-center gap-1.5 rounded-lg bg-rose-50 px-3.5 py-2 text-xs font-semibold text-rose-600 transition hover:bg-rose-100"
                              >
                                <Icon
                                  icon="mdi:trash-can-outline"
                                  width="15"
                                />

                                {deleteId ===
                                address.id
                                  ? "Confirm Delete"
                                  : "Delete"}
                              </button>

                            </div>

                          </div>
                        </div>
                      )
                    )}

                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Profile;