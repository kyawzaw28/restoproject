import React, {useState} from 'react'
import recipes from '../../data/receipes'
import "../../styles/menu.css"
import MenuDetail from './MenuDetail'

function MenuList({addOrder}) {
    const [selectedMenuItem, setSelectedMenuItem] = useState(null);
    const handleMenuItemClick = (menuItem) => {
        setSelectedMenuItem(menuItem);
      };
    //   console.log(recipes, 'recipes');
  return (
  //   <div className="menu-container">
  //   <div className="menu-list-container">
  //     <h2>Menu</h2>
  //     <ul className="menu-list">
  //       {recipes.map((item) => (
  //         <li key={item.id} className="menu-item" onClick={() => handleMenuItemClick(item)}>
  //           <span className="menu-item-name">{item.name}</span>
  //           <span className="menu-item-price">${item.price}</span>
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  //   {selectedMenuItem && (
  //     <div className="menu-detail-container">
  //       <MenuDetail menuItem={selectedMenuItem} />
  //     </div>
  //   )}
  // </div>
  <section className="menu-section">
      {recipes.map((item) => (
          <MenuDetail key={item.id} menuItem={item} addOrder={addOrder} />
      ))}
      </section>
  )
}

export default MenuList