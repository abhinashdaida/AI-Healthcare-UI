import { InputBase } from '@mui/material';
import React from "react";

export const LoginWithPhone = ({formikValues}) => {

    return (
        <div>
          <label className="login-form-label block text-xs font-semibold text-gray-500 mb-2">Phone Number</label>
            <div className={`flex rounded-xl focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-100 transition-all overflow-hidden bg-white ${formikValues.touched.phoneNumber && formikValues.errors.phoneNumber ? 'border border-red-500' : 'border border-gray-200'}`}>
                      <div className="flex items-center gap-1 px-3 bg-slate-50 border-r border-gray-100 text-sm font-medium text-slate-700 cursor-pointer">
                        <span>🇮🇳</span> <span>+91</span> <span className="text-[10px] text-gray-400">▼</span>
                      </div>
                      <InputBase
                        type="tel"
                        name="phoneNumber"
                        placeholder="Enter phone number"
                        value={formikValues.values.phoneNumber}
                        onChange={formikValues.handleChange}
                        onBlur={formikValues.handleBlur}
                        className="login-form-input w-full px-4 py-3 text-sm text-slate-800 placeholder-gray-400 outline-none"
                      />
                    </div>
                    {formikValues.touched.phoneNumber && formikValues.errors.phoneNumber && (
                      <p className="text-red-500 text-xs font-semibold mt-2 animate-pulse">
                        {formikValues.errors.phoneNumber}
                      </p>
                    )}
                  </div>
    )
}