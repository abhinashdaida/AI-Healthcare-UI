import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  TextField,
  Button,
} from "@mui/material";

const Login = () => {
  const navigate = useNavigate();
  // const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      username: "Abhilash",
      password: "123456",
    },

    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, "Minimum 3 characters")
        .required("Username is required"),

      password: Yup.string()
        .min(6, "Minimum 6 characters")
        .required("Password is required"),
    }),

    onSubmit: (values) => {
      // login(values.username, values.password);
      // alert("Login Successful");
      navigate("/dashboard");
    },
  });

  const handleLogout = () => {
    sessionStorage.removeItem("user");

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-200 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10">

        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-blue-600 mb-2">
            Telemedicine
          </h1>

          <p className="text-gray-500">
            Login to continue
          </p>

        </div>

        <form onSubmit={formik.handleSubmit}>

          <div className="mb-6">

            <TextField
              fullWidth
              label="Username"
              name="username"
              variant="outlined"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.username &&
                Boolean(formik.errors.username)
              }
              helperText={
                formik.touched.username &&
                formik.errors.username
              }
            />

          </div>

          <div className="mb-6">

            <TextField
              fullWidth
              type="password"
              label="Password"
              name="password"
              variant="outlined"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.password &&
                Boolean(formik.errors.password)
              }
              helperText={
                formik.touched.password &&
                formik.errors.password
              }
            />

          </div>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            className="!bg-blue-600 hover:!bg-blue-700 !py-3 !rounded-xl !text-base !font-semibold !shadow-lg"
          >
            Login
          </Button>

        </form>

        <div className="text-center mt-8">

          <span className="text-gray-500">
            Don’t have an account?
          </span>

          <button
            type="button"
            className="ml-2 text-blue-600 font-semibold hover:text-blue-700"
          >
            Sign Up
          </button>

        </div>

      </div>

    </div>
  );
};

export default Login;