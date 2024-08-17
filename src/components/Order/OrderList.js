import React, { useContext, useEffect, useState, useMemo } from "react";

import OrderCard from "./OrderCard";
import "../../styles/order.css";
import OrderContext from "../../OrderContext";

function OrderList() {
  const { orders, updateOrderStatus } = useContext(OrderContext);
  const [statusFilter, setStatusFilter] = useState("all");
  const filteredOrders =
    statusFilter === "all"
      ? orders
      : orders.filter((order) => order.status === statusFilter);
  const sortOrders = filteredOrders.sort((a, b) => Number(b.id) - Number(a.id));

  const handleClear = () => {
    setStatusFilter("all");
  };

  return (
    <section className="order-list">
      <div class="select-container">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">Select a status</option>
          <option value="pending">pending</option>
          <option value="paid">paid</option>
        </select>
        <button class="clear-button" onClick={handleClear}>
          Clear
        </button>
      </div>
      {orders.length === 0 && <div className="no-orders">No orders today</div>}
      {sortOrders.map((order, index) => (
        <OrderCard
          key={index}
          order={order}
          updateOrderStatus={updateOrderStatus}
        />
      ))}
    </section>
  );
}

export default OrderList;
