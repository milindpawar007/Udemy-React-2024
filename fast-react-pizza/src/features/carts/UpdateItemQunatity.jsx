import React from 'react'
import Button from '../../ui/Button'
import { useDispatch, useSelector } from 'react-redux'
import { decreseItemQuantity, getCurrentQunatityByid, increseItemQuantity } from './cartSlice'

function UpdateItemQunatity({ pizzaID }) {
    console.log(pizzaID)
    const dispatch = useDispatch();
    const currentQuantity = useSelector(getCurrentQunatityByid(pizzaID))

    return (
        <div className='flex gap-2 items-center md:gap-2'>
            <Button type="round" onClick={() => { dispatch(increseItemQuantity(pizzaID)) }}>+</Button>
            <span className='text-sm font-medium'>{currentQuantity} </span>
            <Button type="round" onClick={() => { dispatch(decreseItemQuantity(pizzaID)) }}>-</Button>
        </div>
    )
}

export default UpdateItemQunatity
