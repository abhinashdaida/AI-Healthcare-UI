import React, { useState } from "react";
import { Icon } from "@iconify/react";
import logo from "@assets/assets/logo.svg";
import ContactSupportModal from "./ContactSupportModal";

const findActiveItem = (sections, activeKey) => {
  for (const section of sections) {
    if (section.key === activeKey) return section;
    if (section.children?.some((c) => c.key === activeKey)) return section;
  }
  return null;
};

const Header = ({ sections = [], activeKey, onMenuClick }) => {
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const activeItem = findActiveItem(sections, activeKey);

  return (
    <>
      <header className="bg-white border-b border-[#D1D5DB]">
        {/* Mobile + tablet top bar — unchanged */}
        <div className="flex lg:hidden items-center gap-6 px-4 py-4 border-b border-[#F0F0F0]">
          <button
            onClick={onMenuClick}
            className="shrink-0 text-slate-500 hover:text-slate-700 ml-2.5"
          >
            <Icon icon="tabler:menu-2" width={22} height={22} />
          </button>

          <div className="flex items-center gap-1">
            <img
              src={logo}
              alt="MediConnect"
              className="w-8 h-8 object-contain shrink-0"
            />
            <h1 className="text-[16px] font-semibold leading-none text-[#096B58] whitespace-nowrap">
              MediConnect
            </h1>
          </div>

          <button
            onClick={() => setIsSupportOpen(true)}
            className="shrink-0 w-10 h-10 rounded-full bg-[#EAF1EE] flex items-center justify-center text-slate-500 hover:bg-[#DCEAE5] ml-auto mr-2.5"
          >
            <Icon icon="tabler:headset" width={20} height={20} />
          </button>
        </div>

        {/* Title row — padding now matches the top bar's effective inset (px-4 + 2.5 = 26px) on mobile */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6.5 py-6 md:px-10 md:py-8 lg:py-8">
          <div className="flex flex-col gap-3 max-w-full sm:max-w-82 lg:max-w-82">
  <h2 className="text-[#0B1117] font-medium text-lg sm:text-base leading-tight">
    {activeItem?.title || "Registration"}
  </h2>
  {activeItem?.subtitle && (
    <p className="text-[#6B7280] font-normal text-sm leading-snug">
      {activeItem.subtitle}
    </p>
  )}
</div>

          <div className="hidden lg:flex flex-col items-start gap-2 self-end sm:self-auto w-32.5 h-14">
            <button className="flex items-start gap-2 text-xs text-[#4B5563]  whitespace-nowrap">
              <Icon icon="tabler:headset" width={16} height={16} />
              <span className="text-[#4B5563]">Need Help?</span>
            </button>

            <button
              onClick={() => setIsSupportOpen(true)}
              className="flex items-center justify-center w-32.5 h-8 rounded gap-2 border border-[#248B8F] text-xs font-medium text-[#248B8F]  whitespace-nowrap"
              style={{
                paddingTop: "6px",
                paddingRight: "12px",
                paddingBottom: "6px",
                paddingLeft: "12px",
              }}
            >
              Contact Support
            </button>
          </div>
        </div>
      </header>

      <ContactSupportModal
        isOpen={isSupportOpen}
        onClose={() => setIsSupportOpen(false)}
      />
    </>
  );
};

export default Header;
