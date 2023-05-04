import { rupiah } from "@util";
import DetailTable from "@detailtable";
import TextColumn from "@column/Text";
import dayjs from "dayjs";

const dataGridColumns = [
  {
    field: "product.code",
    headerName: "Product Code",
    sortable: true,
    flex: 1,
    valueGetter: (params) => params.row.product.code,
    renderHeader: (props) => <b>Code</b>,
  },
  {
    field: "product.name",
    headerName: "Product Name",
    sortable: true,
    flex: 1,
    valueGetter: (params) => params.row.product.name,
    renderHeader: (props) => <b>Name</b>,
  },
  {
    field: "product.buy_price",
    headerName: "Buy Price",
    sortable: true,
    flex: 1,
    valueGetter: (params) => rupiah(params.row.product.buy_price),
    renderHeader: (props) => <b>Buy Price</b>,
  },
  {
    field: "sell_price",
    headerName: "Sell Price",
    sortable: true,
    flex: 1,
    valueGetter: (params) => rupiah(params.row.sell_price),
    renderHeader: (props) => <b>Sell Price</b>,
  },
];

export const details = [
  {
    accessorKey: "date",
    header: "Date",
    attributes: {
      xs: 6,
      md: 4,
    },
    Cell: ({ row }) => (
      <TextColumn value={dayjs(row.date).format("dddd, MMMM D, YYYY")} />
    ),
  },
  {
    accessorKey: "customer.name",
    header: "Customer",
    attributes: {
      xs: 6,
      md: 4,
    },
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
    attributes: {
      xs: 6,
      md: 4,
    },
    Cell: ({ row }) => <TextColumn value={rupiah(row.totalAmount)} />,
  },
  {
    accessorKey: "alreadyPaid",
    header: "Already Paid",
    attributes: {
      xs: 6,
      md: 4,
    },
    Cell: ({ row }) => {
      const data = [
        {
          label: "Checkout",
          value: rupiah(row.checkout_amount),
        },
        {
          label: row.paymentMethod.name,
          value: rupiah(row.pay_amount),
        },
      ];

      return (
        <ul style={{ marginLeft: -65, marginTop: -5, marginBottom: -5 }}>
          {data.map((item) => (
            <ul>
              <li>
                <TextColumn value={item.label} />
                <ul>
                  <li>
                    <TextColumn value={item.value} />
                  </li>
                </ul>
              </li>
            </ul>
          ))}
        </ul>
      );
    },
  },
  {
    accessorKey: "not_paid",
    header: "Unpaid",
    attributes: {
      xs: 6,
      md: 4,
    },
    Cell: ({ row }) => <TextColumn value={rupiah(row.unpaid)} />,
  },
  {
    accessorKey: "refund",
    header: "Refund",
    attributes: {
      xs: 6,
      md: 4,
    },
    Cell: ({ row }) => <TextColumn value={rupiah(row.refund)} />,
  },
  {
    accessorKey: "brutto",
    header: "Brutto",
    attributes: {
      xs: 6,
      md: 4,
    },
    Cell: ({ row }) => <TextColumn value={rupiah(row.brutto)} />,
  },
  {
    accessorKey: "netto",
    header: "Netto",
    attributes: {
      xs: 6,
      md: 4,
    },
    Cell: ({ row }) => <TextColumn value={rupiah(row.netto)} />,
  },
  {
    accessorKey: "receipt_number",
    header: "Receipt Number",
    attributes: {
      xs: 6,
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
