import React, { useEffect, useState } from "react";
import { Avatar, Divider, IconButton, Typography } from "@mui/material";
import { Icon } from "@iconify/react";

import InputField from "../../components/common/InputField/InputField";
import Button from "../../components/common/Button/Button";
import AddressCard from "../../components/product/AddressCard/AddressCard";

const EMPTY_ADDRESS = {
  name: "", type: "Home", phone: "", addressLine1: "", addressLine2: "",
  city: "", state: "", pincode: "", country: "India",
};

const INITIAL_ADDRESSES = [
  { id: 1, name: "Swathi M", type: "Home", phone: "+91 9876543210", addressLine1: "123 Main Street", addressLine2: "Near City Center", city: "Hyderabad", state: "Telangana", pincode: "500001", country: "India" },
  { id: 2, name: "Swathi M", type: "Office", phone: "+91 9876543210", addressLine1: "456 Business Road", addressLine2: "Hitech City", city: "Hyderabad", state: "Telangana", pincode: "500081", country: "India" },
];

/* Helper UI Components */
const Message = ({ message }) => message?.text ? (
  <div className={`mt-4 flex items-center gap-2 rounded-lg border px-4 py-3 text-sm transition-all shadow-sm ${
    message.type === "success" 
      ? "border-emerald-200 bg-emerald-50 text-emerald-800" 
      : "border-rose-200 bg-rose-50 text-rose-800"
  }`}>
    <Icon icon={message.type === "success" ? "mdi:check-circle" : "mdi:alert-circle"} width="20" className="flex-shrink-0" />
    <span className="font-medium">{message.text}</span>
  </div>
) : null;

const SectionHeader = ({ title, subtitle, action }) => (
  <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
    <div>
      <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
    </div>
    {action}
  </div>
);

const Profile = () => {
  const [activeSection, setActiveSection] = useState("profile");

  /* ================= PROFILE ================= */
  const [profile, setProfile] = useState({ firstName: "Swathi", lastName: "M", email: "swathi@example.com", phone: "+91 9876543210" });
  const [profileForm, setProfileForm] = useState(profile);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileMessage, setProfileMessage] = useState({});

  /* ================= PASSWORD ================= */
  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [passwordMessage, setPasswordMessage] = useState({});

  /* ================= ADDRESSES ================= */
  const [addresses, setAddresses] = useState(INITIAL_ADDRESSES);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [addressForm, setAddressForm] = useState(EMPTY_ADDRESS);
  const [addressMessage, setAddressMessage] = useState({});
  const [deleteId, setDeleteId] = useState(null);

  /* Load Selected Address */
  useEffect(() => {
    const saved = localStorage.getItem("selectedAddress");
    let fallback = addresses[0] || null;

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const exists = addresses.some((a) => a.id === parsed.id);
        if (exists) {
          setSelectedAddress(parsed.id);
          return;
        }
      } catch (e) {
        console.error("Invalid selected address:", e);
      }
    }

    if (fallback) {
      setSelectedAddress(fallback.id);
      localStorage.setItem("selectedAddress", JSON.stringify(fallback));
    }
  }, []);

  /* Generic State Helper */
  const handleChange = (setter, field, value) => setter((prev) => ({ ...prev, [field]: value }));
  const clearMessages = () => { setProfileMessage({}); setPasswordMessage({}); setAddressMessage({}); };

  /* Profile Handlers */
  const handleSaveProfile = () => {
    const updated = Object.fromEntries(Object.entries(profileForm).map(([k, v]) => [k, v.trim()]));
    if (Object.values(updated).some((v) => !v)) return setProfileMessage({ type: "error", text: "Please fill all profile fields." });
    if (!updated.email.includes("@")) return setProfileMessage({ type: "error", text: "Please enter a valid email address." });

    setProfile(updated);
    setProfileForm(updated);
    setIsEditingProfile(false);
    setProfileMessage({ type: "success", text: "Profile updated successfully." });
  };

  /* Password Handlers */
  const handleUpdatePassword = () => {
    const { currentPassword, newPassword, confirmPassword } = passwordForm;
    if (!currentPassword || !newPassword || !confirmPassword) return setPasswordMessage({ type: "error", text: "Please fill all password fields." });
    if (newPassword.length < 6) return setPasswordMessage({ type: "error", text: "Password must contain at least 6 characters." });
    if (newPassword !== confirmPassword) return setPasswordMessage({ type: "error", text: "New password and confirm password do not match." });
    if (currentPassword === newPassword) return setPasswordMessage({ type: "error", text: "New password must be different from current password." });

    setPasswordMessage({ type: "success", text: "Password updated successfully." });
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  /* Address Handlers */
  const handleSelectAddress = (address) => {
    setSelectedAddress(address.id);
    localStorage.setItem("selectedAddress", JSON.stringify(address));
    setAddressMessage({ type: "success", text: `${address.type} address selected successfully.` });
  };

  const handleOpenAddress = (address = null) => {
    setAddressMessage({});
    setDeleteId(null);
    setEditingAddressId(address?.id ?? null);
    setAddressForm(address ? { ...EMPTY_ADDRESS, ...address } : { ...EMPTY_ADDRESS });
    setShowAddressForm(true);
  };

  const handleSaveAddress = () => {
    const required = ["name", "phone", "addressLine1", "city", "state", "pincode"];
    if (required.some((f) => !addressForm[f]?.trim())) return setAddressMessage({ type: "error", text: "Please fill all required address fields." });
    if (addressForm.phone.trim().length < 10) return setAddressMessage({ type: "error", text: "Please enter a valid phone number." });
    if (addressForm.pincode.trim().length < 6) return setAddressMessage({ type: "error", text: "Please enter a valid pincode." });

    if (editingAddressId !== null) {
      const updated = { id: editingAddressId, ...addressForm };
      setAddresses((prev) => prev.map((a) => (a.id === editingAddressId ? updated : a)));
      if (selectedAddress === editingAddressId) localStorage.setItem("selectedAddress", JSON.stringify(updated));
      setAddressMessage({ type: "success", text: "Address updated successfully." });
    } else {
      const newAddress = { id: Date.now(), ...addressForm };
      setAddresses((prev) => [...prev, newAddress]);
      setSelectedAddress(newAddress.id);
      localStorage.setItem("selectedAddress", JSON.stringify(newAddress));
      setAddressMessage({ type: "success", text: "Address added successfully and selected." });
    }

    setAddressForm({ ...EMPTY_ADDRESS });
    setEditingAddressId(null);
    setShowAddressForm(false);
  };

  const handleDeleteAddress = (id) => {
    if (deleteId !== id) {
      setDeleteId(id);
      return setAddressMessage({ type: "error", text: "Click Delete again to confirm permanent removal." });
    }

    const remaining = addresses.filter((a) => a.id !== id);
    setAddresses(remaining);

    if (selectedAddress === id) {
      const nextSelected = remaining[0] ?? null;
      setSelectedAddress(nextSelected?.id ?? null);
      if (nextSelected) localStorage.setItem("selectedAddress", JSON.stringify(nextSelected));
      else localStorage.removeItem("selectedAddress");
    }

    setDeleteId(null);
    setAddressMessage({ type: "success", text: "Address deleted successfully." });
  };

  /* Helper to render Input Fields concisely */
  const renderInput = (label, field, form, setter, props = {}) => (
    <InputField
      key={field}
      label={label}
      value={form[field] ?? ""}
      onChange={(e) => handleChange(setter, field, e.target.value)}
      placeholder={label}
      {...props}
    />
  );

  return (
    <div className="min-h-screen bg-slate-50/60 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-8">
          <Typography sx={{ fontSize: 32, fontWeight: 700, color: '#0f172a' }}>My Account</Typography>
          <p className="mt-1 text-sm text-slate-500">Manage your profile info, security settings, and saved addresses</p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          
          {/* Sidebar */}
          <div className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col items-center text-center">
              <Avatar sx={{ width: 84, height: 84, mb: 2, bgcolor: '#3b82f6', fontSize: 32, fontWeight: 600 }}>
                {profile.firstName.charAt(0)}
              </Avatar>
              <h2 className="text-lg font-bold text-slate-800">{profile.firstName} {profile.lastName}</h2>
              <p className="mt-0.5 text-xs text-slate-500">{profile.email}</p>
            </div>

            <Divider sx={{ my: 3 }} />

            <div className="space-y-1.5">
              {[
                ["profile", "mdi:account-outline", "Profile Overview"],
                ["settings", "mdi:shield-lock-outline", "Security & Preferences"],
                ["addresses", "mdi:map-marker-outline", "Saved Addresses"],
              ].map(([key, icon, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => { setActiveSection(key); clearMessages(); }}
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

          {/* Main Content Area */}
          <div className="lg:col-span-3">

            {/* Profile Section */}
            {activeSection === "profile" && (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
                <SectionHeader
                  title="Personal Details"
                  subtitle="Update your basic profile information"
                  action={!isEditingProfile && (
                    <button 
                      type="button" 
                      onClick={() => { setProfileForm(profile); setProfileMessage({}); setIsEditingProfile(true); }}
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <Icon icon="mdi:pencil-outline" width="18" />
                      Edit Details
                    </button>
                  )}
                />
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  {[["First Name", "firstName"], ["Last Name", "lastName"], ["Email Address", "email"], ["Phone Number", "phone"]].map(([lbl, fld]) =>
                    renderInput(lbl, fld, profileForm, setProfileForm, { disabled: !isEditingProfile })
                  )}
                </div>
                <Message message={profileMessage} />
                {isEditingProfile && (
                  <div className="mt-6 flex gap-3">
                    <button 
                      type="button" 
                      onClick={handleSaveProfile}
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm transition-all"
                    >
                      <Icon icon="mdi:content-save-outline" width="18" />
                      Save Changes
                    </button>
                    <button 
                      type="button" 
                      onClick={() => { setProfileForm(profile); setIsEditingProfile(false); setProfileMessage({}); }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
                    >
                      <Icon icon="mdi:close" width="18" />
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Settings Section */}
            {activeSection === "settings" && (
              <div className="space-y-6">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
                  <SectionHeader title="Password Security" subtitle="Manage your login password" />
                  <div className="space-y-5 max-w-lg">
                    {[["Current Password", "currentPassword"], ["New Password", "newPassword"], ["Confirm New Password", "confirmPassword"]].map(([lbl, fld]) =>
                      renderInput(lbl, fld, passwordForm, setPasswordForm, { type: "password" })
                    )}
                  </div>
                  <Message message={passwordMessage} />
                  <div className="mt-6">
                    <button 
                      type="button" 
                      onClick={handleUpdatePassword}
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 shadow-sm transition-colors"
                    >
                      <Icon icon="mdi:lock-check-outline" width="18" />
                      Update Password
                    </button>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-gray-100">Preferences</h3>
                  {[
                    ["Email Notifications", "Receive order updates and invoices via email", true],
                    ["Marketing & Promotions", "Get early access to sales and exclusive offers", false],
                  ].map(([title, text, checked]) => (
                    <div key={title} className="flex items-center justify-between border-b border-slate-100 py-4 last:border-0 last:pb-0">
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{title}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{text}</p>
                      </div>
                      <input type="checkbox" defaultChecked={checked} className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500 accent-blue-600 cursor-pointer" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Address Management Section */}
            {activeSection === "addresses" && (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
                <SectionHeader
                  title="Delivery Addresses"
                  subtitle="Manage your saved shipping and billing locations"
                  action={!showAddressForm && (
                    <button 
                      type="button" 
                      onClick={() => handleOpenAddress()}
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm transition-all"
                    >
                      <Icon icon="mdi:plus" width="20" />
                      Add New Address
                    </button>
                  )}
                />
                <Message message={addressMessage} />

                {showAddressForm ? (
                  <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50/30 p-6">
                    <div className="mb-6 flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">{editingAddressId !== null ? "Edit Address" : "Add New Address"}</h3>
                        <p className="mt-1 text-xs text-slate-500">Provide accurate details for seamless deliveries</p>
                      </div>
                      <IconButton size="small" onClick={() => setShowAddressForm(false)} className="text-slate-400 hover:text-slate-600">
                        <Icon icon="mdi:close" width="20" />
                      </IconButton>
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                      {[["Full Name", "name"], ["Address Tag (e.g. Home, Office)", "type"], ["Phone Number", "phone"], ["Country", "country"], ["City", "city"], ["State", "state"], ["Pincode", "pincode"]].map(([lbl, fld]) =>
                        renderInput(lbl, fld, addressForm, setAddressForm)
                      )}
                      <div className="md:col-span-2">{renderInput("Address Line 1", "addressLine1", addressForm, setAddressForm, { placeholder: "House/Flat number, Street name" })}</div>
                      <div className="md:col-span-2">{renderInput("Address Line 2", "addressLine2", addressForm, setAddressForm, { placeholder: "Apartment name, Landmark (Optional)" })}</div>
                    </div>

                    <div className="mt-6 flex gap-3">
                      <button 
                        type="button" 
                        onClick={handleSaveAddress}
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm transition-all"
                      >
                        <Icon icon={editingAddressId !== null ? "mdi:check-bold" : "mdi:content-save-outline"} width="18" />
                        {editingAddressId !== null ? "Update Address" : "Save Address"}
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setShowAddressForm(false)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : addresses.length === 0 ? (
                  <div className="mt-6 rounded-xl border-2 border-dashed border-slate-200 p-12 text-center">
                    <Icon icon="mdi:map-marker-off-outline" width="48" className="mx-auto text-slate-300" />
                    <p className="mt-3 text-base font-semibold text-slate-700">No saved addresses found</p>
                    <p className="text-xs text-slate-500 mt-1">Add an address to speed up your checkout process.</p>
                    <div className="mt-5">
                      <button 
                        type="button" 
                        onClick={() => handleOpenAddress()}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm transition-all"
                      >
                        <Icon icon="mdi:plus" width="18" />
                        Add First Address
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                    {addresses.map((addr) => (
                      <div key={addr.id} className="relative group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 hover:border-slate-300 hover:shadow-md transition-all">
                        {/* Address Card Outer Container */}
                        <AddressCard
                          address={addr}
                          selected={selectedAddress === addr.id}
                          onSelect={() => handleSelectAddress(addr)}
                        />

                        {/* Explicit Styled Action Buttons (Edit / Delete) */}
                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); handleOpenAddress(addr); }}
                            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
                          >
                            <Icon icon="mdi:pencil" width="14" />
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); handleDeleteAddress(addr.id); }}
                            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-rose-600 bg-rose-50 rounded-md hover:bg-rose-100 transition-colors"
                          >
                            <Icon icon="mdi:trash-can-outline" width="14" />
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