import React from 'react';
import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart, getTotalCartPrice } from '../carts/cartSlice';
import EmptyCart from '../carts/EmptyCart'
import store from '../../store'
import { formatCurrency } from '../../utils/helpers';
import { fetchAddress } from '../users/userSlice';
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );



function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);
  const dispatch = useDispatch()
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const formErrors = useActionData();
  const { username, status: addressStatus, position, address, error: errorAddress } = useSelector(state => state.user)
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priportyPrice = withPriority ? totalCartPrice * 0.20 : 0;
  const totalPrice = totalCartPrice + priportyPrice;

  const isLoadingAddress = addressStatus === "loading";

  if (!cart.length) return <EmptyCart />
  return (
    <div className='py-6 px-4'>
      <h2 className='text-xl font-semibold mb-8'>Ready to order? Let's go!</h2>


      <Form method="POST">

        <div className='mb-5 flex gap-2 flex-col sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>First Name</label>
          <input type="text" name="customer" defaultValue={username} required className='input grow' />
        </div>

        <div className='mb-5 flex gap-2 flex-col sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>Phone number</label>
          <div className='grow'>
            <input type="tel" name="phone" required className='input w-full' />
            {formErrors?.phone && <p className='text-sm mt-2 ml-2 px-2 text-red-700 bg-red-100 rounded-md'>{formErrors.phone}</p>}
          </div>

        </div>

        <div className='mb-5 flex gap-2 flex-col sm:flex-row sm:items-center relative'>
          <label className='sm:basis-40'>Address</label>
          <div className='grow'>
            <input type="text"
              name="address"
              disabled={isLoadingAddress}
              defaultValue={address}
              required className='input w-full' />
            {addressStatus === 'error' && (
              <p className='text-sm mt-2 ml-2 px-2 text-red-700 bg-red-100 rounded-md s'>{errorAddress}</p>
            )}
          </div>
          <span className="absolute right-[3px] z-50 md:right-[5px] md:top-[5px]">
            <Button type="small" disabled={isLoadingAddress} onClick={(e) => {
              e.preventDefault();
              dispatch(fetchAddress())

            }}>Get Position</Button>
          </span>
        </div>

        <div className='mb-12 flex items-center gap-5'>
          <input
            className='h-6 w-6 accent-yellow-400 focus:outline-none  focus:ring focus:ring-yellow-400 focus:ring-offset-2'
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className='font-medium' htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)}></input>
          <input type="hidden" name="position" value={position.latitude && position.longitude ? `${position.latitude},${position.longitude}` : ''}></input>
          <Button type='primary' disabled={isSubmitting}>{isSubmitting ? "Placing Order..." : `Order now from ${formatCurrency(totalPrice)}`}</Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const errors = {};

  if (!isValidPhone(data.phone)) errors.phone = 'Please Enter valid Phone';
  if (Object.keys(errors).length > 0) return errors;

  console.log(data);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };
  console.log(order);
  const newOrder = await createOrder(order);


  store.dispatch(clearCart())




  return redirect(`/order/${newOrder.id}`);
}
export default CreateOrder;
