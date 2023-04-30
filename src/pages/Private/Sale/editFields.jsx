import { DateField, CheckboxField, TextField, SelectField } from "@field";
import { rupiah } from "@util";
import Chip from "@mui/material/Chip";

export const editFields = [
  {
    accessorKey: "date",
    header: "Date",
    attributes: {
      xs: 12,
      md: 4,
    },
    Cell: (props) => <DateField {...props} />,
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
    accessorKey: "refund_payabled",
    header: "Pay Refund",
    Cell: (props) => {
      const entry = props.row;
      const isDisabled = entry.refund > 0 ? false : true;
      const label = entry.refund_payabled ? (
        <s>{rupiah(entry.refund)}</s>
      ) : (
        rupiah(entry.refund)
      );

      return (
        <>
          <CheckboxField
            {...props}
            defaultValue={entry.refund_payabled}
            isDisabled={isDisabled}
          />
          <Chip label={label} color="info" size="small" />
        </>
      );
    },
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
            filters={[
              {
                id: "is_sold",
                value: "false",
              },
            ]}
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
        Cell: (props) => {
          const defaultValue = props.row?.items[props.index]?.sell_price;

          return <TextField {...props} defaultValue={defaultValue} />;
        },
      },
    ],
  },
];
