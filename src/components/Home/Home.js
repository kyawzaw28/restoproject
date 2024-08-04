// import React, {useState} from 'react'
// import { FaPlus } from "react-icons/fa6";
// import { MdProductionQuantityLimits } from "react-icons/md";

// const recipes = [
//     {
//       id: 1,
//       author: "Jim",
//       name: "Chicken Curry",
//       price: 10,
//       description: "Delicious spicy chicken curry",
//     },
//     {
//       id: 2,
//       author: "Aravind",
//       name: "Hamburger",
//       price: 12,
//       description: "Juicy burger with toppings and a soft bun",
//     },
//   ];
  
//   const tables = [
//     {
//       id: 1,
//       name: "Table 1",
//       capacity: 4
//     },
//     {
//       id: 2,
//       name: "Table 2",
//       capacity: 6
//     },
//     {
//       id: 3,
//       name: "Table 3",
//       capacity: 2
//     },
//     {
//       id: 4,
//       name: "Table 4",
//       capacity: 4
//     },
//   ]

// const Home =()=> {
//     const [item, setItem] = useState(null);
//     const [orderPlace, setOrderPlace] = useState([]);
//     const [selectedTable, setSelectedTable] = useState("");
//     const [status, setStatus] = useState("pending");
//     const [orders, setOrders] = useState([]);
//     const [totalPrice, setTotalPrice] = useState(0);
  
//   const [orderItems, setOrderItems] = useState([]);
  
//   const generatedOrderId = () => {
//     return 'order_' + Date.now();
//   }
  
//   const generateOrderItemId = () => {
//     return 'orderItem_' + Date.now();
//   }
//     const handleClick = (recipe)=> {
//       setItem(recipe);
//     }
  
//     const orderList = (id, name, price) => {
//       setOrderPlace((prevOrder)=>{
//         const existingOrder = prevOrder.find((item)=>item.name===name);
  
//         if(existingOrder){
//           return prevOrder.map((item)=>{
//             if(item.name===name){
//               return {...item, id: item.id, count: item.count + 1, price: item.price + price}
//             }else{
//               return item
//             }
//           })
//         }else{
//           return [...prevOrder, {id, name, count:1, price}];
//         }
//       });
//     }
//     // console.log(orderPlace);
  
//     const calculateTotalPrice = () => {
//       return orderPlace.reduce((total, item) => total + item.price, 0);
//       // setTotalPrice(total);
//   };
  
  
  
  
//     const handleSubmit = (e) => {
//       e.preventDefault();
//       calculateTotalPrice();
//       const newOrder = {
//         id: generatedOrderId(),
//         tableId: selectedTable,
//         totalPrice: calculateTotalPrice(),
//         status: status,
//     };
//     const orderItems = orderPlace.map(item => ({
//         id: generateOrderItemId(),
//         orderId: newOrder.id,
//         menuId: item.id,
//         quantity: item.count,
//         price: item.price,
//     }));
//     setOrders([...orders, newOrder]);
//     setOrderItems([...orderItems]);
//     setOrderPlace([]);
//     setSelectedTable("");
//     }
  
//    console.log(orderItems);
    
//   return (
  
  
//     <div>
//         Let's add some content here
//     {recipes.map((recipe) => <li  className="menu-card" key={recipe.id} onClick={() => handleClick(recipe)}>{recipe.name} <FaPlus size={10} onClick={()=>orderList(recipe.id, recipe.name, recipe.price)} /></li>)}
//     {item && (<li>{item.description}</li>)}
//     {orderPlace.map((item,index) => (<li key={index}>{item.name} {item.count} {item.price}</li>))}
//     <form onSubmit={handleSubmit}>
//     <h3>Select Table</h3>
//     <select value={selectedTable} onChange={(e) => setSelectedTable(e.target.value)} required>
//                     <option value="">Select a table</option>
//                     {tables.map(table => (
//                         <option key={table.id} value={table.id}>
//                             Table {table.id}
//                         </option>
//                     ))}
//                 </select>
//     <button type="submit">Submit</button>
//     </form>

//     {orders.map((item) => (<li key={item.id}>{item.tableId} {item.totalPrice}</li>))}
//     </div>
//   )
// }

// export default Home


import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../AuthContext';
import "../../styles/home.css"
import "../../styles/menu.css"
import AppLogoo from '../AppLogoo/AppLogoo';
import TableList from '../Table/TableList';
import OrderList from '../Order/OrderList';
import MenuList from '../Menu/MenuList';
import CurrentOrder from '../CurrentOrder/CurrentOrder';
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
        const existingOrder = prevOrder.find((orderItem) => orderItem.name === item.name);
    
        return existingOrder
          ? prevOrder.map((orderItem) =>
              orderItem.name === item.name
                ? { ...orderItem, id: orderItem.id, count: orderItem.count + 1, price: item.price || orderItem.price }
                : orderItem
            )
          : [...prevOrder, { id: item.id, name: item.name, count: 1, price: item.price }];
      });
    };
  
    const clearOrder = () => {
      setOrderPlace([]);
    }

    const increaseQuantity = (id) => {
      // console.log("hi");
      setOrderPlace((prevOrder) =>
        prevOrder.map((order) =>
          order.id === id ? { ...order, count: order.count + 1 } : order
        )
      );
    };
  
    const decreaseQuantity = (id) => {
      setOrderPlace((prevOrder) =>{
        const updatedOrder = prevOrder.map((order) =>
          order.id === id
            ? {
                ...order,
                count: order.count > 1 ? order.count - 1 : 0
              }
            : order
        )
        return updatedOrder.filter((order) => order.count > 0);
      }
      );
      
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
      <OrderList/>
      <MenuList addOrder={(item)=>orderList(item)}/>
     <TableList/>
     <CurrentOrder makeOrder={orderPlace} tableData={TableData} clearOrder={clearOrder} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} removeItem={removeItem} closeOrderBox={closeOrderBox} isOrderBoxOpen={isOrderBoxOpen}/>
<section>
 
  
  
  

      </section>
    </main>
  </div>
  );
};

export default Home;