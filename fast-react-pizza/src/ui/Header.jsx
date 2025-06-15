import React from 'react';
import { Link } from 'react-router-dom';
import SearchOrder from '../features/orders/searchOrder';
import Username from '../features/users/Username';
function Header() {
  return (
    <header className="border-b border-stone-300 bg-yellow-500 px-4 py-3 uppercase sm:px-6 flex justify-between items-center">
      <Link to="/" className="tracking-widest">
        Fast React Pizz co.
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
}

export default Header;
