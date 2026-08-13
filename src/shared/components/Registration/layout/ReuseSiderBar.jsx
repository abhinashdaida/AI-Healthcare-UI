import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import logo from "../../../../assets/logo.png";

const ReuseSiderBar = ({ menuItems = [] }) => {
  return (
    <Box
      component="aside"
      className="
        fixed
        left-0 top-0
        h-screen
        w-[336px] min-w-[336px]
        bg-white
        border-r border-gray-200
        flex flex-col
        px-8 py-8
        overflow-y-auto
        max-lg:w-[280px] max-lg:min-w-[280px]
        max-md:hidden
      "
    >
      {/* _________________________ LOGO _________________________ */}

      <Box className="flex items-center gap-3 mb-16">
        <Box className="w-10 h-10 flex items-center justify-center">
          <img
            src={logo}
            alt="MediConnect"
            className="w-full h-full object-contain"
          />
        </Box>

        <Box>
          <Typography className=" text-[16px]!  font-semibold!  text-[#24333b]! leading-4! ">
            MediConnect
          </Typography>

          <Typography className=" text-[10px]!  text-[#8a959b]! tracking-wide!  ">
            Healthcare Ecosystem
          </Typography>
        </Box>
      </Box>

      {/* _________________________ SIDEBAR _________________________ */}

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

/* _________________________  SIDEBAR ITEM _________________________ */

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

  /* _________________________  CHILD ITEM _________________________ */

  if (child) {
    return (
      <Box className="relative ml-6 -mt-3">
        {/* _________________________ VERTICAL PROGRESS BAR  _________________________ */}
        <Box
          className="
            absolute
            left-[5px]
            top-0
            bottom-0
            w-[3px]
            bg-[#dce5e7]
            rounded-full
          "
        />
        {/* _________________________ GREEN PROGRESS INDICATOR  _________________________ */}
        {(completed || active) && (
          <Box
            className="
              absolute
              left-[5px]
              top-0
              w-[3px]
              bg-[#229497]
              rounded-full
              transition-all
              duration-500
            "
            style={{
              height: active ? "50%" : "100%",
            }}
          />
        )}
        {/* _________________________ CHILD ROW  _________________________ */}
        <Box className=" h-14 flex items-center gap-2.5  pl-6 relative ">
          {/* _________________________ CHILD ICON _________________________ */}
          <Box className="w-7 h-7 shrink-0 flex items-center justify-center">
            {/* ACTIVE HAS HIGHEST PRIORITY */}
            {active ? (
              <Box
                className="
                  w-7 h-7
                  rounded-[5px]
                 bg-[#229497]
                 text-white
                  flex items-center
                  justify-center
                "
              >
                <Icon icon={icon} width="16" height="16" />
              </Box>
            ) : completed ? (
              /* COMPLETED ICON */
              <Box className=" w-7 h-7 rounded-full  bg-[#08b887]  flex items-center  justify-center  ">
                <Box className="  w-4.5 h-4.5  rounded-full  bg-white  flex items-center   justify-center  ">
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
              /* NORMAL ICON */
              <Box className=" w-7 h-7  flex items-center  justify-center  text-[#9da8af]  ">
                <Icon icon={icon} width="16" height="16" />
              </Box>
            )}
          </Box>

          {/* _________________________ CHILD LABEL _________________________ */}

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

          {/* _________________________ OPTIONAL _________________________ */}

          {item.optional && (
            <Box
              className="
                px-2 py-[3px]
                rounded-full
                bg-[#F2F2F2]
                text-[#66717a]
                text-[10px]
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

  /* _________________________ PARENT ITEM _________________________ */

  const hasActiveChild = children.some((childItem) => childItem.active);

  const parentActive = active || hasActiveChild;

  const [expanded, setExpanded] = useState(parentActive);

  useEffect(() => {
    setExpanded(parentActive);
  }, [parentActive]);

  return (
    <Box className="relative">
      {/* _________________________ PARENT ROW _________________________ */}
      <Box
        className={` min-h-[64px]
                px-3 flex items-center
                gap-5 rounded-md
                relative z-10 mb-2
                      ${parentActive && !completed ? "bg-[#e4f5f5]" : "bg-transparent"}
              `}
      >
        {/* _________________________ PARENT ICON _________________________ */}

        <Box className="  w-10 h-10 shrink-0 flex items-center  justify-center ">
          {completed ? (
            /* COMPLETED PARENT */
            <Box className="  w-10 h-10 rounded-full  bg-[#08b887] flex items-center justify-center  ">
              <Box className=" w-7 h-7  rounded-full   bg-white flex items-center  justify-center ">
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
            /* NORMAL / ACTIVE PARENT */
            <Box
              className={`
                w-10 h-10
                flex items-center
                justify-center

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

        {/* _________________________ PARENT LABEL _________________________ */}

        <Typography
          className={`
            text-[14px]!
            font-medium!
            flex-1
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

        {/* _________________________ UP / DOWN _________________________ */}

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

      {/* _________________________ CHILDREN _________________________ */}

      {expanded && children.length > 0 && (
        <Box className="mt-1">
          {children.map((childItem) => (
            <SidebarItem key={childItem.label} item={childItem} />
          ))}
        </Box>
      )}

      {/* _________________________ PARENT PROGRESS _________________________ */}

      {!isLast && (
        <Box
          className={`
            absolute
            left-[29px]
            top-[45px]
            w-[3px]
            h-[48px]
            rounded-full
            z-0

            ${parentActive || completed ? "bg-[#229497]" : "bg-[#dce5e7]"}
          `}
        />
      )}
    </Box>
  );
};

export default ReuseSiderBar;
