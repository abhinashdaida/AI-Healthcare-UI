import React from "react";
import { Menu } from "lucide-react";

import RegistrationSidebar from "./RegistrationSidebar";
import SupportLink from "./SupportLink";
import SectionHeader from "@/shared/components/PatientRegistration/common/SectionHeader";

/**
 * RegistrationShell — the page-level layout for the registration flow:
 * sidebar (desktop rail / mobile drawer), the mobile top bar, the step's
 * title/description header with the support link, and a slot for the
 * active step's content.
 *
 * This is the same markup that previously lived directly inside
 * PatientRegistration.js's render — pulled out so PatientRegistration.js
 * can stay focused on state/routing concerns.
 *
 * Props:
 *   activeStep      {string}
 *   setActiveStep   {fn}
 *   isSidebarOpen   {boolean}
 *   onOpenSidebar   {fn}
 *   onCloseSidebar  {fn}
 *   progress        {number}
 *   title           {string}  — current step's header title
 *   description     {string}  — current step's header description
 *   children        {node}    — the active step's content
 */
const RegistrationShell = ({
  activeStep,
  setActiveStep,
  isSidebarOpen,
  onOpenSidebar,
  onCloseSidebar,
  progress,
  title,
  description,
  children,
}) => {
  return (
    <div className="flex min-h-screen bg-white md:bg-[#F9FAFB]">
      <RegistrationSidebar
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        isOpen={isSidebarOpen}
        onClose={onCloseSidebar}
        progress={progress}
      />

      <div className="flex-1 flex flex-col bg-white pt-16 md:pt-0">
        {/* Mobile header bar */}
        <div className="fixed top-0 left-0 right-0 z-45 flex h-16 items-center justify-between border-b border-[#E5E7EB] bg-white px-7 md:hidden">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onOpenSidebar}
              aria-label="Open registration menu"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#DDE5EF] text-[#2E6B5F] cursor-pointer"
            >
              <Menu size={20} strokeWidth={1.8} />
            </button>
            <span className="text-[20px] font-semibold leading-none text-[#0D4B43]">
              MediConnect
            </span>
          </div>

          <div className="flex w-24 flex-col items-end gap-1.5">
            <span className="text-[12px] font-semibold leading-none text-[#667085]">
              {progress}% Done
            </span>
            <div className="h-1 w-full overflow-hidden rounded-full bg-[#E5E7EB]">
              <div
                className="h-full rounded-full bg-[#2E6B5F] transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Step header + support link */}
        <div className="w-full px-7 pt-6 md:mt-10 md:flex md:h-16.5 md:items-center md:justify-between md:px-10 md:pt-0 relative">
          <SectionHeader
            size="lg"
            title={title}
            description={description}
            rightSlot={<SupportLink variant="mobile" />}
          />
          <SupportLink variant="desktop" />
        </div>

        <main>{children}</main>
      </div>
    </div>
  );
};

export default RegistrationShell;
