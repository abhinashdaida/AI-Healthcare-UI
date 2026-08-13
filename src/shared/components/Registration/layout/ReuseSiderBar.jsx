import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import logo from "../../../../assets/logo.png";

const ReuseSiderBar = ({ menuItems = [] }) => {
  return (
    <Box
      component="aside"
      className=" fixed
              left-0 top-0  h-screen
              w-[336px]  min-w-[336px]
             bg-white
              border-r border-gray-200
              flex flex-col
              px-8 py-8 overflow-y-auto
              max-lg:w-[280px] max-lg:min-w-[280px] max-md:hidden
            "
    >
      {/* _______________ LOGO _______________ */}

      <Box className="flex items-center gap-3 mb-16">
        <Box className="w-10 h-10 flex items-center justify-center">
          <img
            src={logo}
            alt="MediConnect"
            className="w-full h-full object-contain"
          />
        </Box>

        <Box>
          <Typography className=" text-[16px]! font-semibold!  text-[#24333b]! leading-4! ">
            MediConnect
          </Typography>

          <Typography className=" text-[10px]!  text-[#8a959b]!  tracking-wide!  ">
            Healthcare Ecosystem
          </Typography>
        </Box>
      </Box>

      {/* _______________ SIDEBAR _______________ */}

      <Box className="flex flex-col">
        {menuItems.map((item, index) => (
          <SidebarItem
            key={item.label}
            item={item}
            isLast={index === menuItems.length - 1}
          />
        ))}
      </Box>
    </Box>
  );
};

//_______________ SIDEBAR ITEM_______________

const SidebarItem = ({ item, isLast = false }) => {
  const {
    label,
    icon,
    child,
    active,
    completed,
    disabled,
    hasChildren,
    children = [],
  } = item;

  //_______________CHECK IF CHILD IS ACTIVE_______________
  const hasActiveChild = children.some((childItem) => childItem.active);

  // _______________ PARENT ACTIVE_______________
  const parentActive = active || hasActiveChild;

  //_______________EXPAND / COLLAPSE_______________
  const [expanded, setExpanded] = useState(parentActive);

  //  _______________AUTOMATICALLY OPEN ACTIVE SECTION_______________
  useEffect(() => {
    setExpanded(parentActive);
  }, [parentActive]);

  //  _______________CHILD ITEM_______________
  if (child) {
    return (
      <Box className="relative ml-6">
        {/* CHILD VERTICAL LINE */}
        <Box
          className={`absolute left-[5px] top-0 bottom-0 w-[2px]
            ${active || completed ? "bg-[#229497]" : "bg-[#dce5e7]"}
        `}
        />

        {/* // CHILD ROW */}
        <Box className=" h-14 flex items-center gap-2.5 pl-6  relative ">
          {/* CHILD ICON */}
          <Box className="w-7 h-7 shrink-0 flex items-center justify-center">
            {completed ? (
              // Completed icon
              <Box className="w-7 h-7 rounded-full bg-[#08b887] flex items-center justify-center">
                <Box className="w-4.5 h-4.5 rounded-full bg-white flex items-center justify-center">
                  <Icon
                    icon="tabler:check"
                    width="16"
                    height="16"
                    strokeWidth="3"
                    className="text-[#08b887]"
                  />
                </Box>
              </Box>
            ) : (
              // Normal / Active icon
              <Box
                className={` w-7 h-7 flex items-center justify-center
                    ${
                      parentActive
                        ? "rounded-[5px] bg-[#229497] text-white"
                        : "text-[#9da8af]"
                    }
            `}
              >
                <Icon icon={icon} width="16" height="16" />
              </Box>
            )}
          </Box>
          {/* CHILD LABEL */}
          <Typography
            className={` text-[14px]! flex-1 whitespace-nowrap
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

          {/* OPTIONAL */}
          {item.optional && (
            <Box
              className=" px-2 py-[3px]
                rounded-full  bg-[#F2F2F2]
                text-[#66717a] text-[10px]
                whitespace-nowrap
              "
            >
              Optional
            </Box>
          )}
        </Box>
      </Box>
    );
  }

  //-------------------     PARENT ITEM------------

  return (
    <Box className="relative">
      <Box
        className={`
          min-h-[56px]  px-3
          flex items-center
          gap-4 rounded-md
          relative z-10
          ${parentActive && !completed ? "bg-[#e4f5f5]" : "bg-transparent"}
        `}
      >
        {/* PARENT ICON */}
        <Box className="w-10 h-10 shrink-0 flex items-center justify-center">
          {completed ? (
            // Completed icon
            <Box className="w-10 h-10 rounded-full bg-[#08b887] flex items-center justify-center">
              <Box className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
                <Icon
                  icon="tabler:check"
                  width="20"
                  height="20"
                  strokeWidth="4"
                  className="text-[#08b887]"
                />
              </Box>
            </Box>
          ) : (
            // Normal / Active icon
            <Box
              className={` w-10 h-10 flex items-center justify-center
                    ${
                      parentActive
                        ? "rounded-[5px] bg-[#229497] text-white"
                        : "text-[#9da8af]"
                    }
            `}
            >
              <Icon icon={icon} width="20" height="20" />
            </Box>
          )}
        </Box>

        {/* PARENT LABEL */}
        <Typography
          className={` text-[14px]! font-medium! flex-1
            ${
              completed
                ? "text-[#4B5563]!"
                : parentActive
                  ? "text-[#156f75]!"
                  : disabled
                    ? "text-[#a9b2b9]!"
                    : "text-[#78858c]!"
            }
          `}
        >
          {label}
        </Typography>
        {/* ___________UP / DOWN ICON ___________*/}
        {hasChildren && (
          <Box
            onClick={() => setExpanded((prev) => !prev)}
            className="
              w-6 h-6
              flex items-center
              justify-center
              cursor-pointer
              rounded-full
              hover:bg-[#d8eeee]
              transition-all
              shrink-0
            "
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
      {/* CHILDREN */}
      {expanded && children.length > 0 && (
        <Box className="mt-1">
          {children.map((childItem) => (
            <SidebarItem key={childItem.label} item={childItem} />
          ))}
        </Box>
      )}
      {/* LINE BETWEEN PARENT SECTION */}
      {!isLast && (
        <Box
          className={`
            absolute
            left-[29px]
            top-[45px]
            w-[2px]
            h-[28px]
            z-0

            ${parentActive || completed ? "bg-[#10B981]" : "bg-[#dce5e7]"}
          `}
        />
      )}
    </Box>
  );
};

export default ReuseSiderBar;
