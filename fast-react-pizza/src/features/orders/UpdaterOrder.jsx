import React from 'react'
import Button from '../../ui/Button'
import { useFetcher } from 'react-router-dom'
import { updateOrder } from '../../services/apiRestaurant';

function UpdaterOrder({ order }) {
    const fetcher = useFetcher();

    return (
        <fetcher.Form method='PATCH' className='text-right' action={`/order/${order.id}`}>
            <Button type='primary'>
                Make Priority
            </Button>
        </fetcher.Form>
    )
}

export default UpdaterOrder;

export async function action({ request, params }) {
    const data = { priority: true }

    await updateOrder(params.orderId, data)

    return null;
} 
