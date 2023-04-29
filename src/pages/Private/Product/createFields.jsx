import SelectField from "@field/Select";

export const createFields = [
  {
    accessorKey: "supplier",
    header: "Supplier",
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
    accessorKey: "items",
    header: "Items",
    children: [
      {
        accessorKey: "productCategory",
        header: "Category",
        attributes: {
          xs: 12,
          md: 4,
        },
        Cell: (props) => (
          <SelectField
            {...props}
            endpoint="/product-categories"
            primaryKey="id"
            attribute="name"
            defaultValue={props.row?.items[props.index]?.product || ""}
          />
        ),
      },
      {
        accessorKey: "name",
        header: "Name",
        attributes: {
          xs: 12,
          md: 4,
        },
      },
      {
        accessorKey: "buy_price",
        header: "Buy Price",
        attributes: {
          xs: 12,
          md: 4,
        },
      },
    ],
  },
];
