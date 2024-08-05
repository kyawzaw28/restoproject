import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../AuthContext";
import "../../styles/home.css";
import "../../styles/menu.css";
import AppLogoo from "../AppLogoo/AppLogoo";
import TableList from "../Table/TableList";
import OrderList from "../Order/OrderList";
import MenuList from "../Menu/MenuList";
import CurrentOrder from "../CurrentOrder/CurrentOrder";
import TableData from "../../data/tables.js";
const Home = () => {
  //   const { logout } = useContext(AuthContext);
  // console.log(TableData);
  const [item, setItem] = useState(null);
  const [orderPlace, setOrderPlace] = useState([]);
  const [isOrderBoxOpen, setIsOrderBoxOpen] = useState(false);

  // console.log(orderPlace);

  const orderList = (item) => {
    setIsOrderBoxOpen(true);
    setOrderPlace((prevOrder) => {
      const existingOrder = prevOrder.find(
        (orderItem) => orderItem.name === item.name
      );

      return existingOrder
        ? prevOrder.map((orderItem) =>
            orderItem.name === item.name
              ? {
                  ...orderItem,
                  id: orderItem.id,
                  count: orderItem.count + 1,
                  price: item.price || orderItem.price,
                }
              : orderItem
          )
        : [
            ...prevOrder,
            { id: item.id, name: item.name, count: 1, price: item.price },
          ];
    });
  };

  const clearOrder = () => {
    setOrderPlace([]);
  };

  const increaseQuantity = (id) => {
    // console.log("hi");
    setOrderPlace((prevOrder) =>
      prevOrder.map((order) =>
        order.id === id ? { ...order, count: order.count + 1 } : order
      )
    );
  };

  const decreaseQuantity = (id) => {
    setOrderPlace((prevOrder) => {
      const updatedOrder = prevOrder.map((order) =>
        order.id === id
          ? {
              ...order,
              count: order.count > 1 ? order.count - 1 : 0,
            }
          : order
      );
      return updatedOrder.filter((order) => order.count > 0);
    });
  };

  const removeItem = (id) => {
    setOrderPlace((prevOrder) => prevOrder.filter((order) => order.id !== id));
  };

  const closeOrderBox = () => {
    setIsOrderBoxOpen(false); // Function to close the order box
  };

  return (
    <div>
      <AppLogoo />
      <main>
        <OrderList />
        <MenuList addOrder={(item) => orderList(item)} />
        <TableList />
        <CurrentOrder
          makeOrder={orderPlace}
          tableData={TableData}
          clearOrder={clearOrder}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          removeItem={removeItem}
          closeOrderBox={closeOrderBox}
          isOrderBoxOpen={isOrderBoxOpen}
        />
        <section></section>
      </main>
    </div>
  );
};

export default Home;
