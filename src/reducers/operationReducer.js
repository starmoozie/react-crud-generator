import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { fetchApi } from "@util";

const initialState = {
  loading: false,
  changed: "",
  openAlert: false,
  alertMessage: "",
};

export const processingData = createAsyncThunk(
  "processingData",
  async (params) => {
    const response = await fetchApi(params);
    return response;
  }
);

export const operationReducer = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setOpenLoading(state) {
      state.loading = true;
    },
    setCloseLoading(state) {
      state.loading = false;
    },
    setCloseAlert(state) {
      state.openAlert = false;
      state.alertMessage = "";
    },
  },
  extraReducers(builder) {
    builder.addCase(processingData.fulfilled, (state, action) => {
      switch (action.meta.arg.method.toLowerCase()) {
        case "post":
          state.changed = Math.random().toString(36).slice(2, 7);
          state.openAlert = true;
          state.alertMessage = action.payload.message;

          break;

        case "put":
          state.changed = Math.random().toString(36).slice(2, 7);
          state.openAlert = true;
          state.alertMessage = action.payload.message;

          break;

        default: // This delete method
          state.changed = Math.random().toString(36).slice(2, 7);
          state.openAlert = true;
          state.alertMessage = action.payload.message;

          break;
      }
    });
  },
});

export const { setOpenLoading, setCloseLoading, setCloseAlert } =
  operationReducer.actions;

export default operationReducer.reducer;
