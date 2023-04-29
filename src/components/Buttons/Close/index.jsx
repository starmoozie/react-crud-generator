import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { handleCloseModal } from "@reducer/modalReducer";

export const CloseButton = (props) => {
  const { header } = props;
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.operationReducer.loading);

  const handleClose = () => {
    dispatch(handleCloseModal());
  };

  return (
    <Button onClick={handleClose} disabled={loading}>
      {header || `Close`}
    </Button>
  );
};

export default CloseButton;
