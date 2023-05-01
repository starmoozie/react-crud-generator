import { rupiah } from "@util";
import TooltipColumn from "@column/Tooltip";
import DateFilter from "@filter/Date";
import dayjs from "dayjs";
import { useState } from "react";
import { Box, Chip, Tooltip } from "@mui/material";

export const columns = [
  {
    accessorKey: "date",
    header: "Date",
    Filter: ({ column }) => {
      const [filter, setFilter] = useState({
        min: "",
        max: "",
      });

      const handleChange = (data) => {
        const value = data.value ? dayjs(data.value).format("YYYY-MM-DD") : "";
        const filterDate = {
          min: data.name === "min" ? value : filter.min,
          max: data.name === "max" ? value : filter.max,
        };
        setFilter({ ...filter, ...filterDate });

        if (filterDate.min && filterDate.max) {
          column.setFilterValue(filterDate);
        }
        if (!filterDate.min && !filterDate.max) {
          column.setFilterValue([]);
        }
      };

      return (
        <Box
          sx={{ display: "grid", gridTemplateColumns: "6fr 6fr", gap: "1rem" }}
        >
          <DateFilter
            maxDate={filter.maxDate}
            name="min"
            setFilterValue={(e) => handleChange(e)}
            label={`Min Date`}
          />
          <DateFilter
            minDate={filter.min}
            name="max"
            setFilterValue={(e) => handleChange(e)}
            label={`Max Date`}
          />
        </Box>
      );
    },
  },
  {
    accessorKey: "customer.name",
    accessor: "customer.name",
    header: "Customer",
  },
  {
    accessorKey: "items",
    header: "Total Items",
    enableColumnFilter: false,
    Cell: ({ cell }) => {
      const entry = cell.getValue();
      const length = entry ? entry.length : 0;
      const title = length
        ? entry.map((item, index) => (
            <p key={index}>
              Code: {item.product.code}, Buy Price:{" "}
              {rupiah(item.product.buy_price)}, Sell Price:{" "}
              {rupiah(item.sell_price)}
            </p>
          ))
        : "";

      return (
        <TooltipColumn title={title} value={rupiah(length).replace("Rp", "")} />
      );
    },
  },
  {
    accessorKey: "alreadyPaid",
    header: "Already Paid",
    enableColumnFilter: false,
    Cell: ({ cell, row }) => {
      const entry = row.original;
      const tooltip = (
        <>
          <p>Checkout: {rupiah(entry.checkout_amount)}</p>
          <p>
            {entry.paymentMethod?.name}: {rupiah(entry.pay_amount)}
          </p>
        </>
      );

      return <TooltipColumn title={tooltip} value={rupiah(cell.getValue())} />;
    },
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
    enableColumnFilter: false,
    Cell: ({ cell }) => <>{rupiah(cell.getValue())}</>,
  },
  {
    accessorKey: "refund",
    header: "Refund",
    filterVariant: "checkbox",
    Cell: ({ row }) => {
      const entry = row.original;
      const color =
        parseInt(entry.refund) && !entry.refund_payabled
          ? "success"
          : "default";

      const label =
        entry.refund_payabled || !parseInt(entry.refund) ? "No" : "Yes";

      const title =
        entry.refund_payabled || !parseInt(entry.refund) ? (
          <s>{rupiah(row.original.refund)}</s>
        ) : (
          rupiah(row.original.refund)
        );

      return (
        <Tooltip title={title}>
          <Chip color={color} label={label} size="small" />
        </Tooltip>
      );
    },
  },
  {
    accessorKey: "netto",
    header: "Netto",
    enableColumnFilter: false,
    Cell: ({ cell }) => <>{rupiah(cell.getValue())}</>,
  },
  {
    accessorKey: "receipt_number",
    header: "Receipt Number",
  },
];
