import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@hook";

const AuthRoute = () => {
  const { cookies } = useAuth();
  const location = useLocation();

  return (
    <>
      {cookies.profile?.token ? (
        <Navigate to={`/`} state={{ from: location }} />
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default AuthRoute;
