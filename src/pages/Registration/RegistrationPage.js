import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import Footer from "@/shared/components/Registration/layout/Footer";
import Header from "@/shared/components/Registration/layout/Header";
import Sidebar from "@/shared/components/Registration/layout/Sidebar";
import sidebarByRole, { getStepComponent } from "@/shared/constants/RoleRegistration";

import {
  saveSectionData,
  setActiveSection,
} from "@/state-management/modules/registration/registrationActions";
import {
  authSelectors,
  registrationSelectors,
} from "@/state-management/modules/rootSelectors";

const findActiveSection = (sections, activeKey) => {
  for (const section of sections) {
    if (section.key === activeKey) return section;
    if (section.children?.some((c) => c.key === activeKey)) {
      return section.children.find((c) => c.key === activeKey);
    }
  }
  return null;
};

const RegistrationPage = () => {
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const role = useSelector(authSelectors.getUserRole);
  const activeSectionKey = useSelector(
    registrationSelectors.getActiveSectionKey,
  );
  const sectionData = useSelector(registrationSelectors.getSectionData); // { [stepKey]: data }

  if (!role) return <Navigate to="/signup" />;

  const sidebar = sidebarByRole[role];
  const activeSection = findActiveSection(sidebar, activeSectionKey);

  // Look up the child form component for this role + active step key
  const StepComponent = getStepComponent(role, activeSectionKey);

  const handleSectionSelect = (key) => {
    dispatch(setActiveSection(key));
  };

  const handleFormSubmit = (data) => {
    dispatch(saveSectionData(activeSectionKey, data));
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        sections={sidebar}
        activeKey={activeSectionKey}
        onSelect={handleSectionSelect}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col h-full min-w-0">
        <Header
          sections={sidebar}
          activeKey={activeSectionKey}
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        <div className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-10 py-6">
          {StepComponent ? (
            <StepComponent
              data={sectionData?.[activeSectionKey]}
              onChange={(data) =>
                dispatch(saveSectionData(activeSectionKey, data))
              }
            />
          ) : (
            <p className="text-sm text-slate-400">
              No form defined for this step yet.
            </p>
          )}
        </div>

        {/* Footer: hidden on mobile, visible from tablet (sm) through laptop/l-laptop */}
        <div className="hidden sm:block shrink-0">
          <Footer
            onSkip={() => {
              /* handle skip */
            }}
            onContinue={handleFormSubmit}
            showSkip={activeSection?.showSkip ?? true}
            continueLabel={activeSection?.continueLabel ?? "Save & Continue"}
            isContinueDisabled={false}
          />
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;