import * as yup from "yup";

export const validation = yup
  .object({
    email: yup.string().email().required().max(50).default(""),
    password: yup.string().required().default(""),
  })
  .required();
