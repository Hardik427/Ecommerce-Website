import React from 'react'
import { useFetchUserOrdersQuery } from '../../redux/features/order/ordersApi'
const Orders = () => {
    // This component fetches and displays user orders
    const { data: orders, error, isLoading } = useFetchUserOrdersQuery();

    if (isLoading) { 
        return (
            <div className='text-center text-2xl font-semibold py-12'>
                <span className="animate-spin mr-2 inline-block w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full"></span>
                Loading...
            </div>
        );
    } 
    if (error) {
        console.error("Error fetching orders:", error);
        return <div className='text-center text-2xl font-semibold'>Something went wrong!</div>
    } 
    console.log(orders);
  return (
    <>
      <h1>my orders</h1>
    </>
  )
}

export default Orders
