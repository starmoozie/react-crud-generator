import { Alert as AlertM, AlertTitle, Grid } from "@mui/material";

const Alert = ({ message }) => {
  return (
    <Grid item md={12} xs={12}>
      {/* <Stack sx={{ width: "100%" }} spacing={2}> */}
      <AlertM severity="error" sx={{ width: "100%" }}>
        <AlertTitle>Error</AlertTitle>
        <strong>{message}</strong>
      </AlertM>
      {/* </Stack> */}
    </Grid>
  );
};

export default Alert;
