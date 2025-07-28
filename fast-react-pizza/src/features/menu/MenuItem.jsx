import React from 'react';
import { formatCurrency } from '../../utils/helpers';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, getCurrentQunatityByid, decreseItemQuantity, increseItemQuantity } from '../carts/cartSlice';
import DeleteItem from '../carts/DeleteItem';
import UpdateItemQunatity from '../carts/UpdateItemQunatity';


function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch()
  const isInCart = useSelector(getCurrentQunatityByid(id))

  const handelAddToCart = () => {
    const pizzaObj = {
      pizzaId: id, // ✅ correct key name
      name,
      quantity: 1,
      unitPrice: unitPrice, // ✅ correct spelling
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(pizzaObj))
  }
  return (
    <li className="flex gap-4 py-2 ">
      <img src={imageUrl} alt={name} className={`h-24 ${soldOut ? 'grayscale opacity-70' : ''}`} />
      <div className="flex flex-col grow pt-0.5">
        <p className='font-medium'>{name}</p>
        <p className='text-sm italic text-stone-500 capitalize'>{ingredients.join(', ')}</p>
        <div className='mt-auto flex items-center justify-between '>
          {!soldOut ? <p className='text-sm'>{formatCurrency(unitPrice)}</p> : <p className='text-sm uppercase font-medium text-stone-500'>Sold out</p>}
          {isInCart > 0 &&
            <div className='flex items-center gap-6 sm:gap-8'>
              <UpdateItemQunatity pizzaID={id} />
              <DeleteItem pizzaID={id} />
            </div>}
          {!soldOut && !isInCart && (<Button Button type="small" onClick={handelAddToCart}>Add to cart</Button>)}
        </div>
      </div>
    </li >
  );
}

export default MenuItem;
