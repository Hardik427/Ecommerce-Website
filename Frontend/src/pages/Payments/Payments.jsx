import React from 'react'
import { useFetchUserOrdersQuery } from '../../redux/features/order/ordersApi'

const Payments = () => {

    // This component will show the previous payments made by the user
    const { data: orders, error, isLoading } = useFetchUserOrdersQuery;
    console.log(data);
  return (
    <div>
     <h1>Payments</h1>
    </div>
  )
}

export default Payments
