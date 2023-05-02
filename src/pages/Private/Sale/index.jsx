import Datatable from "@datatable";
import { columns, details, createFields, editFields, validation } from "./inc";
import { sumBy } from "lodash";
import { Typography, Box } from "@mui/material";
import { rupiah } from "@util";

const Sale = (props) => {
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
      BottomToolbar={({ table, data }) => {
        const values = [
          {
            name: "Netto",
            value: sumBy(data, "netto"),
          },
          {
            name: "Brutto",
            value: sumBy(data, "brutto"),
          },
        ];

        return (
          <Box sx={{ pl: 1 }}>
            {values.map((value, index) => (
              <Typography variant="body2" key={index} gutterBottom>
                {value.name}: <b>{rupiah(value.value)}</b>
              </Typography>
            ))}
          </Box>
        );
      }}
    />
  );
};

export default Sale;
