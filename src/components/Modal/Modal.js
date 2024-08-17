import React, { useState, useContext, Children } from "react";

import ReactDOM from "react-dom";
import "../../styles/modal.css";

function Modal({ children, isOpen, onClose, modalTitle }) {
  return ReactDOM.createPortal(
    <div className={`mini-box ${isOpen ? "open" : ""}`}>
      <h4>{modalTitle}</h4>
      {children}
      <button className="order-box-close" onClick={onClose}>
        X
      </button>
    </div>,
    document.getElementById("current-order-root")
  );
}

export default Modal;
