import React from 'react';
import {NavLink} from 'react-router-dom'

const ItemSideBar = () => {
  return(
    <ul className="sideBar">
      <li>
        <NavLink to="/navbar">Select All</NavLink>
      </li>
      <li>
        <NavLink to="/playstation">Playstation</NavLink>
      </li>
      <li>
        <NavLink to="/nintendo">Nintendo</NavLink>
      </li>
      <li>
        <NavLink to="/microsoft">Microsoft</NavLink>
      </li>
    </ul>
  )
};

export default ItemSideBar;