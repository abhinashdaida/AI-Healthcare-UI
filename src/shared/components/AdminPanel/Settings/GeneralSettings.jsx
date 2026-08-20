import React from "react";
import SettingsCard from "./SettingsCard";
import SettingsInput from "./SettingsInput";
import SettingsSelect from "./SettingsSelect";

const GeneralSettings = ({ form, onCancel }) => {
  return (
    <form onSubmit={form.handleSubmit}>
      <SettingsCard
        title="Application Settings"
        onSave={form.handleSubmit}
        onCancel={() => onCancel(form)}
      >
        <div className="flex flex-col gap-5">
          {/* Website Name + Currency */}
          <div className="grid grid-cols-2 gap-6">
            <SettingsInput
              label="Website Name"
              name="websiteName"
              value={form.values.websiteName}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.touched.websiteName && Boolean(form.errors.websiteName)}
              helperText={form.touched.websiteName && form.errors.websiteName}
            />

            <SettingsSelect
              label="Currency"
              name="currency"
              value={form.values.currency}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.touched.currency && Boolean(form.errors.currency)}
              helperText={form.touched.currency && form.errors.currency}
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
              value={form.values.country}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.touched.country && Boolean(form.errors.country)}
              helperText={form.touched.country && form.errors.country}
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
              value={form.values.language}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.touched.language && Boolean(form.errors.language)}
              helperText={form.touched.language && form.errors.language}
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
  );
};

export default GeneralSettings;
