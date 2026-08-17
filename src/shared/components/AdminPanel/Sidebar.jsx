import { Icon } from "@iconify/react";
import { Box, Typography } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const menuItems = [
  {
    label: "Dashboard",
    icon: "lucide:house",
    path: "/dashboard",
  },
  {
    label: "Products",
    icon: "lucide:package",
    path: "/product",
  },
  {
    label: "Orders",
    icon: "lucide:clipboard-list",
    path: "/order",
  },
  {
    label: "Customer Management",
    icon: "lucide:users",
    path: "/customer-management",
  },
  {
    label: "review",
    icon: "lucide:star",
    path: "/review",
  },
  {
    label: "reports",
    icon: "lucide:chart-column",
    path: "/reports",
  },
  {
    label: "settings",
    icon: "lucide:settings",
    path: "/settings",
  },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Safely get current pathname
  const currentPath = location?.pathname || "";

  const isActive = (path) => {
    if (!path || !currentPath) {
      return false;
    }

    // Dashboard should only be active on exact dashboard URL
    if (path === "/dashboard") {
      return currentPath === path;
    }

    // Other menu items
    return currentPath === path || currentPath.startsWith(`${path}/`);
  };

  const handleNavigation = (path) => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <Box component="aside"
      className=" fixed left-0  top-0 z-[100] flex
        h-screen  w-[248px]  min-w-[248px]
        flex-col  border-r
        border-[#E1E4E8]  bg-white
      "
    >
      {/* LOGO*/}
      <Box className=" flex  h-[76px]  min-h-[76px]  items-center border-b  border-[#E1E4E8] px-[30px]  "   >
        <Typography  className=" !text-[18px]  !font-semibold
            !leading-none !tracking-[-0.4px] !text-[#7B0FB5]  "
        >
          Stackly Admin Panel
        </Typography>
      </Box>

      {/*    MENU */}
      <Box
        component="nav"
        className=" flex-1  overflow-y-auto  px-[15px]  py-[16px]  " >
        <Box className="flex flex-col gap-1">
          {menuItems.map((item) => {
            const active = isActive(item.path);

            return (
              <Box
                key={item.path}
                component="button"
                type="button"
                onClick={() => handleNavigation(item.path)}
                className={`   group
                  flex  h-[41px]  w-full  items-center  rounded-[8px]
                  px-[15px] text-left
                  transition-all  duration-200
                  ${
                    active
                      ? "bg-[#7B0FB5]"
                      : "bg-transparent hover:bg-[#F7ECFB]"
                  }
                `}
              >
                {/* Icon */}
                <Icon
                  icon={item.icon}
                  width={19}
                  height={19}
                  className={`
                    mr-[14px]
                    shrink-0
                    transition-colors
                    duration-200
                    ${
                      active
                        ? "text-white"
                        : "text-[#34445E] group-hover:text-[#7B0FB5]"
                    }
                  `}
                />

                {/* Label */}
                <Typography
                  className={`
                    !text-[13px]
                    !font-medium
                    !leading-none
                    transition-colors
                    duration-200
                    ${
                      active
                        ? "!text-white"
                        : "!text-[#243B63] group-hover:!text-[#7B0FB5]"
                    }
                  `}
                >
                  {item.label}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
