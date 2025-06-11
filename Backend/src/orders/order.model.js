const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products : [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true, min: 1 }
    }],
    address: { type: String, required: true },
    phone: { type: String, required: true },
    paymentMethod: { type: String, enum: ['Credit Card', 'PayPal', 'Cash on Delivery'], required: true },
    payment : { type: String, enum: ['Paid', 'Unpaid'], default: 'Unpaid' },
    deliveryDate: { type: Date },
    deliveryTime: { type: String },
    totalPrice: { type: Number, required: true, min: 0 },
    status: { type: String, enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'], default: 'Pending' }
}, {
    timestamps: true 
})

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
