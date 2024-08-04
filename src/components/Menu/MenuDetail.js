import React from 'react'
import "../../styles/menu.css"
import Food from "../../assets/donut.jpg"
const MenuDetail = ({menuItem, addOrder}) => {
    return (
      <div className="menu-card">
        <img src={Food} alt="Food" className="menu-image" />
    <h3>{menuItem.name}</h3>
    <p>{menuItem.description}</p>
    <div className="price">${menuItem.price}</div>
    <button onClick={() => addOrder(menuItem)}>Add to Order</button>
  </div>
    );
  };

export default MenuDetail