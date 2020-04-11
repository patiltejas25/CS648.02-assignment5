import React from 'react';
import { NavLink } from 'react-router-dom';
import Contents from './Contents.jsx';

function NavBar() {
  return (
    <nav>
      {/* <a href="/">Home</a> */}
      <NavLink exact to="/">Home</NavLink>
      {' | '}
      {/* <a href="/#/products">Product List</a> */}
      <NavLink to="/products">Product List</NavLink>
    </nav>
  );
}
export default function Page() {
  return (
    <div>
      <NavBar />
      <Contents />
    </div>
  );
}
