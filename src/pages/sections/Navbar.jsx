import React, { useState } from "react";
import {
  Menu, MenuItem, Drawer, Accordion, AccordionSummary,
  AccordionDetails, Typography
} from "@mui/material";
import { Icon } from "@iconify/react";
import logo from "../../assets/Landingpage/logo.avif";

const menuItems = [
  { title: "Solutions", children: ["Overview","EHR Integration","Telemedicine"] },
  { title: "For Patients", children: ["Find Doctors","Book Appointment","Patient Portal"] },
  { title: "For Providers", children: ["Hospitals & Clinics","Independent Practice"] },
];

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeMenu, setActiveMenu] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const openMenu = (e,title)=>{setAnchorEl(e.currentTarget);setActiveMenu(title);}
  const closeMenu = ()=>{setAnchorEl(null);setActiveMenu("");}
  const toggleDrawer = ()=>setMobileOpen(v=>!v);

  return (
    <header className="w-full h-[80px] bg-white border-b border-gray-100 sticky top-0 z-50 flex items-center">
      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="MediConnect Logo" className="h-9 w-auto"/>
          <div className="leading-tight">
            <div className="text-[19px] font-bold text-[#0D7A5F]">MediConnect</div>
            <div className="text-[11px] text-[#0D7A5F]">Healthcare Ecosystem</div>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-8 font-semibold">
          <a href="#">Home</a>
          {menuItems.map(menu=>(
            <div key={menu.title}>
              <button onClick={(e)=>openMenu(e,menu.title)} className="flex items-center gap-1">
                {menu.title}
                <Icon icon="lucide:chevron-down"/>
              </button>
              <Menu anchorEl={anchorEl} open={activeMenu===menu.title} onClose={closeMenu}>
                {menu.children.map(item=>(
                  <MenuItem key={item} onClick={closeMenu}>{item}</MenuItem>
                ))}
              </Menu>
            </div>
          ))}
          <a href="#">Pricing</a>
          <a href="#">Resources</a>
        </nav>

        <div className="hidden lg:flex gap-3">
          <button className="px-5 py-2.5 rounded-xl bg-gray-100">Sign up</button>
          <button className="px-5 py-2.5 rounded-xl bg-[#0D7A5F] text-white">Login</button>
        </div>

        <button className="lg:hidden" onClick={toggleDrawer}>
          <Icon icon={mobileOpen?"lucide:x":"lucide:menu"} className="w-7 h-7"/>
        </button>
      </div>

      <Drawer anchor="right" open={mobileOpen} onClose={toggleDrawer}
        slotProps={{paper:{className:"w-[300px] p-6"}}}>
        <nav className="space-y-2">
          <a href="#" onClick={toggleDrawer}>Home</a>
          {menuItems.map(menu=>(
            <Accordion key={menu.title} elevation={0} disableGutters>
              <AccordionSummary expandIcon={<Icon icon="lucide:chevron-down"/>}>
                <Typography>{menu.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {menu.children.map(item=>(
                  <a key={item} href="#" onClick={toggleDrawer} className="block py-1">{item}</a>
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
          <a href="#" onClick={toggleDrawer}>Pricing</a>
          <a href="#" onClick={toggleDrawer}>Resources</a>
          <div className="pt-4 flex flex-col gap-2">
            <button className="px-5 py-2.5 rounded-xl bg-gray-100">Sign up</button>
            <button className="px-5 py-2.5 rounded-xl bg-[#0D7A5F] text-white">Login</button>
          </div>
        </nav>
      </Drawer>
    </header>
  );
}