import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  useFetchProductByIdQuery,
  useUpdateProductMutation,
} from '../../redux/features/product/productsApi';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, isLoading, error } = useFetchProductByIdQuery(id);
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
;

  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedFields = Object.fromEntries(
      Object.entries(formData).filter(([_, value]) => value !== '')
    );

    if (Object.keys(updatedFields).length === 0) {
      alert("No changes made.");
      return;
    }

    try {
      console.log(updatedFields);
      await updateProduct({ id, ... updatedFields }).unwrap();
      navigate('/admin/manage-products');
    } catch (err) {
      console.error("Failed to update product:", err);
      alert("Failed to update product");
    }
  };

  if (isLoading) return <p className="text-center mt-10">Loading product...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">Error loading product.</p>;

  return (
    <section className="section__container py-10 max-w-2xl mx-auto">
      <h1 className="section__header mb-6">Edit Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
        {[
          { label: "Name", name: "name" },
          { label: "Category", name: "category" },
          { label: "Description", name: "description" },
          { label: "Price", name: "price", type: "number" },
          { label: "Old Price", name: "oldPrice", type: "number" },
          { label: "Image URL", name: "image" },
          { label: "Color", name: "color" },
        ].map(({ label, name, type = "text" }) => (
          <div key={name}>
            <label className="block font-semibold mb-1">{label}</label>
            <input
              type={type}
              name={name}
              placeholder={product.product[name] || ""}
              value={formData[name] || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring focus:ring-primary"
            />
          </div>
        ))}

        <button
          type="submit"
          disabled={isUpdating}
          className="btn bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark transition"
        >
          {isUpdating ? "Updating..." : "Update Product"}
        </button>
      </form>
    </section>
  );
};

export default EditProduct;
