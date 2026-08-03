import React, { useState, useEffect } from 'react';
import { Lock, Eye, EyeOff, CheckCircle2, Headset, X, Circle } from 'lucide-react';

const SecureAccountModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Validation Logic
  const requirements = [
    { id: 1, label: 'At least 8 Characters', test: (pw) => pw.length >= 8 },
    { id: 2, label: 'At least one small letter', test: (pw) => /[a-z]/.test(pw) },
    { id: 3, label: 'At least one capital letter', test: (pw) => /[A-Z]/.test(pw) },
    { id: 4, label: 'At least one number or symbol', test: (pw) => /[\d!@#$%^&*(),.?":{}|<>]/.test(pw) },
  ];

  const metCount = requirements.filter(req => req.test(password)).length;
  
  // Strength Configuration
  const getStrength = () => {
    if (password.length === 0) return { label: '', color: 'bg-gray-200', text: '', width: 'w-0' };
    if (metCount <= 1) return { label: 'Poor', color: 'bg-red-500', text: 'text-red-500', width: 'w-1/4' };
    if (metCount <= 3) return { label: 'Moderate', color: 'bg-orange-400', text: 'text-orange-400', width: 'w-2/4' };
    return { label: 'Great', color: 'bg-[#2D8E8E]', text: 'text-[#2D8E8E]', width: 'w-full' };
  };

  const strength = getStrength();
  const isFormValid = metCount === 4 && password === confirmPassword && password.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm font-sans">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 md:p-10 animate-in fade-in zoom-in duration-300">
        
        {/* Close Button (positioned outside like the image) */}
        <button onClick={onClose} className="absolute -right-4 -top-4 md:-right-6 md:-top-6 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors border border-gray-100">
          <X size={24} className="text-gray-400" />
        </button>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Secure Your Account</h2>
            <p className="text-sm text-slate-400 mt-1 max-w-sm">
              Create a strong password to protect your account and personal information.
            </p>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-2">
              <Headset size={14} />
              <span>Need Help?</span>
            </div>
            <button className="border border-[#2D8E8E] text-[#2D8E8E] px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-[#2D8E8E]/5 transition-colors">
              Contact Support
            </button>
          </div>
        </div>

        {/* Sub-Header */}
        <div className="mb-6">
          <h3 className="text-base font-semibold text-slate-700">Create a strong password</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Create a strong password with a mix of letters, numbers and symbols
          </p>
        </div>

        {/* Form Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Create New Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#2D8E8E]" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your new password"
                className="w-full pl-11 pr-11 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2D8E8E]/20 focus:border-[#2D8E8E] outline-none transition-all placeholder:text-slate-300 text-slate-700"
              />
              <button 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Confirm Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#2D8E8E]" size={18} />
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Enter password again"
                className="w-full pl-11 pr-11 py-3.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#2D8E8E]/20 focus:border-[#2D8E8E] outline-none transition-all placeholder:text-slate-300 text-slate-700"
              />
              <button 
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Strength Meter */}
        {password.length > 0 && (
          <div className="mb-6">
            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className={`h-full transition-all duration-500 ease-out ${strength.width} ${strength.color}`} />
            </div>
            <p className={`text-xs font-semibold mt-1.5 ${strength.text}`}>{strength.label}</p>
          </div>
        )}

        {/* Checklist */}
        <div className="space-y-3 mb-10">
          <h4 className="text-sm font-bold text-slate-700">Should Contain:</h4>
          <div className="grid grid-cols-1 gap-y-2.5">
            {requirements.map((req) => {
              const isMet = req.test(password);
              const isStarted = password.length > 0;
              return (
                <div key={req.id} className="flex items-center gap-3">
                  {isMet ? (
                    <CheckCircle2 className="text-[#2D8E8E] fill-[#2D8E8E]/10" size={18} />
                  ) : (
                    <div className={`w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center ${isStarted ? 'border-red-400' : 'border-gray-200'}`}>
                       {isStarted && <div className="w-1.5 h-1.5 bg-red-400 rounded-full" />}
                    </div>
                  )}
                  <span className={`text-[13px] transition-colors ${
                    isMet ? 'text-[#2D8E8E]' : isStarted ? 'text-red-400' : 'text-slate-400'
                  }`}>
                    {req.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Button */}
        <button 
          disabled={!isFormValid}
          className={`w-full py-4 rounded-xl font-bold transition-all shadow-lg 
            ${isFormValid 
              ? 'bg-[#2D8E8E] text-white hover:bg-[#257a7a] shadow-teal-900/10 active:scale-[0.98]' 
              : 'bg-gray-100 text-slate-400 cursor-not-allowed shadow-none'
            }`}
        >
          Create Profile
        </button>
      </div>
    </div>
  );
};

export default SecureAccountModal;