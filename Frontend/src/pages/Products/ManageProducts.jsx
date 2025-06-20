import React from 'react';
import { Link } from 'react-router-dom';
import { useFetchProductsQuery, useDeleteProductMutation } from '../../redux/features/product/productsApi';

const ManageProducts = () => {
  const {
    data: { products = [] } = {},
    error,
    isLoading,
  } = useFetchProductsQuery();

  const [deleteProduct] = useDeleteProductMutation();

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id).unwrap();
      } catch (err) {
        console.error('Failed to delete product:', err);
      }
    }
  };

  if (isLoading) return <h2 className="text-center mt-10">Loading products...</h2>;
  if (error) return <h2 className="text-center mt-10 text-red-600">Failed to load products.</h2>;

  return (
    <section className="section__container py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="section__header">Manage Products</h1>
        <Link
          to="/admin/add-product"
          className="btn bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition"
        >
          + Add Product
        </Link>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Product</th>
              <th className="p-4 text-left">Price (₹)</th>
              <th className="p-4 text-left">Stock</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr key={product._id} className="border-t">
                <td className="p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-12 w-12 object-cover rounded"
                  />
                </td>
                <td className="p-4">{product.name}</td>
                <td className="p-4">{product.price}</td>
                <td className="p-4">In stock</td>
                <td className="p-4 space-x-2">
                    <Link to={`/admin/edit-product/${product._id}`}> <button className="btn text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                    Edit
                  </button></Link>
                  <button
                    className="btn text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => handleDelete(product._id)}
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

export default ManageProducts;
