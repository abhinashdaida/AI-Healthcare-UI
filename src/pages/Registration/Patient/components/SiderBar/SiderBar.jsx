import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import ReuseSiderBar from "@/shared/components/Registration/layout/ReuseSiderBar";

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
