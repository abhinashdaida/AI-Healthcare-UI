import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import bgImage from "../../assets/conformation.png";

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

const Confirmation = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      code: "",
    },
    validationSchema: Yup.object({
      code: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      navigate("/new-password");
    },
  });

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white font-sans">
      {/* Left side Image */}
      <div className="hidden md:block md:w-1/2 bg-gray-100 relative">
        <img
          src={bgImage}
          alt="Confirmation Model"
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
            Enter The Confirmation Code
          </h2>

          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
            <InputField label="Confirmation Code" name="code" formik={formik} />

            <button
              type="submit"
              className="w-full bg-black text-white font-semibold rounded-md py-3 mt-4 hover:bg-gray-900 transition-colors"
            >
              Recover Account
            </button>
          </form>

          <div className="text-center mt-6">
            <span className="text-sm text-gray-600">Didn't receive Confirmation Code? </span>
            <button type="button" className="text-sm text-blue-600 font-semibold hover:underline">
              Resend Now
            </button>
          </div>
        </div>

        {/* Footer Text */}
        <div className="absolute bottom-6 right-8 text-xs text-gray-500 font-medium">
          FASCO Terms & Codnitions
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
