import * as Yup from "yup";

export const Passwordvalidation = Yup.object({
        password: Yup.string()
            .required("Please enter your password.")
            .min(8, "Password must be at least 8 characters.")
            .matches(/[A-Z]/, "Add at least one uppercase letter.")
            .matches(/[a-z]/, "Add at least one lowercase letter.")
            .matches(/[0-9!@#$%^&*]/, "Add at least one number.")
            
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