import React from "react";
import { Icon } from "@iconify/react";
import SidebarItem from "./SidebarItem";
import logo from "@assets/assets/logo.svg";

const Sidebar = ({ sections, activeKey, onSelect, isOpen, onClose }) => {
  return (
    <>
      {/* Mobile overlay backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={` fixed lg:static top-0 left-0 z-50 h-screen w-80 sm:w-96 lg:w-80 xl:w-96
            border-r border-[#D1D5DB] bg-white shrink-0 transform transition-transform duration-300
            ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} `}
      >
        {/* Close button (mobile only) */}
        <button
          onClick={onClose}
          className="lg:hidden absolute top-5 right-5 text-slate-400 hover:text-slate-600"
        >
          <Icon icon="tabler:x" width={20} height={20} />
        </button>

        {/* Logo block */}
        <div className="flex items-center gap-1 px-6 pt-6 pb-4">
          <img
            src={logo}
            alt="MediConnect"
            className="w-12 h-11 object-contain shrink-0"
          />
          <div className="flex flex-col">
            <h1 className="text-[16px] font-semibold leading-none text-[#096B58]">
              MediConnect
            </h1>
            <p className="text-[10px] font-normal leading-2.5 text-primary">
              Healthcare Ecosystem
            </p>
          </div>
        </div>

        {/* Nav block */}
        <nav className="flex flex-col py-4 lg:pt-18 px-6 overflow-x-hidden overflow-y-auto h-[calc(100vh-100px)]">
          {sections.map((section, index) => (
            <SidebarItem
              key={section.key}
              section={section}
              activeKey={activeKey}
              onSelect={(key) => {
                onSelect(key);
                onClose?.(); // auto-close drawer on mobile after picking a section
              }}
              isLast={index === sections.length - 1}
            />
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
