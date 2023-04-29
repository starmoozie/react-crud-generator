import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import * as Icon from "@icon";
import { CONFIRM_MODAL } from "@constant";
import { useDispatch } from "react-redux";
import { handleOpenModal } from "@reducer/modalReducer";
import { findCurrentAccess } from "@util";
import _ from "lodash";

const LineButton = ({ closeMenu, row, permission }) => {
  const dispatch = useDispatch();

  const handleClick = (button) => {
    const access = findCurrentAccess(permission.access, button.name);

    dispatch(
      handleOpenModal({
        type: button.modalType,
        action: button.name,
        row: row,
        size: button.modalType === CONFIRM_MODAL ? "sm" : "md",
        access: access,
      })
    );
    closeMenu();
  };

  return (
    <>
      {permission?.access.map((button) => {
        const IconName = Icon[button.name];
        return (
          <MenuItem key={button.name} onClick={() => handleClick(button)}>
            <ListItemIcon>
              <IconName fontSize="small" />
            </ListItemIcon>
            <ListItemText>{button.name}</ListItemText>
          </MenuItem>
        );
      })}
    </>
  );
};

export default LineButton;
