import Datatable from "@datatable";
import * as yup from "yup";

const columns = [
  {
    accessorKey: "name",
    header: "Name",
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
    ],
  },
];

const editFields = [
  {
    accessorKey: "name",
    header: "Name",
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

const PaymentMethod = (props) => {
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

export default PaymentMethod;
