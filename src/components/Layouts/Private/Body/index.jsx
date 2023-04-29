// MUI
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

// Other Libraries
import { Outlet } from "react-router-dom";

// Configuration
import { DRAWER_WIDTH } from "@config";

const Body = () => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
      }}
    >
      <Toolbar />
      <Outlet />
    </Box>
  );
};

export default Body;
