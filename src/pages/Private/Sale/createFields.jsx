import { DateField, CheckboxField, SelectField } from "@field";

export const createFields = [
  {
    accessorKey: "date",
    header: "Date",
    attributes: {
      xs: 12,
      md: 4,
    },
    Cell: (props) => (
      <DateField {...props} defaultValue={new Date()} autoFocus={true} />
    ),
  },
  {
    accessorKey: "customer",
    header: "Customer",
    attributes: {
      xs: 12,
      md: 4,
    },
    Cell: (props) => (
      <SelectField
        {...props}
        endpoint="/customers"
        primaryKey="id"
        attribute="name"
        defaultValue={props?.row?.customer || null}
      />
    ),
  },
  {
    accessorKey: "receipt_number",
    header: "Receipt Number",
    attributes: {
      xs: 12,
      md: 4,
    },
  },
  {
    accessorKey: "checkout_amount",
    header: "Checkout Amount",
    attributes: {
      xs: 12,
      md: 4,
    },
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment Method",
    attributes: {
      xs: 12,
      md: 4,
    },
    Cell: (props) => (
      <SelectField
        {...props}
        endpoint="/payment-methods"
        primaryKey="id"
        attribute="name"
        defaultValue={props?.row?.paymentMethod || null}
      />
    ),
  },
  {
    accessorKey: "pay_amount",
    header: "Pay Amount",
    attributes: {
      xs: 12,
      md: 4,
    },
  },
  {
    accessorKey: "pay_refund",
    header: "Pay Refund",
    Cell: (props) => <CheckboxField {...props} />,
  },
  {
    accessorKey: "items",
    header: "Items",
    children: [
      {
        accessorKey: "product",
        header: "Product",
        attributes: {
          xs: 12,
          md: 6,
        },
        Cell: (props) => (
          <SelectField
            {...props}
            endpoint="/products"
            primaryKey="id"
            attribute="code"
            defaultValue={props.row?.items[props.index]?.product || ""}
          />
        ),
      },
      {
        accessorKey: "sell_price",
        header: "Sell Price",
        attributes: {
          xs: 12,
          md: 6,
        },
      },
    ],
  },
];
