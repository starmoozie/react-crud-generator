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
        const totalAmount = sumBy(data, "totalAmount");
        const totalNetto = sumBy(data, "netto");
        const totalBurutto = sumBy(data, "brutto");

        const values = [
          {
            name: "Total Amount",
            value: totalAmount,
          },
          {
            name: "Total Netto",
            value: totalNetto,
          },
          {
            name: "Total Brutto",
            value: totalBurutto,
          },
        ];

        return (
          <Box sx={{ pl: 1 }}>
            {values.map((value, index) => (
              <Typography variant="body2" key={index} gutterBottom>
                {value.name}: <strong>{rupiah(value.value)}</strong>
              </Typography>
            ))}
          </Box>
        );
      }}
    />
  );
};

export default Sale;
