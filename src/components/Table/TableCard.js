import React from "react";

import "../../styles/table.css";
function TableCard({ table, status, tableReservation }) {
  // console.log(status);
  const getStatusClass = () => {
    switch (status) {
      case "paid":
        return "paid";
      case "pending":
        return "pending";
      default:
        return table.isReserved ? "no-order-reserved" : "no-order";
    }
  };

  const handleClick = () => {
    tableReservation(table);
  };

  return (
    <div className={`table-card ${getStatusClass()}`} onClick={handleClick}>
      {table.id}
    </div>
  );
}

export default TableCard;
