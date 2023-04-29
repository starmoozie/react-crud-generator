import { combineReducers } from "redux";

import sidebarReducer from "./sidebarReducer";
import modalReducer from "./modalReducer";
import operationReducer from "./operationReducer";

const rootReducer = combineReducers({
  sidebarReducer,
  modalReducer,
  operationReducer,
});

export default rootReducer;
