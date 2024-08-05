import React, { useContext } from "react";

import OrderCard from "./OrderCard";
import "../../styles/order.css";
import OrderContext from "../../OrderContext";

function OrderList() {
  const { orders, updateOrderStatus } = useContext(OrderContext);
  // const sortOrders = orders.sort((a, b) => a.id - b.id);
  // console.log(typeof sortOrders[0].id);
  return (
    <section className="order-list">
      {orders.length === 0 && <div className="no-orders">No orders today</div>}
      {orders.map((order, index) => (
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
