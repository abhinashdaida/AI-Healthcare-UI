import * as Yup from "yup";

export const profileValidationSchema = Yup.object({
  shopName: Yup.string().required("Shop Name is required"),
  phone: Yup.string().required("Contact Number is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  address: Yup.string().required("Address is required"),
});

export const adminValidationSchema = Yup.object({
  name: Yup.string().required("Admin Name is required"),
  email: Yup.string().email("Invalid email address").required("Admin Email is required"),
  phone: Yup.string().required("Phone Number is required"),
  username: Yup.string().required("Username is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .test("confirmPassword-required", "Confirm Password is required", function(value) {
      const { password } = this.parent;
      if (password && password.length > 0) {
        return value && value.length > 0;
      }
      return true;
    }),
});

export const generalValidationSchema = Yup.object({
  websiteName: Yup.string().required("Website Name is required"),
  currency: Yup.string().required("Currency is required"),
  country: Yup.string().required("Country is required"),
  language: Yup.string().required("Language is required"),
});
