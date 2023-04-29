import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

// Private Components
import PrivateRoute from "@route/Private";
import PrivateLayout from "@layout/Private";

// List Menu
import { DASHBOARD_MENU, PRIVATE_MENU } from "@constant";

// Configuration
import { PRIVATE_PAGE } from "@config";
import loadable from "@loadable/component";

const Router = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route element={<PrivateLayout />}>
          {[...DASHBOARD_MENU, ...PRIVATE_MENU].map((item, index) => (
            <Route
              key={index}
              path={item.path}
              element={<PageComponent type={PRIVATE_PAGE} {...item} />}
            />
          ))}
        </Route>
      </Route>
    </Routes>
  );
};

const PageComponent = (props) => {
  const regexPattern = /[^A-Za-z0-9]/g;
  const name = props.name.replace(regexPattern, "");
  const type = props.type;

  const ChildComponent = loadable(
    async () => await import(`../pages/${type}/${name}/index.jsx`)
  );

  return <ChildComponent {...props} />;
};

export default Router;
