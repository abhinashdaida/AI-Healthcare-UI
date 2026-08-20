import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Icon } from "@iconify/react";

import bgImage from "../../assets/SignUp.png";

const InputField = ({ label, name, type = "text", formik }) => (
  <div className="flex flex-col relative pb-5">
    <input
      type={type}
      name={name}
      placeholder={label}
      value={formik.values[name]}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      className="w-full py-2 bg-transparent outline-none border-b border-gray-300 focus:border-black transition-colors text-sm placeholder-gray-400"
    />
    {formik.touched[name] && formik.errors[name] ? (
      <span className="text-red-500 text-xs absolute bottom-0 left-0">
        {formik.errors[name]}
      </span>
    ) : null}
  </div>
);

const SignUp = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      phone: Yup.string().required("Required"),
      password: Yup.string()
        .min(6, "Must be at least 6 characters")
        .required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: (values) => {
      const user = {
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        password: values.password,
      };

      // Save registered user
      localStorage.setItem("registeredUser", JSON.stringify(user));

      navigate("/signin");
    },
  });

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white font-sans">
      {/* Left side Image */}
      <div className="hidden md:block md:w-1/2 bg-gray-100 relative">
        <img
          src={bgImage}
          alt="Fashion Model"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Right side Form */}
      <div className="w-full md:w-1/2 flex flex-col p-8 md:p-12 lg:p-20 relative min-h-screen">

        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-serif text-gray-800 tracking-wide font-bold mb-8">
            FASCO
          </h1>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Create Account
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button
              type="button"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              <Icon icon="flat-color-icons:google" className="w-5 h-5" />
              <span className="text-sm font-medium text-gray-700">
                Sign up with Google
              </span>
            </button>
            <button
              type="button"
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              <Icon icon="logos:google-gmail" className="w-5 h-5" />
              <span className="text-sm font-medium text-gray-700">
                Sign up with Email
              </span>
            </button>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-gray-400 font-semibold tracking-wider text-sm">
              OR
            </span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <InputField label="First Name" name="firstName" formik={formik} />
              <InputField label="Last Name" name="lastName" formik={formik} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <InputField label="Email Address" name="email" type="email" formik={formik} />
              <InputField label="Phone Number" name="phone" type="tel" formik={formik} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <InputField label="Password" name="password" type="password" formik={formik} />
              <InputField label="Confirm Password" name="confirmPassword" type="password" formik={formik} />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white font-semibold rounded-md py-3 mt-4 hover:bg-gray-900 transition-colors"
            >
              Create Account
            </button>
          </form>

          <div className="text-center mt-6">
            <span className="text-sm text-gray-600">Already have an account? </span>
            <Link to="/signin" className="text-sm text-blue-600 font-semibold hover:underline">
              Login
            </Link>
          </div>
        </div>

        {/* Footer Text */}
        <div className="absolute bottom-6 right-8 text-xs text-gray-500 font-medium">
          FASCO Terms & Conditions
        </div>
      </div>
    </div>
  );
};

export default SignUp;
