import Datatable from "@datatable";
import TextField from "@field/Text";
import * as yup from "yup";
import Chip from "@mui/material/Chip";
import { rupiah } from "@util";

const columns = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "product",
    header: "Transactions",
    enableColumnFilter: false,
    enableSorting: false,
    Cell: ({ cell }) => (
      <Chip
        label={rupiah(cell.getValue()?.length).replace("Rp", "")}
        size="small"
      />
    ),
  },
];

const createFields = [
  {
    accessorKey: "items",
    header: "Items",
    children: [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "phone",
        header: "Phone",
      },
    ],
  },
];

const editFields = [
  {
    accessorKey: "name",
    header: "Name",
    attributes: {
      xs: 12,
      md: 6,
    },
    Cell: (props) => {
      return <TextField {...props} />;
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
    attributes: {
      xs: 12,
      md: 6,
    },
  },
];

const editValidation = yup
  .object({
    name: yup.string().required().max(50),
    phone: yup
      .number()
      .typeError("Sell Price must be a number")
      .nullable()
      .test("len", "Pay Amount max 15 digits", (val) =>
        val ? val.toString().length <= 15 : true
      )
      .transform((_, val) => (val !== "" ? Number(val) : null)),
  })
  .required();

const createValidation = yup
  .object({
    items: yup.array().of(editValidation).required().min(1),
  })
  .required();

const Supplier = (props) => {
  const { name } = props;

  return (
    <Datatable
      title={name}
      columns={columns}
      createFields={createFields} // Optional if customize create fields
      editFields={editFields} // Optional if customize edit fields
      createValidation={createValidation}
      editValidation={editValidation}
    />
  );
};

export default Supplier;
