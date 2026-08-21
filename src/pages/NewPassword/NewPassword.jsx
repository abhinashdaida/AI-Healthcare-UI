import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import bgImage from "../../assets/newpassword.png";

import { Icon } from "@iconify/react";

const InputField = ({ label, name, type = "text", formik }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const isPassword = type === "password";

  return (
    <div className="flex flex-col relative pb-5">
      <input
        type={isPassword ? (showPassword ? "text" : "password") : type}
        name={name}
        placeholder={label}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="w-full py-2 bg-transparent outline-none border-b border-gray-300 focus:border-black transition-colors text-sm placeholder-gray-400 pr-8"
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-0 top-2 text-gray-500 hover:text-black transition-colors"
        >
          <Icon icon={showPassword ? "mdi:eye-off-outline" : "mdi:eye-outline"} className="w-5 h-5" />
        </button>
      )}
      {formik.touched[name] && formik.errors[name] ? (
        <span className="text-red-500 text-xs absolute bottom-0 left-0">
          {formik.errors[name]}
        </span>
      ) : null}
    </div>
  );
};

const NewPassword = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, "Must be at least 6 characters")
        .required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: (values) => {
      // Store new password
      sessionStorage.setItem("password", values.password);
      navigate("/signin");
    },
  });

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white font-sans">
      {/* Left side Image */}
      <div className="hidden md:block md:w-1/2 bg-gray-100 relative">
        <img
          src={bgImage}
          alt="New Password Model"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Right side Form */}
      <div className="w-full md:w-1/2 flex flex-col p-8 md:p-12 lg:p-20 relative min-h-screen">
        
        <div className="mb-10 mt-auto mb-auto">
          <h1 className="text-4xl md:text-5xl font-serif text-gray-800 tracking-wide font-bold mb-12">
            FASCO
          </h1>
          <h2 className="text-xl font-semibold text-gray-900 mb-8">
            Enter Your New Password
          </h2>

          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
            <InputField label="New Password" name="password" type="password" formik={formik} />
            <InputField label="Confirmation Password" name="confirmPassword" type="password" formik={formik} />

            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold rounded-md py-3 mt-4 hover:bg-blue-600 transition-colors"
            >
              Submit
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default NewPassword;
