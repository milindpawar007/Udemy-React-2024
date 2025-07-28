import { Link } from 'react-router-dom';
import React from 'react';
import { useSelector } from 'react-redux';
import { getTotalCartPrice, getTotalQuantity } from './cartSlice';
function CartOverview() {
  const totalQunatity = useSelector(getTotalQuantity);
  const totalPrice = useSelector(getTotalCartPrice);

  if (!totalQunatity) { return null }
  return (
    <div className="bg-stone-800 px-4 py-6 uppercase text-stone-200 sm:px-6 text-sm md:text-base flex items-center justify-between">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>{totalQunatity} pizzas</span>
        <span>${totalPrice}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
