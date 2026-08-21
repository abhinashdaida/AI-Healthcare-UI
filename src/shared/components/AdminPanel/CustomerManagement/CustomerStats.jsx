import { Icon } from "@iconify/react";
import { Typography } from "@mui/material";
import React from "react";

const CustomerStats = ({
  totalCustomers,
  totalActiveCustomers,
  totalBlockedCustomers,
}) => {
  const stats = [
    {
      title: "Total Customers",
      value: totalCustomers,
      subtitle: "All registered customers",
      icon: "lucide:users",
      iconColor: "#7B0FB5",
      bgColor: "#F3E8FF",
    },
    {
      title: "Active Customers",
      value: totalActiveCustomers,
      subtitle: "Currently active accounts",
      icon: "lucide:user-check",
      iconColor: "#16A34A",
      bgColor: "#ECFDF3",
    },
    {
      title: "Blocked Customers",
      value: totalBlockedCustomers,
      subtitle: "Restricted accounts",
      icon: "lucide:user-x",
      iconColor: "#DC2626",
      bgColor: "#FEF2F2",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="
            h-[150px]
            rounded-[16px]
            border
            border-[#E5E7EB]
            p-5
            shadow-sm
            transition-all
            duration-200
            hover:-translate-y-[2px]
            hover:shadow-md
            flex
            flex-col
            justify-between
          "
          style={{
            backgroundColor: stat.bgColor,
          }}
        >
          {/* TOP SECTION */}
          <div className="flex items-center justify-between">
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 500,
                color: "#111827",
              }}
            >
              {stat.title}
            </Typography>

            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl"
              style={{
                backgroundColor: `${stat.iconColor}18`,
              }}
            >
              <Icon
                icon={stat.icon}
                width={22}
                height={22}
                color={stat.iconColor}
              />
            </div>
          </div>

          {/* BOTTOM SECTION */}
          <div className="flex items-end justify-between">
            {/* MAIN VALUE */}
            <Typography
              sx={{
                fontSize: "34px",
                fontWeight: 700,
                lineHeight: 1,
                color: "#1F2937",
                letterSpacing: "-0.5px",
              }}
            >
              {stat.value}
            </Typography>

            {/* SUBTITLE - RIGHT SIDE */}
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: 400,
                color: "#6B7280",
                textAlign: "right",
                maxWidth: "140px",
                lineHeight: "18px",
              }}
            >
              {stat.subtitle}
            </Typography>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomerStats;
