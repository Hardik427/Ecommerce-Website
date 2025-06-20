import React from 'react';
import {
  useFetchAllOrdersQuery,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
} from '../../redux/features/order/ordersApi';

const ManageOrders = () => {
  const { data: orders = [], error, isLoading } = useFetchAllOrdersQuery();
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const [deleteOrder] = useDeleteOrderMutation();

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus({ id: orderId, status: newStatus }).unwrap();
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  const handleDelete = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      await deleteOrder(orderId).unwrap();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  if (isLoading) return <h2 className="text-center mt-10">Loading orders...</h2>;
  if (error) return <h2 className="text-center mt-10 text-red-600">Failed to load orders.</h2>;

  return (
    <section className="section__container py-10">
      <h1 className="section__header mb-6">Manage Orders</h1>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-4 text-left">Order ID</th>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Total (₹)</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-t">
                <td className="p-4">{order._id.slice(-6).toUpperCase()}</td>
                <td className="p-4">{order.userId?.username || 'Guest'}</td>
                <td className="p-4">₹{order.totalPrice.toFixed(2)}</td>
                <td className="p-4">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className="border rounded px-2 py-1 text-sm"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="p-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="p-4 space-x-2">
                  <button
                    className="btn text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDelete(order._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ManageOrders;
