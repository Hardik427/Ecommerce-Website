const express = require('express')
const Product = require('../products/products.model');
const Reviews = require('../reviews/reviews.model');
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');

const router = express.Router();

//post a product 
router.post('/create-product',verifyToken,verifyAdmin, async (req, res) => {
    try {
        const newProduct = new Product({
            ...req.body,
            author : req.userId
        })
        const savedProduct = await newProduct.save();

        const reviews = await Reviews.find({ productId: savedProduct._id });
        if (reviews.length > 0) {
            const totalRating = reviews.reduce(
                (acc, review) => acc + review.rating,
                0)
            const averageRating = totalRating / reviews.length;
            savedProduct.rating = averageRating;
            await savedProduct.save();
        }
        res.status(201).send(savedProduct)
    } catch (error) {
        console.error("Error Creating new product", error);
        res.status(500).send({ message: "Failed to create new product" })
    }
})

// get all products
router.get('/', async (req, res) => {
    try {
        const { category, color, minPrice, maxPrice, page = 1, limit = 10 } = req.query;

        let filter = {};
        if (category && category != 'all') {
            filter.category = category
        }
        if (color && color != 'all') {
            filter.color = color
        }
        if (minPrice && maxPrice) {
            const min = parseFloat(minPrice);
            const max = parseFloat(maxPrice);
            if (!isNaN(min) && !isNaN(max)) {
                filter.price = { $gte: min, $lte: max }
            }
        }
        const skip = (parseInt(page) - 1) * parseInt(limit)

        const totalProducts = await Product.countDocuments(filter);
        const totalPages = Math.ceil(totalProducts / parseInt(limit))
        const products = await Product.find(filter).skip(skip).limit(parseInt(limit)).populate("author", "email").sort({ createdAt: -1 });

        res.status(200).send({ products, totalPages, totalProducts })
    } catch (error) {
        console.error("Error Fetching all product", error);
        res.status(500).send({ message: "Failed to Get all products" })
    }
})

//get products without filter
router.get('/get-products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ products });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
});

//get single product
router.get('/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId).populate("author", "username email");
        if (!product) {
            res.status(404).send({ message: "Product not found" })
        }
        const review = await Reviews.find({ productId }).populate("userId", "username email");
        res.status(200).send({ product, review })
    } catch (error) {
        console.error("Error Getting product", error);
        res.status(500).send({ message: "Failed to get the product" })
    }
})

//update product
router.patch('/update-product/:id', verifyToken,verifyAdmin, async (req, res) => {
    try {
        const productId = req.params.id;
        const updatedProduct = await Product.findByIdAndUpdate(productId, { ...req.body }, { new: true })
  
        if (!updatedProduct) {
            res.status(404).send({ message: "Product not found." })
        }

        await Reviews.deleteMany({ productId: productId })
        res.status(200).send({
            message: "Product updated successfully",
            product: updatedProduct
        })
    }
    catch (error) {
        console.error("Error Deleting product", error);
        res.status(500).send({ message: "Failed to delete the product" })
    }
})

// delete product 
router.delete('/delete-product/:id',verifyToken,verifyAdmin, async (req, res) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            res.status(404).send({ message: "Product not found." })
        }
        res.status(200).send({
            message: "Product deleted successfully",
            product: deletedProduct
        })
    }
    catch (error) {
        console.error("Error Deleting product", error);
        res.status(500).send({ message: "Failed to delete the product" })
    }
})

// get related products 
router.get('/related-products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).send({ message: "Product ID is required" });
        }
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).send({ message: "Product not found" });
        }

        const titleRegex = new RegExp(
            product.name
                .split(' ')
                .filter(word => word.length > 2)
                .join('|'), 'i'
        )

        const relatedProducts = await Product.find({
            _id: { $ne: id },
            $or: [
                { name: titleRegex },
                { category: product.category },
                { color: product.color },
            ]
        });
        res.status(200).send(relatedProducts);
    } catch (error) {
        console.error("Error Fetching related products", error);
        res.status(500).send({ message: "Failed to get related products" });
    }
});
module.exports = router;