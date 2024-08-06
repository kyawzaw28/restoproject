import React, { useState, useContext } from "react";

import ReactDOM from "react-dom";
import OrderContext from "../../OrderContext";
import "../../styles/currentorder.css";

function CurrentOrder({ makeOrder, ...props }) {
  // console.log(props, 'props');
  const [selectedTable, setSelectedTable] = useState("");
  const [status, setStatus] = useState("pending");
  const [selectedValue, setSelectedValue] = useState("");
  const [error, setError] = useState(null);

  const { orders, setOrders, orderItems, setOrderItems, addOrder } =
    useContext(OrderContext);

  const generatedOrderId = () => {
    return Date.now();
  };

  const generateOrderItemId = () => {
    return "orderItem_" + Date.now();
  };

  const calculateTotalPrice = () => {
    const totalPrice = makeOrder.reduce(
      (total, item) => total + item.price * item.count,
      0
    );
    return totalPrice.toFixed(2);
  };
  const handleAddOrder = () => {
    if (selectedTable === "") {
      setError("Please select a table");
      return error;
    } else {
      setError(null);
      const newOrder = {
        id: generatedOrderId(),
        tableId: selectedTable,
        totalPrice: calculateTotalPrice(),
        status: status,
      };

      const orderItems = makeOrder.map((item) => ({
        id: generateOrderItemId(),
        orderId: newOrder.id,
        menuId: item.id,
        quantity: item.count,
        price: item.price,
      }));
      addOrder(newOrder, orderItems);
      props.clearOrder();
      setSelectedTable("");
      props.closeOrderBox();
    }
  };

  const getOrderStatus = (tableNumber) => {
    const tableNum = String(tableNumber);
    const order =
      orders.find((order) => order && order.tableId === tableNum) || {};
    return order ? order.status : null;
  };
  // console.log(error);
  // console.log(orders, 'orders');
  // console.log(orderItems, 'orderItems');

  return ReactDOM.createPortal(
    <div className={`mini-box ${props.isOrderBoxOpen ? "open" : ""}`}>
      <h4>Current Order</h4>
      <div className="mini-box-content">
        <h3>Select Table</h3>

        <div className="table-selection">
          <label htmlFor="table-select">Table:</label>
          <select
            id="table-select"
            value={selectedTable}
            onChange={(e) => setSelectedTable(e.target.value)}
            required
          >
            <option value="">Select a table</option>
            {props.tableData.map((table) => (
              <option
                key={table.id}
                value={table.id}
                disabled={getOrderStatus(table.id) === "pending"}
              >
                Table {table.id}
              </option>
            ))}
          </select>
          {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}
        </div>
        {makeOrder.map((item) => (
          <div className="mini-box-item" key={item.id}>
            <span>{item.name}</span>

            <div className="quantity-controls">
              <div>
                <button onClick={() => props.decreaseQuantity(item.id)}>
                  -
                </button>
                <span>{item.count}</span>
                <button onClick={() => props.increaseQuantity(item.id)}>
                  +
                </button>
              </div>
              <div>${item.price}</div>
            </div>
            <button
              className="remove-item"
              onClick={() => props.removeItem(item.id)}
            >
              x
            </button>
          </div>
        ))}
      </div>
      <div className="mini-box-total">
        <span>Total Cost: ${calculateTotalPrice()}</span>
      </div>
      <button className="proceed-order" onClick={handleAddOrder}>
        Proceed
      </button>
      <button className="order-box-close" onClick={() => props.closeOrderBox()}>
        X
      </button>
    </div>,
    document.getElementById("current-order-root")
  );
}

export default CurrentOrder;
