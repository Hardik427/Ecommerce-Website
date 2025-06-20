import React, { useState } from "react";
import { useAddProductMutation } from "../../redux/features/product/productsApi";
import { useNavigate } from "react-router-dom";

const AddProducts = () => {
  const navigate = useNavigate();
  const [addProduct, { isLoading }] = useAddProductMutation();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    oldPrice: "",
    image: "",
    color: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      price: parseFloat(formData.price),
      oldPrice: formData.oldPrice ? parseFloat(formData.oldPrice) : undefined,
    };
    try {
      await addProduct(payload).unwrap();
      alert("Product Added Successfully");
      navigate("/admin/manage-products");
    } catch (err) {
      console.error("Error adding product:", err);
      alert("Failed to add product.");
    }
  };

  return (
    <section className="section__container py-10">
      <h1 className="section__header mb-6">Add New Product</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md max-w-xl mx-auto space-y-4"
      >
        {[
          { label: "Product Name", name: "name" },
          { label: "Category", name: "category" },
          { label: "Color", name: "color" },
          { label: "Image URL", name: "image" },
          { label: "Price", name: "price", type: "number" },
          { label: "Old Price", name: "oldPrice", type: "number" },
        ].map(({ label, name, type = "text" }) => (
          <div key={name}>
            <label className="block mb-1 font-medium">{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required={name !== "oldPrice"}
            />
          </div>
        ))}

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="btn bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition"
          disabled={isLoading}
        >
          {isLoading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </section>
  );
};

export default AddProducts;
