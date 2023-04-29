import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  privateMenu: [],
  activePrivateMenu: "",
  mobileOpen: false,
};

export const sidebarReducer = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    setPrivateMenu(state, action) {
      state.privateMenu = action.payload;
    },
    setActivePrivateMenu(state, action) {
      state.activePrivateMenu = action.payload;
    },
    setMobileOpen(state, action) {
      state.mobileOpen = action.payload;
    },
  },
});

export const { setPrivateMenu, setActivePrivateMenu, setMobileOpen } =
  sidebarReducer.actions;

export default sidebarReducer.reducer;
