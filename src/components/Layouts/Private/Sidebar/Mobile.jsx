// MUI
import Drawer from "@mui/material/Drawer";

// Other Libraries
import { useDispatch, useSelector } from "react-redux";

// Configuration
import { DRAWER_WIDTH } from "@config";

// Reducers
import { setMobileOpen } from "@reducer/sidebarReducer";

const Mobile = ({ drawer }) => {
  const mobileOpen = useSelector((state) => state.sidebarReducer.mobileOpen);
  const dispatch = useDispatch();

  const handleDrawerToggle = () => {
    dispatch(setMobileOpen(!mobileOpen));
  };

  return (
    <Drawer
      variant="temporary"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        display: { xs: "block", sm: "none" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: DRAWER_WIDTH,
        },
      }}
    >
      {drawer}
    </Drawer>
  );
};

export default Mobile;
