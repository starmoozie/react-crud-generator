import { rupiah } from "@util";
import Chip from "@mui/material/Chip";

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
    accessorKey: "code",
    header: "Code",
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
  {
    accessorKey: "is_sold",
    header: "Sold?",
    enableColumnFilter: true,
    filterVariant: "checkbox",
    Cell: ({ cell }) => {
      const value = cell.getValue();
      const color = value ? "success" : "default";
      const label = value ? "Yes" : "No";
      return <Chip color={color} label={label} size="small" />;
    },
  },
];
