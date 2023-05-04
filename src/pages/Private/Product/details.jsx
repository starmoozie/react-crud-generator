import { rupiah } from "@util";
import TextColumn from "@column/Text";

export const details = [
  {
    accessorKey: "supplier.name",
    header: "Supplier",
    attributes: {
      xs: 12,
      md: 6,
    },
  },
  {
    accessorKey: "productCategory.name",
    header: "Category",
    attributes: {
      xs: 12,
      md: 6,
    },
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
    Cell: ({ row, field }) => (
      <TextColumn value={rupiah(row[field.accessorKey])} />
    ),
  },
];
