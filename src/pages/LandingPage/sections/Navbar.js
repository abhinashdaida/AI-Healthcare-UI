import React, { useState } from "react";
import {
  Search,
  FavoriteBorder,
  ShoppingBagOutlined,
  PersonOutline,
  Menu,
  Close,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Icon } from "@iconify/react";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Deals", href: "#deals" },
  { label: "New Arrivals", href: "#new-arrivals" },
  { label: "Packages", href: "#packages" },
];

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <>
      <header className="relative z-50 bg-white">
        <div className="mx-auto flex h-[72px] max-w-[1180px] items-center justify-between px-5 md:px-8">

          {/* Logo */}
          <a
            href="#home"
            className="font-serif text-[20px] font-medium tracking-wide md:text-[23px]"
          >
            FASCO
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[10px] text-[#333] transition hover:text-black"
              >
                {item.label}
              </a>
            ))}

            <a
              href="#login"
              className="text-[10px] text-[#333]"
            >
              Sign In
            </a>

            <button className="rounded-[3px] bg-black px-7 py-3 text-[9px] text-white shadow-[0_5px_15px_rgba(0,0,0,0.15)] transition hover:bg-[#222]">
              Sign Up
            </button>
          </nav>

          {/* Desktop Icons */}
          <div className="hidden items-center lg:flex">
            <IconButton size="small">
              <Search sx={{ fontSize: 17 }} />
            </IconButton>

            <IconButton size="small">
              <FavoriteBorder sx={{ fontSize: 17 }} />
            </IconButton>

            <IconButton size="small" onClick={() => window.location.href = "/cart"}>
              <ShoppingBagOutlined sx={{ fontSize: 17 }} />
            </IconButton>

            <IconButton size="small">
              <Icon icon="tabler:user" sx={{ fontSize: 17 }} />
            </IconButton>
          </div>

          {/* Mobile */}
          <div className="flex lg:hidden">
            <IconButton onClick={() => setMobileMenu(true)}>
              <Menu />
            </IconButton>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileMenu && (
        <div className="fixed inset-0 z-[100] bg-white p-6 lg:hidden">

          <div className="flex items-center justify-between">
            <span className="font-serif text-xl">
              FASCO
            </span>

            <IconButton onClick={() => setMobileMenu(false)}>
              <Close />
            </IconButton>
          </div>

          <nav className="mt-12 flex flex-col gap-7">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenu(false)}
                className="text-sm"
              >
                {item.label}
              </a>
            ))}

            <a href="#login" className="text-sm">
              Sign In
            </a>

            <button className="w-fit bg-black px-8 py-3 text-xs text-white">
              Sign Up
            </button>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;