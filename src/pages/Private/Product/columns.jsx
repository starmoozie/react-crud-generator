import { rupiah } from "@util";

export const columns = [
  {
    accessorKey: "supplier.name",
    accessor: "supplier.name",
    header: "Supplier",
  },
  {
    accessorKey: "productCategory.name",
    accessor: "productCategory.name",
    header: "Category",
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
