import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useDispatch } from "react-redux";
import { handleCloseModal } from "@reducer/modalReducer";
import { getNestedObjectValue } from "@util";

export const DefaultModal = ({ columns, row }) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(handleCloseModal());
  };

  return (
    <>
      <DialogContent>
        <Grid container spacing={2}>
          {columns.map((field, index) => {
            const { accessorKey, Cell, header, attributes } = field;
            const size = attributes ? attributes : { xs: 12, sm: 12, md: 12 };

            return (
              <Grid item {...size} key={`${accessorKey}_${index}`}>
                <Typography
                  variant="caption"
                  display="block"
                  sx={{ textTransform: "capitalize" }}
                  gutterBottom
                  key={`${Math.random().toString(36).slice(2, 7)}`}
                >
                  {header}
                </Typography>
                {Cell ? (
                  <Cell
                    field={field}
                    row={row}
                    key={`${Math.random().toString(36).slice(2, 7)}`}
                  />
                ) : (
                  <Typography
                    variant="subtitle2"
                    gutterBottom
                    key={`${Math.random().toString(36).slice(2, 7)}`}
                  >
                    {accessorKey.includes(".")
                      ? getNestedObjectValue(row, accessorKey)
                      : row[accessorKey]}
                  </Typography>
                )}
              </Grid>
            );
          })}
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </>
  );
};

export default DefaultModal;
