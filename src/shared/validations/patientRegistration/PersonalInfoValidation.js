import * as Yup from "yup";
import {
  MARITALSTATUS_OPTIONS,
  OCCUPATION_OPTIONS,
} from "@/shared/constants/PatientRegistration/dropdownOptions";
export const basicDetalisValidation = Yup.object({
  firstName: Yup.string()
    .trim()
    .required("Please enter your full name!")
    .min(2, "Full name must contain at least 2 characters.")
    .max(100, "Full name cannot exceed 100 characters.")
    .matches(
      /^[A-Za-z\s]+$/,
      "Special characters are not allowed in the full name.",
    )
    .test(
      "no-extra-spaces",
      "Please remove extra spaces from your name.",
      (value) => {
        if (!value) return true;
        return value === value.trim() && !/\s{2,}/.test(value);
      },
    ),
  dateOfBirth: Yup.date()
    .required("Please select your date of birth!")
    .max(new Date(), "Date of birth cannot be in the future."),
  gender: Yup.string().required("Please select your gender!"),
  bloodGroup: Yup.string().required("Please select your blood group!"),
  maritalStatus: Yup.string().oneOf(
    MARITALSTATUS_OPTIONS.map((option) => option.value),
    "Please select a valid marital status.",
  ),
  occupation: Yup.string().oneOf(
    OCCUPATION_OPTIONS.map((option) => option.value),
    "Please select a valid occupation .",
  ),
  email: Yup.string().trim().email("Please enter a valid email address."),
});


export const emergencyContactValidation = Yup.object({
  relationship: Yup.string().required(
    "Please select Emergency Contact Relationship!",
  ),

});


export const HealthOverviewValidation=Yup.object({
  name:Yup.string().required("name is requeird"),
});
