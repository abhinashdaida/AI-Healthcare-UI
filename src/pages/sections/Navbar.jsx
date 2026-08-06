import React, { useState } from "react";
import {
  Menu,
  MenuItem,
  Drawer,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import { Icon } from "@iconify/react";
import logo from "../../assets/Landingpage/logo.avif";

const menuItems = [
  {
    title: "Solutions",
    children: ["Overview", "EHR Integration", "Telemedicine"],
  },
  {
    title: "For Patients",
    children: ["Find Doctors", "Book Appointment", "Patient Portal"],
  },
  {
    title: "For Providers",
    children: ["Hospitals & Clinics", "Independent Practice"],
  },
];

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeMenu, setActiveMenu] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleOpenMenu = (event, menu) => {
    setAnchorEl(event.currentTarget);
    setActiveMenu(menu);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setActiveMenu("");
  };

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full h-[80px] bg-white border-b border-[#E5E7EB]">
        <div className="max-w-[1440px] h-full mx-auto px-6 lg:px-10 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Logo"
              className="h-11 w-auto"
            />

            <div>
              <h2 className="text-[18px] font-bold text-[#0D7A5F] leading-none">
                MediConnect
              </h2>

              <p className="text-[11px] text-[#0D7A5F]">
                Healthcare Ecosystem
              </p>
            </div>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-8 text-[15px] font-medium text-[#111827]">
            <a href="#">Home</a>

            {menuItems.map((menu) => (
              <div key={menu.title}>
                <button
                  onClick={(e) =>
                    handleOpenMenu(e, menu.title)
                  }
                  className="flex items-center gap-1 hover:text-[#0D7A5F]"
                >
                  {menu.title}

                  <Icon
                    icon="lucide:chevron-down"
                    width={16}
                  />
                </button>

                <Menu
                  anchorEl={anchorEl}
                  open={activeMenu === menu.title}
                  onClose={handleCloseMenu}
                >
                  {menu.children.map((item) => (
                    <MenuItem
                      key={item}
                      onClick={handleCloseMenu}
                    >
                      {item}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            ))}

            <a href="#">Pricing</a>

            <a href="#">Resources</a>
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <button className="flex items-center gap-2 px-6 h-[52px] rounded-xl bg-[#F3F8F7] text-[#0D7A5F] font-semibold transition">
              <Icon
                icon="lucide:user"
                width={20}
              />
              Sign up
            </button>

            <button className="flex items-center gap-2 px-6 h-[52px] rounded-xl bg-[#0D7A5F] text-white font-semibold transition hover:bg-[#0A6851]">
              <Icon
                icon="lucide:user"
                width={20}
              />
              Login
            </button>
          </div>

          {/* Mobile Menu Icon */}
          <button
            className="lg:hidden"
            onClick={toggleDrawer}
          >
            <Icon
              icon={
                mobileOpen
                  ? "lucide:x"
                  : "lucide:menu"
              }
              width={28}
            />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={toggleDrawer}
        slotProps={{
          paper: {
            className: "w-[300px] p-5",
          },
        }}
      >
        <nav className="space-y-2">
          <a
            href="#"
            className="block py-2"
            onClick={toggleDrawer}
          >
            Home
          </a>

          {menuItems.map((menu) => (
            <Accordion
              key={menu.title}
              elevation={0}
              disableGutters
            >
              <AccordionSummary
                expandIcon={
                  <Icon icon="lucide:chevron-down" />
                }
              >
                <Typography>
                  {menu.title}
                </Typography>
              </AccordionSummary>

              <AccordionDetails>
                {menu.children.map((item) => (
                  <a
                    key={item}
                    href="#"
                    onClick={toggleDrawer}
                    className="block py-2 text-gray-600"
                  >
                    {item}
                  </a>
                ))}
              </AccordionDetails>
            </Accordion>
          ))}

          <a
            href="#"
            className="block py-2"
            onClick={toggleDrawer}
          >
            Pricing
          </a>

          <a
            href="#"
            className="block py-2"
            onClick={toggleDrawer}
          >
            Resources
          </a>

          <div className="pt-6 flex flex-col gap-3">
            <button className="flex items-center justify-center gap-2 h-[48px] rounded-xl bg-[#F3F8F7] text-[#0D7A5F] font-semibold">
              <Icon
                icon="lucide:user"
                width={20}
              />
              Sign up
            </button>

            <button className="flex items-center justify-center gap-2 h-[48px] rounded-xl bg-[#0D7A5F] text-white font-semibold">
              <Icon
                icon="lucide:user"
                width={20}
              />
              Login
            </button>
          </div>
        </nav>
      </Drawer>
    </>
  );
};

export default Navbar;