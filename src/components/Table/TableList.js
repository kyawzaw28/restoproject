import React, {useContext} from 'react'

import TableCard from './TableCard'
import "../../styles/table.css"
import tables from "../../data/tables.js";
import OrderContext from "../../OrderContext";

function TableList() {
const {orders} = useContext(OrderContext)
// console.log(typeof orders[0].tableId);
const getOrderStatus = (tableNumber) => {
  const tableNum = String(tableNumber)
  const order = orders.find(order => order && order.tableId === tableNum) || {};
  return order ? order.status : null;
};
  return (
    <section className="table-management">
      {tables.map((table) => <TableCard key={table.id} tableNumber={table.id} status={getOrderStatus(table.id)}/>)}
  </section>
  )
}

export default TableList