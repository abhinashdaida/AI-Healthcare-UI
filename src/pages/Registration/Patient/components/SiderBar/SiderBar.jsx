

import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import ReuseSiderBar from "@/shared/components/Registration/layout/ReuseSiderBar";

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

const Sidebar = () => {
  const location = useLocation();

  const completedSteps = useSelector(
    (state) => state.patientRegistration.completedSteps || [],
  );

  // URL is the source of truth for active step
  const currentStep = useMemo(() => {
    const currentItem = sidebarSteps
      .flatMap((section) => section.children)
      .find((item) => item.path === location.pathname);

    return currentItem?.step ?? 0;
  }, [location.pathname]);

  const menuItems = useMemo(() => {
    return sidebarSteps.map((section) => {
      const children = section.children.map((child) => {
        const isActive = currentStep === child.step;

        const isCompleted = completedSteps.includes(child.step);

        return {
          ...child,
          child: true,
          active: isActive,
          completed: isCompleted,
          disabled: !isActive && !isCompleted,
        };
      });

      const sectionActive = children.some((child) => child.active);

      const sectionCompleted =
        children.length > 0 && children.every((child) => child.completed);

      return {
        ...section,

        hasChildren: true,

        active: sectionActive,

        completed: sectionCompleted,

        disabled: !sectionActive && !sectionCompleted,

        children,
      };
    });
  }, [currentStep, completedSteps]);

  return <ReuseSiderBar menuItems={menuItems} />;
};

export default Sidebar;