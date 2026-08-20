import React, { useEffect, useState } from "react";
import { Avatar, Divider, IconButton, Typography } from "@mui/material";
import { Icon } from "@iconify/react";

import InputField from "../../components/common/InputField/InputField";
import Button from "../../components/common/Button/Button";
import AddressCard from "../../components/product/AddressCard/AddressCard";

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
   Helper Components
========================================================= */

const Message = ({ message }) => {
  if (!message?.text) return null;

  return (
    <div
      className={`mt-4 flex items-center gap-2 rounded-lg border px-4 py-3 text-sm shadow-sm ${
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

const SectionHeader = ({ title, subtitle, action }) => {
  return (
    <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
      <div>
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>

        <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
      </div>

      {action}
    </div>
  );
};

/* =========================================================
   Profile Component
========================================================= */

const Profile = () => {
  const [activeSection, setActiveSection] = useState("profile");

  /* =========================================================
     LOGGED-IN USER
  ========================================================= */

  const getLoggedInUser = () => {
    try {
      const storedUser = localStorage.getItem("loggedInUser");

      if (storedUser) {
        return JSON.parse(storedUser);
      }

      // Fallback if your Sign In currently stores user under "user"
      const user = localStorage.getItem("user");

      if (user) {
        return JSON.parse(user);
      }

      return {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
      };
    } catch (error) {
      console.error("Unable to load logged-in user:", error);

      return {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
      };
    }
  };

  const [profile, setProfile] = useState(getLoggedInUser);
  const [profileForm, setProfileForm] = useState(getLoggedInUser);

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileMessage, setProfileMessage] = useState({});

  /* =========================================================
     PASSWORD
  ========================================================= */

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordMessage, setPasswordMessage] = useState({});

  /* =========================================================
     ADDRESSES
  ========================================================= */

  const [addresses, setAddresses] = useState(() => {
    try {
      const savedAddresses = localStorage.getItem("addresses");

      return savedAddresses
        ? JSON.parse(savedAddresses)
        : INITIAL_ADDRESSES;
    } catch {
      return INITIAL_ADDRESSES;
    }
  });

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);

  const [addressForm, setAddressForm] = useState({
    ...EMPTY_ADDRESS,
  });

  const [addressMessage, setAddressMessage] = useState({});
  const [deleteId, setDeleteId] = useState(null);

  /* =========================================================
     LOAD USER WHEN PROFILE PAGE OPENS
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
    localStorage.setItem("addresses", JSON.stringify(addresses));
  }, [addresses]);

  /* =========================================================
     LOAD SELECTED ADDRESS
  ========================================================= */

  useEffect(() => {
    try {
      const saved = localStorage.getItem("selectedAddress");

      let fallback = addresses[0] || null;

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

      if (fallback) {
        setSelectedAddress(fallback.id);

        localStorage.setItem(
          "selectedAddress",
          JSON.stringify(fallback)
        );
      }
    } catch (error) {
      console.error("Invalid selected address:", error);
    }
  }, [addresses]);

  /* =========================================================
     GENERIC HELPERS
  ========================================================= */

  const handleChange = (setter, field, value) => {
    setter((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const clearMessages = () => {
    setProfileMessage({});
    setPasswordMessage({});
    setAddressMessage({});
  };

  /* =========================================================
     PROFILE HANDLERS
  ========================================================= */

  const handleSaveProfile = () => {
    const updated = Object.fromEntries(
      Object.entries(profileForm).map(([key, value]) => [
        key,
        typeof value === "string" ? value.trim() : value,
      ])
    );

    if (
      !updated.firstName ||
      !updated.lastName ||
      !updated.email ||
      !updated.phone
    ) {
      setProfileMessage({
        type: "error",
        text: "Please fill all profile fields.",
      });

      return;
    }

    if (!updated.email.includes("@")) {
      setProfileMessage({
        type: "error",
        text: "Please enter a valid email address.",
      });

      return;
    }

    setProfile(updated);
    setProfileForm(updated);

    /*
      Update logged-in user in localStorage
    */
    localStorage.setItem(
      "loggedInUser",
      JSON.stringify(updated)
    );

    /*
      Also update "user" if your application uses it
    */
    localStorage.setItem("user", JSON.stringify(updated));

    setIsEditingProfile(false);

    setProfileMessage({
      type: "success",
      text: "Profile updated successfully.",
    });
  };

  /* =========================================================
     PASSWORD HANDLER
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

    setPasswordMessage({
      type: "success",
      text: "Password updated successfully.",
    });

    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  /* =========================================================
     ADDRESS HANDLERS
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

  const handleOpenAddress = (address = null) => {
    setAddressMessage({});
    setDeleteId(null);

    setEditingAddressId(address?.id ?? null);

    setAddressForm(
      address
        ? {
            ...EMPTY_ADDRESS,
            ...address,
          }
        : {
            ...EMPTY_ADDRESS,
          }
    );

    setShowAddressForm(true);
  };

  const handleSaveAddress = () => {
    const requiredFields = [
      "name",
      "phone",
      "addressLine1",
      "city",
      "state",
      "pincode",
    ];

    const hasEmptyField = requiredFields.some(
      (field) => !addressForm[field]?.trim()
    );

    if (hasEmptyField) {
      setAddressMessage({
        type: "error",
        text: "Please fill all required address fields.",
      });

      return;
    }

    if (addressForm.phone.trim().length < 10) {
      setAddressMessage({
        type: "error",
        text: "Please enter a valid phone number.",
      });

      return;
    }

    if (addressForm.pincode.trim().length < 6) {
      setAddressMessage({
        type: "error",
        text: "Please enter a valid pincode.",
      });

      return;
    }

    /* EDIT ADDRESS */

    if (editingAddressId !== null) {
      const updatedAddress = {
        id: editingAddressId,
        ...addressForm,
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

    /* ADD NEW ADDRESS */

    else {
      const newAddress = {
        id: Date.now(),
        ...addressForm,
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
        text: "Address added successfully and selected.",
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
        text: "Click Delete again to confirm permanent removal.",
      });

      return;
    }

    const remaining = addresses.filter(
      (address) => address.id !== id
    );

    setAddresses(remaining);

    if (selectedAddress === id) {
      const nextSelected = remaining[0] ?? null;

      setSelectedAddress(
        nextSelected?.id ?? null
      );

      if (nextSelected) {
        localStorage.setItem(
          "selectedAddress",
          JSON.stringify(nextSelected)
        );
      } else {
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
     INPUT RENDERER
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
     LOGGED-IN USER DISPLAY VALUES
  ========================================================= */

  const firstName = profile?.firstName || "";
  const lastName = profile?.lastName || "";
  const fullName =
    `${firstName} ${lastName}`.trim() || "User";

  const email = profile?.email || "";
  const phone = profile?.phone || "";

  /* =========================================================
     UI
  ========================================================= */

  return (
    <div className="min-h-screen bg-slate-50/60 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* PAGE HEADER */}

        <div className="mb-8">
          <Typography
            sx={{
              fontSize: 32,
              fontWeight: 700,
              color: "#0f172a",
            }}
          >
            My Account
          </Typography>

          <p className="mt-1 text-sm text-slate-500">
            Manage your profile info, security settings,
            and saved addresses
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">

          {/* =================================================
              SIDEBAR
          ================================================= */}

          <div className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex flex-col items-center text-center">

              <Avatar
                sx={{
                  width: 84,
                  height: 84,
                  mb: 2,
                  bgcolor: "#3b82f6",
                  fontSize: 32,
                  fontWeight: 600,
                }}
              >
                {firstName
                  ? firstName.charAt(0).toUpperCase()
                  : "U"}
              </Avatar>

              <h2 className="text-lg font-bold text-slate-800">
                {fullName}
              </h2>

              <p className="mt-0.5 text-xs text-slate-500">
                {email || "No email available"}
              </p>
            </div>

            <Divider sx={{ my: 3 }} />

            <div className="space-y-1.5">

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
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition-all ${
                    activeSection === key
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                  }`}
                >
                  <Icon icon={icon} width="20" />

                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* =================================================
              MAIN CONTENT
          ================================================= */}

          <div className="lg:col-span-3">

            {/* =================================================
                PROFILE
            ================================================= */}

            {activeSection === "profile" && (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

                <SectionHeader
                  title="Personal Details"
                  subtitle="Update your basic profile information"
                  action={
                    !isEditingProfile && (
                      <button
                        type="button"
                        onClick={() => {
                          setProfileForm(profile);
                          setProfileMessage({});
                          setIsEditingProfile(true);
                        }}
                        className="inline-flex items-center gap-2 rounded-lg bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 transition-colors hover:bg-blue-100"
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

                {isEditingProfile && (
                  <div className="mt-6 flex gap-3">

                    <button
                      type="button"
                      onClick={handleSaveProfile}
                      className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-700"
                    >
                      <Icon
                        icon="mdi:content-save-outline"
                        width="18"
                      />

                      Save Changes
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setProfileForm(profile);
                        setIsEditingProfile(false);
                        setProfileMessage({});
                      }}
                      className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-5 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200"
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

            {activeSection === "settings" && (
              <div className="space-y-6">

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

                  <SectionHeader
                    title="Password Security"
                    subtitle="Manage your login password"
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

                  <div className="mt-6">

                    <button
                      type="button"
                      onClick={handleUpdatePassword}
                      className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-slate-800"
                    >
                      <Icon
                        icon="mdi:lock-check-outline"
                        width="18"
                      />

                      Update Password
                    </button>

                  </div>
                </div>

                {/* PREFERENCES */}

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

                  <h3 className="mb-4 border-b border-gray-100 pb-2 text-lg font-bold text-slate-900">
                    Preferences
                  </h3>

                  {[
                    [
                      "Email Notifications",
                      "Receive order updates and invoices via email",
                      true,
                    ],
                    [
                      "Marketing & Promotions",
                      "Get early access to sales and exclusive offers",
                      false,
                    ],
                  ].map(
                    ([title, text, checked]) => (
                      <div
                        key={title}
                        className="flex items-center justify-between border-b border-slate-100 py-4 last:border-0 last:pb-0"
                      >
                        <div>
                          <p className="text-sm font-semibold text-slate-800">
                            {title}
                          </p>

                          <p className="mt-0.5 text-xs text-slate-500">
                            {text}
                          </p>
                        </div>

                        <input
                          type="checkbox"
                          defaultChecked={checked}
                          className="h-4 w-4 cursor-pointer rounded accent-blue-600"
                        />
                      </div>
                    )
                  )}

                </div>
              </div>
            )}

            {/* =================================================
                ADDRESSES
            ================================================= */}

            {activeSection === "addresses" && (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

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
                        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700"
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

                <Message message={addressMessage} />

                {/* ADDRESS FORM */}

                {showAddressForm ? (
                  <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50/30 p-6">

                    <div className="mb-6 flex items-start justify-between">

                      <div>
                        <h3 className="text-lg font-bold text-slate-900">
                          {editingAddressId !== null
                            ? "Edit Address"
                            : "Add New Address"}
                        </h3>

                        <p className="mt-1 text-xs text-slate-500">
                          Provide accurate details for seamless
                          deliveries
                        </p>
                      </div>

                      <IconButton
                        size="small"
                        onClick={() =>
                          setShowAddressForm(false)
                        }
                      >
                        <Icon
                          icon="mdi:close"
                          width="20"
                        />
                      </IconButton>
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                      {[
                        ["Full Name", "name"],
                        [
                          "Address Tag (e.g. Home, Office)",
                          "type",
                        ],
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

                    <div className="mt-6 flex gap-3">

                      <button
                        type="button"
                        onClick={handleSaveAddress}
                        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-700"
                      >
                        <Icon
                          icon={
                            editingAddressId !== null
                              ? "mdi:check-bold"
                              : "mdi:content-save-outline"
                          }
                          width="18"
                        />

                        {editingAddressId !== null
                          ? "Update Address"
                          : "Save Address"}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setShowAddressForm(false)
                        }
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
                      >
                        <Icon
                          icon="mdi:close"
                          width="18"
                        />

                        Cancel
                      </button>

                    </div>
                  </div>
                ) : addresses.length === 0 ? (

                  /* NO ADDRESSES */

                  <div className="mt-6 rounded-xl border-2 border-dashed border-slate-200 p-12 text-center">

                    <Icon
                      icon="mdi:map-marker-off-outline"
                      width="48"
                      className="mx-auto text-slate-300"
                    />

                    <p className="mt-3 text-base font-semibold text-slate-700">
                      No saved addresses found
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Add an address to speed up your
                      checkout process.
                    </p>

                    <div className="mt-5">

                      <button
                        type="button"
                        onClick={() =>
                          handleOpenAddress()
                        }
                        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700"
                      >
                        <Icon
                          icon="mdi:plus"
                          width="18"
                        />

                        Add First Address
                      </button>

                    </div>
                  </div>

                ) : (

                  /* ADDRESS LIST */

                  <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">

                    {addresses.map((address) => (
                      <div
                        key={address.id}
                        className="group relative flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 transition-all hover:border-slate-300 hover:shadow-md"
                      >

                        <AddressCard
                          address={address}
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

                        {/* ACTION BUTTONS */}

                        <div className="mt-4 flex items-center justify-end gap-2 border-t border-slate-100 pt-3">

                          <button
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();

                              handleOpenAddress(
                                address
                              );
                            }}
                            className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600 transition-colors hover:bg-blue-100"
                          >
                            <Icon
                              icon="mdi:pencil"
                              width="14"
                            />

                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();

                              handleDeleteAddress(
                                address.id
                              );
                            }}
                            className="inline-flex items-center gap-1 rounded-md bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-600 transition-colors hover:bg-rose-100"
                          >
                            <Icon
                              icon="mdi:trash-can-outline"
                              width="14"
                            />

                            Delete
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