import React from "react";
import { Typography, Button } from "@mui/material";
import SettingsCard from "./SettingsCard";
import SettingsInput from "./SettingsInput";

const ProfileSettings = ({ form, onCancel, showPassword, setShowPassword }) => {
  return (
    <form onSubmit={form.handleSubmit}>
      <SettingsCard
        title="Administrator Information"
        onSave={form.handleSubmit}
        onCancel={() => onCancel(form)}
      >
        <div className="grid grid-cols-2 gap-8">
          {/* LEFT - ADMINISTRATOR INFORMATION */}
          <div className="flex flex-col gap-5">
            <SettingsInput
              label="Admin Name"
              name="name"
              value={form.values.name}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.touched.name && Boolean(form.errors.name)}
              helperText={form.touched.name && form.errors.name}
            />

            <SettingsInput
              label="Admin Email"
              name="email"
              type="email"
              value={form.values.email}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.touched.email && Boolean(form.errors.email)}
              helperText={form.touched.email && form.errors.email}
            />

            <SettingsInput
              label="Phone Number"
              name="phone"
              value={form.values.phone}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.touched.phone && Boolean(form.errors.phone)}
              helperText={form.touched.phone && form.errors.phone}
            />

            <SettingsInput
              label="Username"
              name="username"
              value={form.values.username}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.touched.username && Boolean(form.errors.username)}
              helperText={form.touched.username && form.errors.username}
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
                value={form.values.password}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={form.touched.password && Boolean(form.errors.password)}
                helperText={form.touched.password && form.errors.password}
                placeholder="Enter password"
              />

              <SettingsInput
                label="Confirm Password"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                value={form.values.confirmPassword}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={form.touched.confirmPassword && Boolean(form.errors.confirmPassword)}
                helperText={form.touched.confirmPassword && form.errors.confirmPassword}
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
  );
};

export default ProfileSettings;
