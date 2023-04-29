// MUI
import Drawer from "@mui/material/Drawer";

// Configuration
import { DRAWER_WIDTH } from "@config";

const Desktop = ({ drawer }) => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", sm: "block" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: DRAWER_WIDTH,
        },
      }}
      open
    >
      {drawer}
    </Drawer>
  );
};

export default Desktop;
