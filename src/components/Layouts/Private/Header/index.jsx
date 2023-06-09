// MUI
import AppBar from "@mui/material/AppBar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

// Other Libraries
import { useDispatch, useSelector } from "react-redux";

// Reducers
import { setMobileOpen } from "@reducer/sidebarReducer";

import Profile from "./Profile";
import ThemeSwitcher from "./ThemeSwitcher";

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
        filter: "none",
        boxShadow: "0 12px 20px 6px rgb(104 112 118 / 0.08)",
        ":hover": {
          filter: `none`,
          boxShadow: "0 12px 20px 6px rgb(104 112 118 / 0.08)",
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
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            flexGrow: 1,
            fontWeight: "bold",
          }}
        >
          {import.meta.env.VITE_APP_NAME}
        </Typography>
        <Stack spacing={2} direction="row">
          <ThemeSwitcher />
          <Profile />
        </Stack>
      </Toolbar>
      <Divider />
    </AppBar>
  );
};

export default Header;
