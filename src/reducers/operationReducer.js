import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { fetchApi } from "@util";

const initialState = {
  loading: false,
  changed: "",
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
  },
  extraReducers(builder) {
    builder.addCase(processingData.fulfilled, (state, action) => {
      switch (action.meta.arg.method.toLowerCase()) {
        case "post":
          state.changed = Math.random().toString(36).slice(2, 7);

          break;

        case "put":
          state.changed = Math.random().toString(36).slice(2, 7);

          break;

        default: // This delete method
          state.changed = Math.random().toString(36).slice(2, 7);

          break;
      }
    });
  },
});

export const { setOpenLoading, setCloseLoading } = operationReducer.actions;

export default operationReducer.reducer;
