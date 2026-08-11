
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import logo from "../../../../assets/logo.png";

const ReuseSiderBar = ({ menuItems = [] }) => {
  return (
    <Box
      component="aside"
      className="
        w-[336px] min-w-[336px]
        bg-white
        border-r border-gray-200
        flex flex-col
        px-8 py-8
        max-lg:w-[280px] max-lg:min-w-[280px] max-md:hidden " >
      {/* ================= LOGO ================= */}

      <Box className="flex items-center gap-3 mb-16">
        <Box className="w-10 h-10 flex items-center justify-center">
          <img
            src={logo}
            alt="MediConnect"
            className="w-full h-full object-contain"
          />
        </Box>

        <Box>
          <Typography className=" text-[15px]! font-semibold!  text-[#24333b]! leading-4! " >
            MediConnect
          </Typography>

          <Typography className=" text-[8px]!  text-[#8a959b]! tracking-wide! " >
            Healthcare Ecosystem
          </Typography>
        </Box>
      </Box>

      {/* ================= SIDEBAR ================= */}

      <Box className="flex flex-col">
        {menuItems.map((item) => (
          <SidebarItem key={item.label} item={item} />
        ))}
      </Box>
    </Box>
  );
};

/* =====================================================
   SIDEBAR ITEM
===================================================== */

const SidebarItem = ({ item }) => {
  const {
    label,
    icon,
    child,
    active,
    completed,
    disabled,
    hasChildren,
    children,
  } = item;

  /* =====================================================
     CHECK IF CHILD IS ACTIVE
  ===================================================== */

  const hasActiveChild =
    children?.some((childItem) => childItem.active) || false;

  /* =====================================================
     PARENT ACTIVE
  ===================================================== */

  const parentActive = active || hasActiveChild;

  /* =====================================================
     EXPAND / COLLAPSE STATE
  ===================================================== */

  const [expanded, setExpanded] = useState(parentActive);

  /* =====================================================
     WHEN ACTIVE CHILD CHANGES
     
     Automatically open that section.
  ===================================================== */

  useEffect(() => {
    if (parentActive) {
      setExpanded(true);
    }
  }, [parentActive]);

  /* =====================================================
     CHILD ITEM
  ===================================================== */

  if (child) {
    return (
      <Box className="relative ml-6">
        {/* Vertical line */}

        <Box className={`
            absolute
            left-[2px]
            top-0 bottom-0 w-[2px]
            ${active || completed ? "bg-[#229497]" : "bg-[#dce5e7]"}
          `}
        />

        <Box
          className=" h-14 flex items-center
            gap-3 pl-6 relative " >
          {/* Child Icon */}

          <Box className={` w-7 h-7 shrink-0
              flex items-center justify-center
              ${
                completed
                  ? "rounded-full bg-[#08b887] text-white"
                  : active
                    ? "rounded-full bg-[#229497] text-white"
                    : "bg-transparent text-[#a6b0b7]"
              }
            `}
          >
            <Icon
              icon={completed ? "tabler:check" : icon}
              width="16"
              height="16"
            />
          </Box>

          {/* Label */}

          <Typography
            className={`
              text-[14px]!
              flex-1
              whitespace-nowrap
              ${
                disabled
                  ? "text-[#a9b2b9]!"
                  : active
                    ? "text-[#111820]!"
                    : completed
                      ? "text-[#56636b]!"
                      : "text-[#9da8af]!"
              }
            `}
          >
            {label}
          </Typography>

          {/* Optional */}
          {item.optional && (
            <Box className=" px-2 py-[3px] rounded-full
                bg-[#f1f3f5]  text-[#66717a] text-[10px]
              "  >
              Optional
            </Box>
          )}
        </Box>
      </Box>
    );
  }

  /* =====================================================
     PARENT ITEM
  ===================================================== */

  return (
    <Box>
      {/* ================= PARENT ================= */}
      <Box
        className={` min-h-[56px]
          px-3 flex items-center
          gap-3 rounded-md
          ${parentActive ? "bg-[#e4f5f5]" : "bg-transparent"}
        `}
      >
        {/* Parent Icon */}
        <Box
          className={` w-10 h-10 shrink-0
            flex items-center justify-center
            ${
              parentActive
                ? "rounded-[5px] bg-[#229497] text-white"
                : completed
                  ? "rounded-full bg-[#08b887] text-white"
                  : "text-[#9da8af]"
            }
          `}
        >
          <Icon
            icon={completed ? "tabler:check" : icon}
            width="19"
            height="19"
          />
        </Box>

        {/* Parent Label */}

        <Typography
          className={` text-[14px]! font-medium! flex-1
            ${
              parentActive
                ? "text-[#156f75]!"
                : completed
                  ? "text-[#4B5563]!"
                  : disabled
                    ? "text-[#a9b2b9]!"
                    : "text-[#78858c]!"
            }
          `}
        >
          {label}
        </Typography>

        {/* ================= UP / DOWN ICON ================= */}

        {hasChildren && (
          <Box
            onClick={() => setExpanded((prev) => !prev)}
            className=" w-6 h-6
              flex items-center justify-center cursor-pointer rounded-full
              hover:bg-[#d8eeee] transition-all "
          >
            <Icon
              icon={
                expanded
                  ? "tabler:circle-chevron-up"
                  : "tabler:circle-chevron-down"
              }
              width="16"
              height="16"
              className={expanded ? "text-[#156f75]" : "text-[#9da8af]"}
            />
          </Box>
        )}
      </Box>

      {/* ================= CHILDREN ================= */}

      {expanded && children?.length > 0 && (
        <Box className="mt-1">
          {children.map((childItem) => (
            <SidebarItem key={childItem.label} item={childItem} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ReuseSiderBar;
