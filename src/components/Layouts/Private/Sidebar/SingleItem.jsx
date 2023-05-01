// MUI
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useLocation, useNavigate } from "react-router-dom";

import * as Icon from "@icon";
import { useEffect } from "react";
import { setActivePrivateMenu } from "@reducer/sidebarReducer";
import { useDispatch } from "react-redux";

const SingleItem = ({ item }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const ItemIcon = Icon[item.name.replace(" ", "")];

  const handleClick = () => {
    navigate(item.path);
  };

  useEffect(() => {
    if (item.path === location.pathname) {
      dispatch(setActivePrivateMenu(item));
    }
  }, [location.pathname]);

  return (
    <ListItem key={item.id} sx={{ pl: 2, pr: 2, pt: 0, pb: 0 }}>
      <ListItemButton
        selected={location.pathname === item.path}
        onClick={() => handleClick()}
      >
        <ListItemIcon>
          <ItemIcon />
        </ListItemIcon>
        <ListItemText primary={item.name} />
      </ListItemButton>
    </ListItem>
  );
};

export default SingleItem;
