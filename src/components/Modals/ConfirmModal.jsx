import Box from "@mui/material/Box";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { handleCloseModal } from "@reducer/modalReducer";
import { setOpenLoading, setCloseLoading } from "@reducer/operationReducer";
import { useForm } from "react-hook-form";
import SubmitButton from "../Buttons/Submit";
import CloseButton from "../Buttons/Close";
import { processingData } from "@reducer/operationReducer";
import { setFetchUrl } from "@util";
import Alert from "../Alert";
import { useState } from "react";
import { Grid } from "@mui/material";
import { useCookies } from "react-cookie";

export const ConfirmModal = (props) => {
  const { row, action, access } = props;
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const location = useLocation();
  const [cookies] = useCookies();

  const { handleSubmit } = useForm({});

  const onSubmit = async () => {
    // Open loading
    dispatch(setOpenLoading());

    const url = setFetchUrl(location.pathname, JSON.stringify([row.id]));

    try {
      // Dispatching fetch api request
      await dispatch(
        processingData({
          token: cookies.profile?.token,
          url: url,
          method: access.method,
        })
      ).unwrap();

      // Close Modal
      dispatch(handleCloseModal());
    } catch (error) {
      // Handling error message
      setError(error.message);
    }
    // Close loading if finished
    dispatch(setCloseLoading());
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: -3 }}>
      <DialogContent>
        <Grid container spacing={2}>
          {error ? <Alert message={error} /> : <></>}
          <Grid item xs={12} md={12}>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to <b>{action}</b> this data? This action
              cannot be undone.
            </DialogContentText>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ pr: 3, pb: 3 }}>
        <CloseButton header="No" />
        <SubmitButton header="Yes" color="error" />
      </DialogActions>
    </Box>
  );
};

export default ConfirmModal;
