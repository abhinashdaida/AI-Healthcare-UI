import * as Yup from "yup";

// Create Login ID Validation

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