const express = require('express');
const Order = require('../orders/order.model');
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');
const router = express.Router();
// Create a new order
router.post('/create-order',verifyToken, async (req, res) => {
    try {
        const newOrder = new Order({
            ...req.body,
            userId: req.userId
        });
        const savedOrder = await newOrder.save();
        res.status(201).send(savedOrder);
    } catch (error) {
        console.error("Error Creating new order", error);
        res.status(500).send({ message: "Failed to create new order" });
    }
});
// Get all orders for a user
router.get('/', verifyToken, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.userId }).populate('products.productId', 'name price image').sort({ createdAt: -1 });
        res.status(200).send(orders);
    } catch (error) {
        console.error("Error Fetching user orders", error);
        res.status(500).send({ message: "Failed to get user orders" });
    }
});
// Get all orders (Admin)
router.get('/admin', verifyToken,verifyAdmin, async (req, res) => {
    try {
        const orders = await Order.find().populate('userId', 'email').populate('products.productId', 'name price image').sort({ createdAt: -1 });
        res.status(200).send(orders);
    } catch (error) {
        console.error("Error Fetching all orders", error);
        res.status(500).send({ message: "Failed to get all orders" });
    }
});
// Update order status (Admin)
router.put('/update-order/:id', verifyToken,verifyAdmin, async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            status: req.body.status
        }, { new: true }); 
        res.status(200).send({updatedOrder, message: "Order updated successfully"});
    } catch (error) {
        console.error("Error Updating order", error);
        res.status(500).send({ message: "Failed to update order" });
    }
}
);
// Delete an order (Admin)
router.delete('/delete-order/:id', verifyToken,verifyAdmin, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).send({ message: "Order deleted successfully" });
    } catch (error) {
        console.error("Error Deleting order", error);
        res.status(500).send({ message: "Failed to delete order" });
    }
});
// Export the router
module.exports = router;