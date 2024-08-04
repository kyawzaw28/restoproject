import React, { useContext, useState } from 'react'

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import "../../styles/order.css"
import OrderContext from '../../OrderContext';

function OrderCard({order}) {
  const{setOrders}=useContext(OrderContext);
  const [confirm, setConfirm] = useState(false);
    const confirmDelete = (newStatus) => {
    
        confirmAlert({
          title: 'Confirm to Submit',
          message: 'Are you sure to do this.',
          buttons: [
            {
              label: 'Yes',
              onClick: () =>  setOrders((prevItems) =>
                prevItems.map((item) =>
                  item.id === order.id ? { ...item, status: "paid" } : item
                )
              ),
            },
            {
              label: 'No',
              onClick: () => setConfirm(false),
            }
          ]
        });

       
        setConfirm(true);
      };

      // console.log(order);
  return (
    <div className="order-card">
    <h4>#{order.id}</h4>
    <div className="order-details">
      <p>Total: {order.totalPrice}</p>
      <p>Status: <span className={`status ${confirm ? "paid" : "pending"}`}>{order.status}</span></p>
    </div>
    <button onClick={confirmDelete}>Pay</button>
  </div>
  )
}

export default OrderCard