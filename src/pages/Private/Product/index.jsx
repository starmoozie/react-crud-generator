import Datatable from "@datatable";
import { columns, details, createFields, editFields, validation } from "./inc";

const Product = (props) => {
  const { name } = props;

  return (
    <Datatable
      title={name}
      columns={columns}
      createValidation={validation}
      editValidation={validation}
      details={details} // Optional if customize details columns
      createFields={createFields} // Optional if customize create fields
      editFields={editFields} // Optional if customize edit fields
    />
  );
};

export default Product;
