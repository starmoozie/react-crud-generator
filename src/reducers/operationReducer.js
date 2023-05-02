import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { fetchApi, handleAfterFetch } from "@util";

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
          handleAfterFetch(state, action);

          break;

        case "put":
          handleAfterFetch(state, action);

          break;

        default: // This delete method
          handleAfterFetch(state, action);

          break;
      }
    });
  },
});

export const { setOpenLoading, setCloseLoading, setCloseAlert } =
  operationReducer.actions;

export default operationReducer.reducer;
