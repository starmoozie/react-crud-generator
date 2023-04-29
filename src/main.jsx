import { StrictMode } from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { stateProvider } from "@provider";
import { BrowserRouter } from "react-router-dom";
import App from "@/App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={stateProvider}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
