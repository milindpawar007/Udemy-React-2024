import React from 'react';
import { formatCurrency } from '../../utils/helpers';
import Button from '../../ui/Button';
import { useDispatch } from 'react-redux';
import { addItem } from '../carts/cartSlice';
function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const distpatch = useDispatch()

  const handelAddToCart = () => {
    const pizzaObj = {
      pizzaID: id,
      name: name,
      quantity: 1,
      unitePrice: unitPrice,
      totalPrice: unitPrice * 1,
    }
    distpatch(addItem(pizzaObj))
  }
  return (
    <li className="flex gap-4 py-2 ">
      <img src={imageUrl} alt={name} className={`h-24 ${soldOut ? 'grayscale opacity-70' : ''}`} />
      <div className="flex flex-col grow pt-0.5">
        <p className='font-medium'>{name}</p>
        <p className='text-sm italic text-stone-500 capitalize'>{ingredients.join(', ')}</p>
        <div className='mt-auto flex items-center justify-between '>
          {!soldOut ? <p className='text-sm'>{formatCurrency(unitPrice)}</p> : <p className='text-sm uppercase font-medium text-stone-500'>Sold out</p>}
          {!soldOut && <Button type="small" onClick={handelAddToCart}>Add to cart</Button>}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
