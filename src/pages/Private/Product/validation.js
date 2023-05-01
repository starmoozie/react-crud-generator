import * as yup from "yup";

export const childValidation = yup
  .object({
    productCategory: yup
      .object()
      .required()
      .transform((value) => (Array.isArray(value) || !value ? null : value)),
    name: yup
      .string()
      .transform((value) => (Array.isArray(value) ? null : value))
      .required(),
    buy_price: yup
      .number()
      .nullable()
      .test("len", "Sell Price max 15 digits", (val) =>
        val ? val.toString().length <= 15 : true
      )
      .transform((value) => (Number.isNaN(value) ? null : value)),
  })
  .required();

export const createValidation = yup
  .object({
    supplier: yup
      .object()
      .required()
      .transform((value) => (Array.isArray(value) ? null : value)),
    items: yup.array().of(childValidation).required().min(1),
  })
  .required();

export const editValidation = yup
  .object({
    supplier: yup
      .object()
      .required()
      .transform((value) => (Array.isArray(value) ? null : value)),
    productCategory: yup
      .object()
      .required()
      .transform((value) => (Array.isArray(value) || !value ? null : value)),
    name: yup
      .string()
      .transform((value) => (Array.isArray(value) ? null : value))
      .required(),
    buy_price: yup
      .number()
      .nullable()
      .test("len", "Sell Price max 15 digits", (val) =>
        val ? val.toString().length <= 15 : true
      )
      .transform((value) => (Number.isNaN(value) ? null : value)),
  })
  .required();
