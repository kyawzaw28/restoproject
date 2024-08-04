import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";
import { AuthProvider } from "./AuthContext";
import { OrderProvider } from "./OrderContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <OrderProvider>
        <App />
      </OrderProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
