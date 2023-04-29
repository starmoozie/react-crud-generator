import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showModal: false,
  type: "",
  action: "",
  row: "",
  size: "md",
  access: "",
};

export const modalReducer = createSlice({
  name: "modal",
  initialState,
  reducers: {
    handleOpenModal(state, action) {
      state.showModal = true;
      state.type = action.payload.type;
      state.action = action.payload.action;
      state.row = action.payload.row || "";
      state.size = action.payload.size || "md";
      state.access = action.payload.access;
    },
    handleCloseModal(state) {
      state.showModal = false;
      state.type = "";
      state.action = "";
      state.row = "";
      state.size = "md";
      state.access = "";
    },
  },
});

export const { handleOpenModal, handleCloseModal } = modalReducer.actions;

export default modalReducer.reducer;
