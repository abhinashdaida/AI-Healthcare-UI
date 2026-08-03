import React, { useState } from "react";
import { Icon } from "@iconify/react";

const ROW_HEIGHT = 44;

const SidebarItem = ({ section, activeKey, onSelect, isLast }) => {
  const hasChildren =
    Array.isArray(section.children) && section.children.length > 0;

  const isParentActive =
    activeKey === section.key ||
    (hasChildren && section.children.some((c) => c.key === activeKey));

  const [expanded, setExpanded] = useState(isParentActive);

  const handleParentClick = () => {
    if (hasChildren) {
      setExpanded((prev) => !prev);
    } else {
      onSelect(section.key);
    }
  };

  const activeChildIndex = hasChildren
    ? section.children.findIndex((c) => c.key === activeKey)
    : -1;

  return (
    <div className={`relative ${expanded ? "" : "pb-10"}`}>
      {/* Gray connector (always visible) */}
      {(hasChildren && expanded) || !isLast ? (
        <div
          className="absolute left-5.5 top-12 w-0.5 bg-[#E6E6E6] z-0"
          style={{
            height:
              hasChildren && expanded
                ? `${section.children.length * ROW_HEIGHT + 16}px`
                : "40px",
          }}
        />
      ) : null}

      {/* Parent */}
      {/* Parent */}
      <div
        onClick={handleParentClick}
        className={`flex items-center justify-between rounded-lg p-2 cursor-pointer transition-colors w-full min-w-0 ${
          isParentActive ? "bg-[#E3F6F5]" : "hover:bg-slate-50"
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-8 h-8 rounded-sm flex items-center justify-center ${
              isParentActive ? "bg-[#248B8F] text-white" : ""
            }`}
          >
            <Icon
              icon={section.icon}
              width={20}
              height={20}
              strokeWidth={2.2}
              className={`${isParentActive ? "text-white" : "text-[#A2AAB2]"}`}
            />
          </div>

          <span
            className={`text-sm font-medium ${
              isParentActive ? "text-[#096B58]" : "text-[#A3AAB2]"
            }`}
          >
            {section.label}
          </span>
        </div>

        {hasChildren && (
          <Icon
            icon="tabler:circle-chevron-down"
            width="16"
            height="16"
            className={`transition-transform ${
              expanded ? "rotate-180" : ""
            } ${isParentActive ? "text-[#1D7275]" : "text-neutral-400"}`}
          />
        )}
      </div>

      {/* Children */}
      {hasChildren && expanded && (
        <div className="relative ml-5.5 mt-4">
          {/* Green progress line */}
          {activeChildIndex >= 0 && (
            <div
              className="absolute left-0 -top-4 w-0.5 bg-[#248B8F] z-10"
              style={{
                height: `${(activeChildIndex + 1) * ROW_HEIGHT}px`,
              }}
            />
          )}

          {section.children.map((child) => {
            const isActive = activeKey === child.key;

            return (
              <div
                key={child.key}
                onClick={() => onSelect(child.key)}
                className="relative flex items-center gap-3 px-4  cursor-pointer"
                style={{ height: `${ROW_HEIGHT}px` }}
              >
                <div
                  className={`relative z-10 flex items-center justify-center rounded-full w-6 h-6 shrink-0 ${
                    isActive ? "bg-[#248B8F] text-white" : "text-slate-300"
                  }`}
                >
                  <Icon icon={child.icon} width="16" height="16" />
                </div>

                <div className="flex items-center justify-between flex-1 min-w-0 gap-2">
                  <span
                    className={`text-xs whitespace-nowrap ${
                      isActive ? "font-medium text-[#202020]" : "text-slate-400"
                    }`}
                  >
                    {child.label}
                  </span>

                  {child.optional && (
                    <span className="text-[9px] font-medium text-[#4B5563] bg-[#F2F2F2] px-2 py-1 rounded-full shrink-0">
                      Optional
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SidebarItem;
