import React from 'react'

import "../../styles/table.css"
function TableCard({tableNumber, status}) {

// console.log(status);
    const getStatusClass = () => {
        switch (status) {
          case 'paid':
            return 'paid';
          case 'pending':
            return 'pending';
          default:
            return 'no-order';
        }
      };

  return (
    <div className={`table-card ${getStatusClass()}`}>
    {tableNumber}
  </div>
  )
}

export default TableCard