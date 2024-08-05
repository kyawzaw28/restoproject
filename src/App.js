import React, { useContext, useEffect } from "react";

import "./App.css";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "./AuthContext";

const App = () => {
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (token) {
      <Navigate to="/" replace />;
    }
  }, [token]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
