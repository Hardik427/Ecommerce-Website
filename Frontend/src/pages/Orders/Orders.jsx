import React from 'react'
import { useFetchUserOrdersQuery } from '../../redux/features/order/ordersApi'
const Orders = () => {
    // // This component fetches and displays user orders
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
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-3xl font-bold mb-6'>Your Orders</h1>
        {orders && orders.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {orders.map((order) => (
            <div key={order._id} className='bg-white shadow-md rounded-lg p-6'>
              <div className='mb-4'>
                <h2 className='text-xl font-semibold'>Order ID: {order._id}</h2>
                <p className='text-gray-600'>Status: {order.status}</p>
                <p className='text-gray-600'>Total: ${order.totalPrice}</p>
              </div>
              <div className='border-t pt-4'>
                <h3 className='text-lg font-semibold mb-2'>Products:</h3>
                <ul className='list-disc pl-5'>
                  {order.products.map((item) => (
                    <li key={item.productId._id} className='mb-2'>
                      <div className='flex justify-between'>
                        <span>{item.productId.name} (x{item.quantity})</span>
                        <span>${item.productId.price * item.quantity}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='text-center text-xl font-semibold'>No orders found</div>
      )}
    </div>
                  
    </>
  )
}

export default Orders
