// MUI
import AppBar from "@mui/material/AppBar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

// Other Libraries
import { useDispatch, useSelector } from "react-redux";

// Reducers
import { setMobileOpen } from "@reducer/sidebarReducer";

const Header = () => {
  const mobileOpen = useSelector((state) => state.sidebarReducer.mobileOpen);
  const dispatch = useDispatch();

  const handleDrawerToggle = () => {
    dispatch(setMobileOpen(!mobileOpen));
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        borderRadius: 0,
        boxShadow: "none",
        ":hover": {
          boxShadow: "none",
          transform: "none",
        },
      }}
      elevation={0}
      color="inherit"
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          {import.meta.env.VITE_APP_NAME}
        </Typography>
      </Toolbar>
      <Divider />
    </AppBar>
  );
};

export default Header;
