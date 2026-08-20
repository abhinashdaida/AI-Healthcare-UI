import React from "react";
import { Paper, Button, Typography } from "@mui/material";

const SettingsCard = ({
  title,
  children,
  onSave,
  onCancel,
}) => {
  return (
    <Paper className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-none" style={{ borderRadius: "12px" }}>

      {/* Card Header */}
      <div className="border-b border-gray-200 px-6 py-5">
        <Typography variant="h6" component="h2" className="!text-lg !font-semibold !text-gray-900">
          {title}
        </Typography>
      </div>

      {/* Card Content */}
      <div className="px-6 py-6">
        {children}
      </div>

      {/* Card Actions */}
      <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">

        <Button
          type="button"
          onClick={onCancel}
          variant="outlined"
          sx={{
            px: 3,
            py: 1,
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: 500,
            fontSize: "0.875rem",
            color: "#374151",
            borderColor: "#D1D5DB",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "#F9FAFB",
              borderColor: "#9CA3AF",
              boxShadow: "none",
            },
          }}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          onClick={onSave}
          variant="contained"
          sx={{
            px: 3,
            py: 1,
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: 500,
            fontSize: "0.875rem",
            backgroundColor: "#7B0FB5",
            color: "white",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "#6B0DA0",
              boxShadow: "none",
            },
          }}
        >
          Save Changes
        </Button>

      </div>
    </Paper>
  );
};

export default SettingsCard;