
import logoImg from '@/assets/assets/logo.svg';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices'; // Fallback logo icon
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Button, Container, IconButton, Toolbar } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NAVBAR_ITEMS as navItems } from '../../../../shared/constants/landingPage';

const Navbar = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <AppBar position="sticky" color="inherit" elevation={0} className="border-b border-gray-200">
      <Container maxWidth="lg">
        <Toolbar disableGutters className="justify-between h-20">
          
          {/* Logo Section */}
          <div className="flex items-center cursor-pointer">
            <img
              src={logoImg}
              alt="MedConnect Logo Icon"
              className="h-10 mr-2 hidden"
              onError={(e) => {
                e.target.style.display = 'none';
                document.getElementById('fallback-icon').style.display = 'block';
              }}
              onLoad={(e) => {
                e.target.style.display = 'block';
                const fallback = document.getElementById('fallback-icon');
                if (fallback) fallback.style.display = 'none';
              }}
            />
            <MedicalServicesIcon id="fallback-icon" className="text-primary text-[32px] mr-2" />
            
            <div className="flex flex-col justify-center">
              <span className="font-semibold text-primary text-xl leading-none">
                MediConnect
              </span>
              <span className="text-primary text-xs font-normal tracking-[0.5px]">
                Healthcare Ecosystem
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <div key={item} className="flex items-center cursor-pointer">
                <span className="font-medium text-[14px] text-[#141414] hover:text-primary transition-colors">
                  {item}
                </span>
                {(item === 'Solutions' || item === 'For Patients' || item === 'For Providers') && (
                  <KeyboardArrowDownIcon className="text-[20px] text-[#838383] ml-2" />
                )}
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Button 
              variant="text" 
//               startIcon={<PersonOutlineOutlinedIcon />}
              onClick={() => navigate('/signup')}
              className="bg-secondary text-primary px-6 py-2 font-semibold hover:bg-primary/15 normal-case rounded-lg cursor-pointer"
            >
              <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 10.7839C13.9125 10.7839 15.4615 9.26602 15.4615 7.39196C15.4615 5.5179 13.9125 4 12 4C10.0875 4 8.53846 5.5179 8.53846 7.39196C8.53846 9.26602 10.0875 10.7839 12 10.7839ZM11.1433 13.1206C8.30192 13.1206 6 15.3763 6 18.1605C6 18.6241 6.38365 19 6.85673 19H17.1433C17.6163 19 18 18.6241 18 18.1605C18 15.3763 15.6981 13.1206 12.8567 13.1206H11.1433Z" stroke="currentColor" strokeWidth="1.2"/>
              </svg>
              Sign up
            </Button>
            {/* <Button 
              variant="contained" 
              color="primary"
//               startIcon={<PersonOutlineOutlinedIcon />}
              onClick={() => navigate("/role-selection")}
              className="px-6 py-2 font-semibold normal-case rounded-lg shadow-none"
            /> */}
            <button 
              onClick={() => navigate('/login')}
              className="flex items-center justify-center gap-2 bg-[#0D8B72] text-white px-4 py-2.5 font-medium hover:bg-[#0D8B72]/90 transition-colors normal-case rounded-lg border-none cursor-pointer"
            >
              <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 10.7839C13.9125 10.7839 15.4615 9.26602 15.4615 7.39196C15.4615 5.5179 13.9125 4 12 4C10.0875 4 8.53846 5.5179 8.53846 7.39196C8.53846 9.26602 10.0875 10.7839 12 10.7839ZM11.1433 13.1206C8.30192 13.1206 6 15.3763 6 18.1605C6 18.6241 6.38365 19 6.85673 19H17.1433C17.6163 19 18 18.6241 18 18.1605C18 15.3763 15.6981 13.1206 12.8567 13.1206H11.1433Z" stroke="currentColor" strokeWidth="1.2"/>
              </svg>
              Log In
            </button>
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden flex items-center">
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </div>
        </Toolbar>
        
        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-6 animate-in slide-in-from-top-2">
            <div className="flex flex-col gap-4 pt-4 border-t border-gray-100">
              {navItems.map((item) => (
                <div key={item} className="flex items-center justify-between py-2 px-2 cursor-pointer hover:bg-gray-50 rounded-md">
                  <span className="font-medium text-[15px] text-[#141414]">{item}</span>
                  {(item === 'Solutions' || item === 'For Patients' || item === 'For Providers') && (
                    <KeyboardArrowDownIcon className="text-[20px] text-[#838383]" />
                  )}
                </div>
              ))}
              <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-gray-100">
                <button onClick={() => navigate('/signup')} className="flex items-center justify-center gap-2 bg-secondary text-[#0D8B72] w-full py-3 font-medium rounded-lg border-none cursor-pointer">
                  <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 10.7839C13.9125 10.7839 15.4615 9.26602 15.4615 7.39196C15.4615 5.5179 13.9125 4 12 4C10.0875 4 8.53846 5.5179 8.53846 7.39196C8.53846 9.26602 10.0875 10.7839 12 10.7839ZM11.1433 13.1206C8.30192 13.1206 6 15.3763 6 18.1605C6 18.6241 6.38365 19 6.85673 19H17.1433C17.6163 19 18 18.6241 18 18.1605C18 15.3763 15.6981 13.1206 12.8567 13.1206H11.1433Z" stroke="currentColor" strokeWidth="1.2"/>
                  </svg>
                  Sign up
                </button>
                <button onClick={() => navigate('/login')} className="flex items-center justify-center gap-2 bg-[#0D8B72] text-white w-full py-3 font-medium rounded-lg border-none cursor-pointer">
                  <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 10.7839C13.9125 10.7839 15.4615 9.26602 15.4615 7.39196C15.4615 5.5179 13.9125 4 12 4C10.0875 4 8.53846 5.5179 8.53846 7.39196C8.53846 9.26602 10.0875 10.7839 12 10.7839ZM11.1433 13.1206C8.30192 13.1206 6 15.3763 6 18.1605C6 18.6241 6.38365 19 6.85673 19H17.1433C17.6163 19 18 18.6241 18 18.1605C18 15.3763 15.6981 13.1206 12.8567 13.1206H11.1433Z" stroke="currentColor" strokeWidth="1.2"/>
                  </svg>
                  Log In
                </button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </AppBar>
  );
};

export default Navbar;
