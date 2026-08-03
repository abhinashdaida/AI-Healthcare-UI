import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function PasswordForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const uniqueId = location.state?.uniqueId || '';

  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password) {
      alert('Please enter your password.');
      return;
    }
    // Simulate successful login
    navigate('/');
  };

  return (
    <div className="flex-1 md:w-1/2 lg:w-1/2 p-8 lg:p-5 flex flex-col justify-between bg-white min-h-[600px] lg:min-h-auto">
      {/* Back Button */}
      <button
        onClick={() => navigate('/login')}
        className="flex items-center gap-2 text-slate-500 hover:text-emerald-700 transition-colors text-xs font-semibold py-1.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-100 cursor-pointer self-start shadow-2xs"
      >
        <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
        Back
      </button>

      <div className="max-w-md w-full mx-auto my-auto py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="login-form-title text-3xl font-bold text-slate-800 tracking-tight">Secure Access</h2>
          <p className="login-form-desc text-sm text-gray-500 mt-2 max-w-xs mx-auto leading-relaxed">
            Enter your password to continue securely to your healthcare workspace.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="login-form-label block text-xs font-semibold text-gray-500 mb-2">Password</label>
            <div className="flex items-center border border-gray-200 rounded-xl focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-100 transition-all overflow-hidden bg-white px-4 py-3.5">
              <input
                type="password"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-sm text-slate-800 placeholder-gray-400 outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="login-form-btn w-full bg-emerald-800 hover:bg-emerald-900 text-white font-medium text-sm py-3 px-4 rounded-xl shadow-md transition-colors duration-200 mt-4 cursor-pointer"
          >
            Continue
          </button>
        </form>

        {/* Forgot Password Link */}
        <div className="text-center mt-6">
          <p className="login-form-footer-text text-xs text-gray-500">
            Forgot your password? <button type="button" className="text-emerald-700 font-semibold underline hover:text-emerald-800 cursor-pointer">Reset here!</button>
          </p>
        </div>
      </div>

      {/* Compliance Badge */}
      <div className="border mb-28 border-gray-100 rounded-2xl p-4 bg-slate-50/50 flex items-start gap-3 max-w-md mx-auto w-full mt-4 lg:mt-0 shadow-xs">
        <div className=" text-emerald-800 rounded-lg shrink-0">
          <svg width="24" height="26" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.25 4.501C10.644 4.614 9.932 4.858 8.838 5.233L8.265 5.428C5.258 6.458 3.755 6.972 3.378 7.51C3.008 8.036 3 9.578 3 12.638L11.25 12.888V4.501ZM11.25 14.468L3 14.218V14.419C3 20.057 7.239 22.793 9.899 23.955C10.409 24.178 10.739 24.322 11.25 24.387V14.468ZM12.75 24.388V14.468L21 14.218V14.419C21 20.057 16.761 22.793 14.101 23.955C13.591 24.178 13.261 24.323 12.75 24.388ZM12.75 12.888V4.5C13.356 4.613 14.068 4.857 15.162 5.232L15.735 5.428C18.742 6.457 20.245 6.971 20.622 7.509C20.992 8.035 21 9.577 21 12.636L12.75 12.888Z" fill="#096B58" />
          </svg>

        </div>
        <div>
          <h4 className="login-form-hipaa-badge-title text-xs font-bold text-slate-800 leading-tight">Secure & HIPAA Ready</h4>
          <p className="login-form-hipaa-badge-desc text-[11px] text-gray-500 leading-normal mt-0.5 font-medium">
            Your healthcare information is protected with enterprise grade encryption and secure authentication.
          </p>
        </div>
      </div>
    </div>
  );
}
