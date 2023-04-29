import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

// List Menu
import { DASHBOARD_MENU, PRIVATE_MENU } from "@constant";
import { setPrivateMenu } from "@reducer/sidebarReducer";

const PrivateRoute = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPrivateMenu([...DASHBOARD_MENU, ...PRIVATE_MENU]));
  });

  return <Outlet />;
};

export default PrivateRoute;
