import Datatable from "@datatable";
import {
  columns,
  details,
  createFields,
  editFields,
  createValidation,
  editValidation,
} from "./inc";

const Product = (props) => {
  const { name } = props;

  return (
    <Datatable
      title={name}
      columns={columns}
      createValidation={createValidation}
      editValidation={editValidation}
      details={details} // Optional if customize details columns
      createFields={createFields} // Optional if customize create fields
      editFields={editFields} // Optional if customize edit fields
    />
  );
};

export default Product;
