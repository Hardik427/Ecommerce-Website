const express = require('express');
const Order = require('../orders/order.model')
const Product = require('../products/products.model')
const User = require('../users/user.model');
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');
const router = express.Router();

router.get('/summary',verifyToken,verifyAdmin, async (req, res) => {
    try {
        console.log('Summary endpoint hit:', req.userId);
        const totalRevenueAgg = await Order.aggregate([
            { $group: { _id: null, total: { $sum: '$totalPrice' } } }
        ]);
        const totalRevenue = totalRevenueAgg[0]?.total || 0;
        const totalOrders = await Order.countDocuments();
        const totalProducts = await Product.countDocuments();
        const totalCustomers = await User.countDocuments({ role: 'user' });

        res.json({
      totalRevenue,
      totalOrders,
      totalProducts,
      totalCustomers,
    });
    } catch (error) {
        console.log(error)
    }
})
module.exports = router