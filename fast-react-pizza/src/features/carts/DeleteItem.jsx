import React from 'react'
import Button from "../../ui/Button";
import { deleteItem } from "./cartSlice";
import { useDispatch } from "react-redux";

function DeleteItem({ pizzaID }) {
    const dispatch = useDispatch();

    return (
        <div>
            <Button type='small' onClick={() => { dispatch(deleteItem(pizzaID)) }}>Delete</Button>
        </div>
    )
}

export default DeleteItem
