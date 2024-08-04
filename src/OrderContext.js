import React, { createContext, useState } from 'react';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);
    const [orderItems, setOrderItems] = useState([]);

    const addOrder = (newOrder, items) => {
        setOrders((prevOrders) => [...prevOrders, newOrder]);
        setOrderItems((prevItems) => [...prevItems, ...items]);
      };

  return (
    <OrderContext.Provider value={{ orders,setOrders, orderItems, setOrderItems,addOrder}}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;