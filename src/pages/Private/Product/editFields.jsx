import SelectField from "@field/Select";

export const editFields = [
  {
    accessorKey: "supplier",
    header: "Supplier",
    attributes: {
      xs: 12,
      md: 6,
    },
    Cell: (props) => (
      <SelectField
        {...props}
        endpoint="/suppliers"
        primaryKey="id"
        attribute="name"
        defaultValue={props?.row?.supplier || null}
      />
    ),
  },
  {
    accessorKey: "productCategory",
    header: "Category",
    attributes: {
      xs: 12,
      md: 6,
    },
    Cell: (props) => (
      <SelectField
        {...props}
        endpoint="/product-categories"
        primaryKey="id"
        attribute="name"
        defaultValue={props?.row?.productCategory || null}
      />
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    attributes: {
      xs: 12,
      md: 6,
    },
  },
  {
    accessorKey: "buy_price",
    header: "Buy Price",
    attributes: {
      xs: 12,
      md: 6,
    },
  },
];
