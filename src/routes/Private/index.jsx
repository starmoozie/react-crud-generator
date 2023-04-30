import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@hook";

const PrivateRoute = () => {
  const { cookies } = useAuth();
  const location = useLocation();

  return (
    <>
      {cookies.profile?.token ? (
        <Outlet />
      ) : (
        <Navigate to="/login" state={{ from: location }} />
      )}
    </>
  );
};

export default PrivateRoute;
