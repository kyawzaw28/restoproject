import React, { useContext } from "react";
import { AuthContext } from "../../AuthContext";

import "../../styles/applogo.css";
function AppLogoo() {
  const { logout } = useContext(AuthContext);
  return (
    <div>
      <header>
        <div className="logo">Restaurant App</div>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </header>
    </div>
  );
}

export default AppLogoo;
