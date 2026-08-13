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

//contact validation

export const emergencyContactValidation = Yup.object({
  relationship: Yup.string()
    .required("Please select Emergency Contact Relationship!"),

  emergencyName: Yup.string()
    .trim()
    .required("Please enter emergency contact name!")
    .min(2, "Emergency contact name must contain at least 2 characters.")
    .max(100, "Emergency contact name cannot exceed 100 characters.")
    .matches(
      /^[A-Za-z\s]+$/,
      "Special characters and numbers are not allowed in the name.",
    )
    .test(
      "no-extra-spaces",
      "Please remove extra spaces from the name.",
      (value) => {
        if (!value) return true;
        return value === value.trim() && !/\s{2,}/.test(value);
      },
    ),

  emergencyContactNumber: Yup.string()
    .required("Emergency contact phone number is required!")
    .matches(
      /^[0-9]+$/,
      "Only numbers are allowed!",
    )
    .length(
      10,
      "Emergency contact phone number must be exactly 10 digits!",
    ),

  nationality: Yup.string()
    .required("Please select your nationality!"),

  State: Yup.string()
    .trim()
    .required("Please enter your state!")
    .matches(
      /^[A-Za-z\s]+$/,
      "Only letters are allowed in the state name.",
    ),

  City: Yup.string()
    .trim()
    .required("Please enter your city!")
    .matches(
      /^[A-Za-z\s]+$/,
      "Only letters are allowed in the city name.",
    ),
});


// healthoverview validation

export const HealthOverviewValidation = Yup.object({
  height: Yup.string()
    .required("Please enter your height!")
    .matches(
      /^[0-9]+$/,
      "Please enter a valid height using numbers only",
    )
    .test(
      "min-height",
      "Height must be at least 50 cm",
      (value) => !value || Number(value) >= 50,
    )
    .test(
      "max-height",
      "Height cannot exceed 250 cm",
      (value) => !value || Number(value) <= 250,
    ),

  weight: Yup.string()
    .required("Please enter your weight!")
    .matches(
      /^[0-9]+$/,
      "Please enter a valid weight using numbers only",
    )
    .test(
      "min-weight",
      "Weight must be at least 2 kg",
      (value) => !value || Number(value) >= 2,
    )
    .test(
      "max-weight",
      "Weight cannot exceed 300 kg",
      (value) => !value || Number(value) <= 300,
    ),

  bloodPressure: Yup.string()
    .test(
      "blood-pressure-format",
      "Please enter blood pressure in the format 120/80",
      (value) => {
        if (!value) return true;
        return /^\d{2,3}\/\d{2,3}$/.test(value);
      },
    )
    .test(
      "blood-pressure-values",
      "Please enter valid systolic and diastolic values",
      (value) => {
        if (!value) return true;

        const [systolic, diastolic] = value.split("/").map(Number);

        return (
          systolic >= 40 &&
          systolic <= 260 &&
          diastolic >= 40 &&
          diastolic <= 200 &&
          diastolic < systolic
        );
      },
    ),

  bloodSugar: Yup.string()
    .test(
      "blood-sugar-number",
      "Please enter a valid blood sugar reading",
      (value) => {
        if (!value) return true;
        return /^[0-9]+$/.test(value);
      },
    )
    .test(
      "blood-sugar-range",
      "Please enter a blood sugar value between 20 and 600 mg/dL",
      (value) => {
        if (!value) return true;
        return Number(value) >= 20 && Number(value) <= 600;
      },
    ),

  physicalActivityLevel: Yup.string(),

  dietaryPreference: Yup.string(),

  smokingStatus: Yup.string(),

  alcoholConsumption: Yup.string(),
});
