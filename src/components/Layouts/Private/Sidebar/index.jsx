// MUI
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";

// Configuration
import { DRAWER_WIDTH } from "@config";

// Reducers
import Desktop from "./Desktop";
import Mobile from "./Mobile";
import { useSelector } from "react-redux";
import SingleItem from "./SingleItem";

const Sidebar = () => {
  const menu = useSelector((state) => state.sidebarReducer.privateMenu);

  const drawer = (
    <>
      <Toolbar />
      <List>
        {menu.map((item) => {
          return item.children?.length ? (
            <></>
          ) : (
            <SingleItem key={item.id} item={item} />
          );
        })}
      </List>
    </>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: { sm: DRAWER_WIDTH },
        flexShrink: { sm: 0 },
      }}
      aria-label="mailbox folders"
    >
      <Mobile drawer={drawer} />
      <Desktop drawer={drawer} />
    </Box>
  );
};

export default Sidebar;
