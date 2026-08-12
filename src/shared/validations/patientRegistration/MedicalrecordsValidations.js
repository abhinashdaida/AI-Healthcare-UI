import * as Yup from "yup";
import {
  FILE_ERRORS,
  FILE_TYPES,
  MAX_SIZE,
} from "../../components/Registration/UploadFiles/uploadConstants";

export const Passwordvalidation = Yup.object({
        password: Yup.string()
            .required("Please enter your password.")
            .min(8, "Password must be at least 8 characters.")
            .matches(/[A-Z]/, "Add at least one uppercase letter.")
            .matches(/[a-z]/, "Add at least one lowercase letter.")
            .matches(/[0-9!@#$%^&*]/, "Add at least one number."),
        confirmPassword: Yup.string()
        .required("Please confirm your password.")
        .oneOf(
            [Yup.ref("password")],
            "Passwords do not match."
        ),
    });

export const createLoginValidation = Yup.object({

    mediConnectId: Yup.string()

        .trim()

        .required("MediConnect ID is required.")

        .matches(
            /^[A-Za-z0-9-]+$/,
            "Only letters, numbers and '-' are allowed."
        )

        .min(
            6,
            "MediConnect ID must contain at least 6 characters."
        )

        .max(
            20,
            "MediConnect ID cannot exceed 20 characters."
        ),

});

export const insuranceValidation = Yup.object({

    insurancetype: Yup.array(),

    schemeprovider: Yup.array(),

    holdername: Yup.array(),

    customerid: Yup.array(),

    files: Yup.array()
});


export const medicalValidation = Yup.object({

    allergies: Yup.array(),

    conditions: Yup.array(),

    surgeries: Yup.array(),

    medications: Yup.array(),

    files: Yup.array()
});



export const validateFiles = ({
  selectedFiles,
  existingFiles,
  maxFiles,
}) => {
  const errors = [];

  if (
    maxFiles !== null &&
    existingFiles.length + selectedFiles.length > maxFiles
  ) {
    errors.push({
      ...FILE_ERRORS.MAX_FILES,
      message: `Only ${maxFiles} files allowed.`,
    });
  }

  selectedFiles.forEach((file) => {
    if (!FILE_TYPES.includes(file.type)) {
      if (!errors.some((e) => e.type === FILE_ERRORS.INVALID_TYPE.type)) {
        errors.push(FILE_ERRORS.INVALID_TYPE);
      }
      return;
    }

    if (file.size > MAX_SIZE) {
      if (!errors.some((e) => e.type === FILE_ERRORS.SIZE.type)) {
        errors.push(FILE_ERRORS.SIZE);
      }
      return;
    }

    const duplicate = existingFiles.some(
      (item) =>
        item.name === file.name &&
        item.file.size === file.size
    );

    if (duplicate) {
      if (!errors.some((e) => e.type === FILE_ERRORS.DUPLICATE.type)) {
        errors.push(FILE_ERRORS.DUPLICATE);
      }
    }
  });

  return errors;
};