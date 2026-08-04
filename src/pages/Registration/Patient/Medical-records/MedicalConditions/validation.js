import * as Yup from "yup";

export const medicalValidation = Yup.object({

    allergies: Yup.array(),

    conditions: Yup.array(),

    surgeries: Yup.array(),

    medications: Yup.array(),

    files: Yup.array()
});