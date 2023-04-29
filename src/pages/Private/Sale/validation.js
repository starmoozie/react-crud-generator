import * as yup from "yup";

export const childValidation = yup
  .object({
    product: yup
      .object()
      .required()
      .transform((value) => (Array.isArray(value) || !value ? null : value)),
    sell_price: yup
      .number()
      .required()
      .test(
        "len",
        "Sell Price max 15 digits",
        (val) => val.toString().length <= 15
      )
      .transform((value) => (Number.isNaN(value) ? null : value)),
  })
  .required();

export const validation = yup
  .object({
    date: yup.date().required(),
    customer: yup
      .object()
      .required()
      .transform((value) => (Array.isArray(value) ? null : value)),
    receipt_number: yup
      .string()
      .transform((value) => (Array.isArray(value) ? null : value))
      .nullable(),
    checkout_amount: yup
      .number()
      .required()
      .test(
        "len",
        "Checkout Amount max 15 digits",
        (val) => val.toString().length <= 15
      )
      .transform((value) => (Number.isNaN(value) ? null : value)),
    paymentMethod: yup
      .object()
      .nullable()
      .transform((value) => (Array.isArray(value) ? null : value)),
    pay_amount: yup
      .number()
      .typeError("Pay Amount must be a number")
      .nullable()
      .test(
        "len",
        "Pay Amount max 15 digits",
        (val) => val.toString().length <= 15
      )
      .transform((_, val) => (val !== "" ? Number(val) : null)),
    pay_refund: yup
      .bool()
      // .oneOf([true], "You must accept the terms and conditions")
      .transform((value) => (Array.isArray(value) ? false : value)),
    items: yup.array().of(childValidation).required().min(1),
  })
  .required();
