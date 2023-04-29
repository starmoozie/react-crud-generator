import Button from "@mui/material/Button";
import { Save } from "@icon";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";

const SubmitButton = (props) => {
  const { header, color } = props;
  const loading = useSelector((state) => state.operationReducer.loading);

  return (
    <Button
      color={color || "primary"}
      variant="contained"
      type="submit"
      startIcon={loading ? <CircularProgress size={20} /> : <Save />}
      disabled={loading}
    >
      {header || `Submit`}
    </Button>
  );
};

export default SubmitButton;
