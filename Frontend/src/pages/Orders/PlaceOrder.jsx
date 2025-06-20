import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useCreateOrderMutation } from "../../redux/features/order/ordersApi";
import { clearCart } from "../../redux/features/cart/cartSlice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";



const PlaceOrder = () => {

  const dispatch = useDispatch();
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [payment, setPayment] = useState("Cash on Delivery");
  const [placing, setPlacing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [createOrder] = useCreateOrderMutation();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const cartProducts = useSelector((state) => state.cart.products);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  const handleOrder = async (e) => {
    e.preventDefault();
    setPlacing(true);
    setErrorMsg("");

    const products = cartProducts.map((item) => ({
      productId: item._id,
      quantity: item.quantity,
    }));

    if (!address || !phone || products.length === 0) {
      setErrorMsg("Please fill all fields and add products to cart.");
      setPlacing(false);
      return;
    }

    if (!user) {
      setPlacing(false);
      navigate('/login');
      alert("Please login to place an order.");
      return;
    }
    try {
      await createOrder({
        address,
        phone,
        paymentMethod: payment,
        products,
        totalPrice,
      }).unwrap();
      setSuccess(true);
      dispatch(clearCart());
    } catch (err) {
      console.log(err)
      setErrorMsg(
        err?.data?.message || "Failed to place order. Please try again."  
      )
    setPlacing(false);}
  };

  return (
    <section className="section__container">
      <h2 className="section__header">Place Your Order</h2>
      <p className="section__subheader pb-6">Confirm your shipping and payment details to complete your purchase.</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <form onSubmit={handleOrder} className="col-span-2 bg-white p-6 rounded shadow space-y-4">
          {errorMsg && (
            <div className="bg-red-100 text-red-700 p-2 rounded text-center">{errorMsg}</div>
          )}
          {success && (
            <div className="bg-green-100 text-green-700 p-4 rounded text-center">
              🎉 Your order has been placed successfully!
              <br />
              <Link to="/dashboard/orders" className="text-blue-600 underline">View Orders</Link>
            </div>
          )}

          <div>
            <label className="font-medium block mb-1">Shipping Address</label>
            <textarea
              className="w-full border p-2 rounded"
              rows={3}
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your shipping address"
            />
          </div>
          <div>
            <label className="font-medium block mb-1">Phone Number</label>
            <input
              className="w-full border p-2 rounded"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
            />
          </div>
          <div>
            <label className="font-medium block mb-1">Payment Method</label>
            <select
              className="w-full border p-2 rounded"
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
            >
              <option value="Cash on Delivery">Cash on Delivery</option>
              <option value="Credit Card">Credit Card</option>
              <option value="PayPal">PayPal</option>
            </select>
          </div>
          <button type="submit" className="btn mt-4" disabled={placing}
          >
            {placing ? "Placing Order..." : "Place Order"}
          </button>
        </form>

        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
          {cartProducts.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {cartProducts.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">${item.price * item.quantity}</p>
                </div>
              ))}
              <div className="flex justify-between mt-4 border-t pt-4 font-semibold text-lg">
                <span>Total:</span>
                <span>${totalPrice}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PlaceOrder;
