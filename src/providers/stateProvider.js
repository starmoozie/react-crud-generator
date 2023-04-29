import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "@reducer";

export const stateProvider = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
