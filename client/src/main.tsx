import ReactDOM from "react-dom/client";
import App from "./App";

import { Provider } from "react-redux";
import { store } from "./app/store";

import { BrowserRouter } from "react-router-dom"; // 👈 ADD THIS

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>   {/* 👈 ADD THIS */}
      <App />
    </BrowserRouter>
  </Provider>
);