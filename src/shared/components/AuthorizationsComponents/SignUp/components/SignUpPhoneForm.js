import { LoginWithPhone } from '@/shared/components/LoginAndSignup/LoginWithPhone';
import { Button } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { setPhoneNumbers } from "../../../../../state-management/modules/security/securityActions";


export default function SignUpPhoneForm({ phoneNumber, setPhoneNumber, handlePhoneSubmit, onBack }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      phoneNumber: phoneNumber || '',
    },
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: values => {
      const normalizedPhoneNumber = values.phoneNumber.trim();
      setPhoneNumber(normalizedPhoneNumber);
      dispatch(setPhoneNumbers(`+91 ${normalizedPhoneNumber}`));
      handlePhoneSubmit(normalizedPhoneNumber);
    },
    validationSchema: Yup.object({
      phoneNumber: Yup.string()
        .trim()
        .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits.')
        .required('Phone number is required'),
    }),
  });

  // const [error, setError] = useState('');
  console.log("formik.values.phoneNumber", formik.values.phoneNumber);


  return (
    <div className="flex-1 md:w-1/2 lg:w-1/2 flex flex-col justify-between p-8 lg:p-5 bg-white min-h-[600px] lg:min-h-auto">
      {/* Back Button */}
      <Button
        type="button"
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-emerald-700 transition-colors text-xs font-semibold py-1.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-100 cursor-pointer self-start shadow-2xs"
      >
        <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
        Back
      </Button>

      <div className="max-w-md w-full mx-auto my-auto py-6">
        <div className="text-center mb-8">
          <h2 className="login-form-title text-3xl font-bold text-slate-800 tracking-tight">Create Account</h2>
          <p className="login-form-desc text-xs text-gray-500 mt-2 max-w-xs mx-auto leading-relaxed">
            Enter your phone number to get started.
          </p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          
          <LoginWithPhone
            formikValues = {formik}
          />
          <Button
            type="submit"
            className="login-form-btn w-full bg-emerald-800 hover:bg-emerald-900 text-white font-medium text-sm py-3 px-4 rounded-xl shadow-md transition-colors duration-200 mt-2 cursor-pointer"
          >
            Continue
          </Button>
        </form>

        {/* Switch to Login Link */}
        <div className="text-center mt-6">
          <p className="login-form-footer-text text-xs text-gray-500">
            Already have an account? <Button type="button" onClick={() => navigate('/login')} className="text-emerald-700 font-semibold underline hover:text-emerald-800 cursor-pointer p-0 min-w-0">Sign in</Button>
          </p>
        </div>
      </div>

      {/* Compliance Badge */}
      <div className="border mb-28 border-gray-100 rounded-2xl p-4 bg-slate-50/50 flex items-start gap-3 max-w-md mx-auto w-full mt-4 lg:mt-0 shadow-xs">
        <div className=" text-emerald-800 rounded-lg shrink-0">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.25 2.501C10.644 2.614 9.932 2.858 8.838 3.233L8.265 3.428C5.258 4.458 3.755 4.972 3.378 5.51C3.008 6.036 3 7.578 3 10.638L11.25 10.888V2.501ZM11.25 12.468L3 12.218V12.419C3 18.057 7.239 20.793 9.899 21.955C10.409 22.178 10.739 22.322 11.25 22.387V12.468ZM12.75 22.388V12.468L21 12.218V12.419C21 18.057 16.761 20.793 14.101 21.955C13.591 22.178 13.261 22.323 12.75 22.388ZM12.75 10.888V2.5C13.356 2.613 14.068 2.857 15.162 3.232L15.735 3.428C18.742 4.457 20.245 4.971 20.622 5.509C20.992 6.035 21 7.577 21 10.636L12.75 10.888Z" fill="#096B58" />
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