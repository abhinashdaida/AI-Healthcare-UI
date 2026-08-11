// import React from "react";
// import { Box, Typography } from "@mui/material";
// import { Icon } from "@iconify/react";
// import logo from "@assets/logo.png";
// const menuItems = [
//   {
//     label: "Personal Information",
//     icon: "tabler:user",
//     active: true,
//   },
//   {
//     label: "Basic Details",
//     icon: "tabler:user",
//     child: true,
//     active: true,
//   },
//   {
//     label: "Contact & Location",
//     icon: "tabler:map-pin",
//     child: true,
//     disabled: true,
//   },
//   {
//     label: "Health Overview",
//     icon: "tabler:activity-heartbeat",
//     child: true,
//     disabled: true,
//   },
//   {
//     label: "Medical Records",
//     icon: "tabler:clipboard-heart",
//     disabled: true,
//   },
//   {
//     label: "Medical Conditions ",
//     icon: "tabler:heart-rate-monitor",
//     child: true,
//     disabled: true,
//   },
//   {
//     label: "Insurance",
//     icon: "tabler:building-bank",
//     child: true,
//     disabled: true,
//   },
//   {
//     label: "Review & Complete",
//     icon: "tabler:checklist",
//     disabled: true,
//   },
//   {
//     label: "Verify Information",
//     icon: "tabler:file-text",
//     child: true,
//     disabled: true,
//   },
//   {
//     label: "Create Login ID",
//     icon: "tabler:shield-plus",
//     child: true,
//     disabled: true,
//   },
// ];

// const Sidebar = () => {
//   return (
//     <Box
//       component="aside"
//       className="w-[336px] min-w-[336px] bg-white border-r border-gray-200
//         flex flex-col
//         px-8 py-8
//         max-lg:w-70
//         max-lg:min-w-70
//         max-md:hidden"
//     >
//       {/* Logo */}
//       <Box className="flex items-center gap-3 mb-16">
//         <img
//           src={logo}
//           alt="MediConnect Logo"
//           className="w-10 h-auto object-contain "
//         />

//         <Box>
//           <Typography className="text-[15px]! font-semibold! text-[#24333b]! leading-4!">
//             MediConnect
//           </Typography>

//           <Typography className="text-[8px]! text-[#8a959b]! tracking-wide!">
//             Healthcare Ecosystem
//           </Typography>
//         </Box>
//       </Box>

//       {/* Navigation */}
//       <Box className="flex flex-col">
//         {menuItems.map((item, index) => (
//           <Box
//             key={item.label}
//             className={`
//               relative
//               ${item.child ? "ml-3" : ""}
//               ${item.active && !item.child ? "bg-[#e4f5f5] rounded-md" : ""}
//             `}
//           >
//             {/* Vertical Line */}
//             {item.child && (
//               <Box
//                 className="
//                   absolute
//                   left-1 top-0 bottom-0
//                   w-px
//                   bg-[#d8e5e5]"
//               />
//             )}

//             <Box
//               className={`
//                 h-11 px-3
//                 flex items-center
//                 gap-3
//                 rounded-md
//                 ${
//                   item.disabled
//                     ? "text-[#c3cbd0]"
//                     : item.active
//                       ? "text-[#156f75]"
//                       : "text-[#78858c]"
//                 }`}
//             >
//               <Box
//                 className={`flex items-center justify-center w-7 h-7 shrink-0
//                           ${
//                             item.active
//                               ? item.child
//                                 ? "rounded-full bg-[#229497] text-white"
//                                 : "rounded-[4px] bg-[#229497] text-white"
//                               : "bg-transparent"
//                           }`}
//               >
//                 <Icon icon={item.icon} width="16" height="16" />
//               </Box>

//               <Typography
//                 className={`
//                   text-[12px]! font-medium!
//                   flex-1
//                   ${
//                     item.disabled
//                       ? "text-[#c3cbd0]!"
//                       : item.active
//                         ? "text-[#156f75]!"
//                         : "text-[#78858c]!"
//                   }`}
//               >
//                 {item.label}
//               </Typography>

//               {!item.child && (
//                 <Icon
//                   icon="tabler:circle-chevron-down"
//                   width="14"
//                   height="14"
//                 />
//               )}
//             </Box>
//           </Box>
//         ))}
//       </Box>
//     </Box>
//   );
// };

// export default Sidebar;

import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import ReuseSiderBar from "@/shared/components/Patient/layout/ReuseSiderBar";

import { setCurrentStep } from "@/state-management/modules/patientRegistration/sidebarReducer";

/* =====================================================
   SIDEBAR CONFIGURATION
=====================================================*/

const sidebarSteps = [
  {
    label: "Personal Information",
    icon: "tabler:user",
    children: [
      {
        label: "Basic Details",
        icon: "tabler:user",
        path: "/basic-details",
        step: 0,
      },
      {
        label: "Contact & Location",
        icon: "tabler:map-pin",
        path: "/emergency-contact",
        step: 1,
      },
      {
        label: "Health Overview",
        icon: "tabler:activity-heartbeat",
        path: "/health-overview",
        step: 2,
      },
    ],
  },

  {
    label: "Medical Records",
    icon: "tabler:clipboard-heart",
    children: [
      {
        label: "Medical Conditions",
        icon: "tabler:heart-rate-monitor",
        path: "/medical-conditions",
        optional: true,
        step: 3,
      },
      {
        label: "Insurance",
        icon: "tabler:building-bank",
        path: "/insurance",
        optional: true,
        step: 4,
      },
    ],
  },

  {
    label: "Review & Complete",
    icon: "tabler:checklist",
    children: [
      {
        label: "Verify Information",
        icon: "tabler:file-text",
        path: "/reviewdetails",
        step: 5,
      },
      {
        label: "Create Login ID",
        icon: "tabler:shield-plus",
        path: "/create-login-id",
        step: 6,
      },
    ],
  },
];

/* =====================================================
   SIDEBAR
===================================================== */

// const Sidebar = () => {
//   const dispatch = useDispatch();
//   const location = useLocation();

//   const { currentStep, completedSteps = [] } = useSelector(
//     (state) => state.patientRegistration,
//   );

//   /* ===================================================
//      FLATTEN STEPS
//   =================================================== */

//   const flatSteps = sidebarSteps.flatMap((section) => section.children);

//   /* ===================================================
//      FIND CURRENT ROUTE
//   =================================================== */

//   useEffect(() => {
//     const routeIndex = flatSteps.findIndex(
//       (item) => item.path === location.pathname,
//     );

//     if (routeIndex !== -1 && routeIndex !== currentStep) {
//       dispatch(setCurrentStep(routeIndex));
//     }
//   }, [location.pathname, currentStep, dispatch]);

//   /* ===================================================
//      CREATE SIDEBAR MENU
//   =================================================== */

//   const menuItems = sidebarSteps.map((section) => {
//     const sectionChildren = section.children.map((child, childIndex) => {
//       const globalIndex = flatSteps.findIndex(
//         (item) => item.path === child.path,
//       );

//       const isActive = currentStep === globalIndex;

//       const isCompleted = completedSteps.includes(globalIndex);

//       return {
//         ...child,
//         child: true,
//         active: isActive,
//         completed: isCompleted,
//         disabled: !isActive && !isCompleted,
//       };
//     });

//     const sectionActive = sectionChildren.some((child) => child.active);

//     const sectionCompleted = sectionChildren.every((child) => child.completed);

//     return {
//       ...section,

//       hasChildren: true,

//       active: sectionActive,

//       completed: sectionCompleted,

//       disabled: !sectionActive && !sectionCompleted,

//       children: sectionChildren,
//     };
//   });

//   return <ReuseSiderBar menuItems={menuItems} />;
// };

// export default Sidebar;


const Sidebar = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const {
    currentStep,
    completedSteps = [],
  } = useSelector(
    (state) => state.patientRegistration
  );

  // =====================================================
  // All actual form steps
  // =====================================================

  const flatSteps = useMemo(() => {
    return sidebarSteps.flatMap(
      (section) => section.children
    );
  }, []);

  // =====================================================
  // Find current step from URL
  // =====================================================

  useEffect(() => {
    const currentRouteStep = flatSteps.find(
      (step) => step.path === location.pathname
    );

    if (
      currentRouteStep &&
      currentRouteStep.step !== currentStep
    ) {
      dispatch(
        setCurrentStep(currentRouteStep.step)
      );
    }
  }, [
    location.pathname,
    currentStep,
    flatSteps,
    dispatch,
  ]);

  // =====================================================
  // Create sidebar UI state
  // =====================================================

  const menuItems = useMemo(() => {
    return sidebarSteps.map((section) => {
      const children = section.children.map(
        (child) => {
          const isActive =
            currentStep === child.step;

          const isCompleted =
            completedSteps.includes(child.step);

          return {
            ...child,

            child: true,

            active: isActive,

            completed: isCompleted,

            disabled:
              !isActive && !isCompleted,
          };
        }
      );

      const sectionActive =
        children.some(
          (child) => child.active
        );

      const sectionCompleted =
        children.length > 0 &&
        children.every(
          (child) => child.completed
        );

      return {
        ...section,

        hasChildren: true,

        active: sectionActive,

        completed: sectionCompleted,

        disabled:
          !sectionActive &&
          !sectionCompleted,

        children,
      };
    });
  }, [
    currentStep,
    completedSteps,
  ]);

  return (
    <ReuseSiderBar
      menuItems={menuItems}
    />
  );
};

export default Sidebar;
