import { rupiah } from "@util";
import DetailTable from "@detailtable";
import TextColumn from "@column/Text";
import dayjs from "dayjs";

const dataGridColumns = [
  {
    field: "product.code",
    headerName: "Product Code",
    sortable: false,
    flex: 1,
    valueGetter: (params) => params.row.product.code,
  },
  {
    field: "product.name",
    headerName: "Product Name",
    sortable: false,
    flex: 1,
    valueGetter: (params) => params.row.product.name,
  },
  {
    field: "product.buy_price",
    headerName: "Buy Price",
    sortable: false,
    flex: 1,
    valueGetter: (params) => rupiah(params.row.product.buy_price),
  },
  {
    field: "sell_price",
    headerName: "Sell Price",
    sortable: false,
    flex: 1,
    valueGetter: (params) => rupiah(params.row.sell_price),
  },
];

export const details = [
  {
    accessorKey: "date",
    header: "Date",
    attributes: {
      xs: 12,
      md: 4,
    },
    Cell: ({ row }) => <>{dayjs(row.date).format("dddd, MMMM D, YYYY")}</>,
  },
  {
    accessorKey: "customer.name",
    header: "Customer",
    attributes: {
      xs: 12,
      md: 4,
    },
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
    attributes: {
      xs: 12,
      md: 4,
    },
    Cell: ({ row }) => <TextColumn value={rupiah(row.totalAmount)} />,
  },
  {
    accessorKey: "alreadyPaid",
    header: "Already Paid",
    attributes: {
      xs: 12,
      md: 4,
    },
    Cell: ({ row }) => (
      <>
        <TextColumn value={`Checkout: ${rupiah(row.checkout_amount)}`} />
        <TextColumn
          value={`${row.paymentMethod.name}: ${rupiah(row.pay_amount)}`}
        />
      </>
    ),
  },
  {
    accessorKey: "not_paid",
    header: "Unpaid",
    attributes: {
      xs: 12,
      md: 4,
    },
    Cell: ({ row }) => <TextColumn value={rupiah(row.unpaid)} />,
  },
  {
    accessorKey: "refund",
    header: "Refund",
    attributes: {
      xs: 12,
      md: 4,
    },
    Cell: ({ row }) => <TextColumn value={rupiah(row.refund)} />,
  },
  {
    accessorKey: "brutto",
    header: "Brutto",
    attributes: {
      xs: 12,
      md: 4,
    },
    Cell: ({ row }) => <TextColumn value={rupiah(row.brutto)} />,
  },
  {
    accessorKey: "netto",
    header: "Netto",
    attributes: {
      xs: 12,
      md: 4,
    },
    Cell: ({ row }) => <TextColumn value={rupiah(row.netto)} />,
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
    accessorKey: "items",
    header: "Items",
    Cell: ({ row }) => (
      <DetailTable row={row.items} columns={dataGridColumns} />
    ),
  },
];
