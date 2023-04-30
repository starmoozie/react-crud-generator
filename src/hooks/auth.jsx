import React, {
  useContext,
  createContext,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DASHBOARD_MENU, PRIVATE_MENU } from "@constant/menu";
import { setPrivateMenu } from "@reducer/sidebarReducer";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [cookies, setCookies, removeCookie] = useCookies(null);
  const privateMenu = useSelector((state) => state.sidebarReducer.privateMenu);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const setMenu = (hasMenu) => {
    dispatch(
      setPrivateMenu(hasMenu ? [...DASHBOARD_MENU, ...PRIVATE_MENU] : [])
    );
  };

  const removeExistingCookies = () => {
    setMenu();
    removeCookie("profile");
    navigate("/login");
  };

  const fetchProfile = useCallback(async (url) => {
    const request = await fetch(url, {
      headers: { Authorization: `Bearer ${cookies.profile?.token}` },
    });
    const response = await request.json();

    if (response.success) {
      setMenu(true);
    } else {
      removeExistingCookies();
    }
  }, []);

  useEffect(() => {
    if (cookies.profile && !privateMenu.length) {
      fetchProfile(`${import.meta.env.VITE_API_URL}/profile`);
    }
  }, []);

  const login = useCallback(async (auth, callback) => {
    setMenu(true);
    setCookies("profile", auth);
    navigate("/");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = useCallback(async () => {
    removeExistingCookies();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(
    () => ({ cookies, login, logout }),
    [cookies, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
