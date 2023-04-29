import { rupiah } from "@util";

export const details = [
  {
    accessorKey: "supplier.name",
    header: "Supplier",
  },
  {
    accessorKey: "productCategory.name",
    header: "Category",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "buy_price",
    header: "Buy Price",
    Cell: ({ row, field }) => <>{rupiah(row[field.accessorKey])}</>,
  },
];
