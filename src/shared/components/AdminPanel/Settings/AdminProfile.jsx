import React from "react";
import { TextField } from "@mui/material";
import SettingsCard from "./SettingsCard";
import SettingsInput from "./SettingsInput";

const AdminProfile = ({ form, onCancel }) => {
  return (
    <form onSubmit={form.handleSubmit}>
      <SettingsCard
        title="Shop Information"
        onSave={form.handleSubmit}
        onCancel={() => onCancel(form)}
      >
        <div className="flex flex-col gap-5">
          <SettingsInput
            label="Shop Name"
            name="shopName"
            value={form.values.shopName}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            error={form.touched.shopName && Boolean(form.errors.shopName)}
            helperText={form.touched.shopName && form.errors.shopName}
          />

          <div className="grid grid-cols-2 gap-6">
            <SettingsInput
              label="Contact Number"
              name="phone"
              value={form.values.phone}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.touched.phone && Boolean(form.errors.phone)}
              helperText={form.touched.phone && form.errors.phone}
            />

            <SettingsInput
              label="Email"
              name="email"
              type="email"
              value={form.values.email}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.touched.email && Boolean(form.errors.email)}
              helperText={form.touched.email && form.errors.email}
            />
          </div>

          <div>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Address"
              name="address"
              value={form.values.address}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.touched.address && Boolean(form.errors.address)}
              helperText={form.touched.address && form.errors.address}
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
  );
};

export default AdminProfile;
