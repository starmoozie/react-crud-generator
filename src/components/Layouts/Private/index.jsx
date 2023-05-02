// MUI
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

// Configuration
import Header from "@layout/Private/Header";
import Sidebar from "@layout/Private/Sidebar";
import Body from "@layout/Private/Body";
import Snackbar from "../../Alerts/Snackbar";

const PrivateLayout = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header />
      <Sidebar />
      <Body />
      <Snackbar />
    </Box>
  );
};

export default PrivateLayout;
