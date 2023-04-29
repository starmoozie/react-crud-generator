import { Tooltip, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { handleOpenModal } from "@reducer/modalReducer";
import { Create } from "@icon";
import { CREATE, FORM_MODAL } from "@constant";
import { findCurrentAccess } from "@util";

export const CreateButton = ({ permission }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    const access = findCurrentAccess(permission.access, CREATE);

    dispatch(
      handleOpenModal({
        type: FORM_MODAL,
        action: CREATE,
        access: access,
      })
    );
  };

  return (
    <Tooltip arrow title={CREATE}>
      <Button
        variant="contained"
        onClick={() => handleClick()}
        startIcon={<Create />}
      >
        {CREATE}
      </Button>
    </Tooltip>
  );
};

export default CreateButton;
