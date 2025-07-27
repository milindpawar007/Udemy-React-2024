import React from "react";
import { formatCurrency } from "../../utils/helpers";

import DeleteItem from "./DeleteItem";
function CartItem({ item }) {
  const { name, quantity, totalPrice } = item;
  let pizzaID = item.pizzaID;
  console.log(pizzaID)
  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <DeleteItem pizzaId={pizzaID} />

      </div>
    </li>
  );
}

export default CartItem;
