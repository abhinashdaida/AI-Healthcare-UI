import React from "react";
import { ChevronRight } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function Breadcrumb({
  items = [],
}) {
  return (
    <nav className="flex items-center gap-1 text-sm">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div
            key={`${item.label}-${index}`}
            className="flex items-center"
          >
            {item.path && !isLast ? (
              <Link
                to={item.path}
                className="text-gray-400 transition hover:text-black"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={
                  isLast
                    ? "font-medium text-black"
                    : "text-gray-400"
                }
              >
                {item.label}
              </span>
            )}

            {!isLast && (
              <ChevronRight
                fontSize="small"
                className="mx-1 text-gray-400"
              />
            )}
          </div>
        );
      })}
    </nav>
  );
}