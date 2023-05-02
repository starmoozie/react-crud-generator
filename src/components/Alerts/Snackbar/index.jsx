import { Snackbar as Snack } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { setCloseAlert } from "@reducer/operationReducer";

const Snackbar = () => {
  const state = useSelector((state) => state.operationReducer);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setCloseAlert());
  };

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={() => handleClose()}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <Snack
      open={state.openAlert}
      autoHideDuration={6000}
      onClose={() => handleClose()}
      message={state.alertMessage}
      action={action}
    />
  );
};

export default Snackbar;
