import { Icon } from "@iconify/react";
import { Paper, Typography } from "@mui/material";
import React from "react";

const CustomerSummaryCard = ({ icon, title, value }) => {
  return (
    <Paper
      elevation={0}
      className="w-full rounded-[10px] border border-[#E5E7EB] bg-white p-5">
      <div className="flex items-center gap-4">
        <div
          className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[8px] bg-[#F3E8F8]" >
          <Icon icon={icon} width={21} height={21} className="text-[#7B0FB5]" />
        </div>

        <div className="min-w-0">
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: 500,
              color: "#6B7280",
            }}
          >
            {title}
          </Typography>

          <Typography
            sx={{
              fontSize: "19px",
              fontWeight: 700,
              color: "#111827",
              marginTop: "3px",
            }}
          >
            {value}
          </Typography>
        </div>
      </div>
    </Paper>
  );
};

export default CustomerSummaryCard;
