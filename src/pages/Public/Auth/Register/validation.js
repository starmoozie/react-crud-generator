import * as yup from "yup";

export const validation = yup
  .object({
    name: yup.string().required().max(50).default(""),
    email: yup.string().email().required().max(50).default(""),
    password: yup.string().required().default(""),
    password_confirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords not match"),
  })
  .required();
