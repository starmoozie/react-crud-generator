import { rupiah } from "@util";

export const columns = [
  {
    accessorKey: "customer.name",
    header: "Customer",
    Cell: ({ row }) => <>{row.original.supplier?.name}</>,
  },
  {
    accessorKey: "productCategory.name",
    header: "Category",
    Cell: ({ row }) => <>{row.original.productCategory?.name}</>,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "buy_price",
    header: "Buy Price",
    enableColumnFilter: false,
    Cell: ({ cell }) => <>{rupiah(cell.getValue())}</>,
  },
];
