import Datatable from "@datatable";
import TextField from "@field/Text";
import * as yup from "yup";

const columns = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "phone",
    header: "Phone",
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
    phone: yup.string().nullable().max(15),
  })
  .required();

const createValidation = yup
  .object({
    items: yup.array().of(editValidation).required().min(1),
  })
  .required();

const Customer = (props) => {
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

export default Customer;
