import * as Yup from "yup";

export const insuranceValidation = Yup.object({

    insurancetype: Yup.array(),

    schemeprovider: Yup.array(),

    holdername: Yup.array(),

    customerid: Yup.array(),

    files: Yup.array()
});             
  