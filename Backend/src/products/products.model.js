const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productSchema = new Schema({
  name: { type: String, required: true, trim: true },
  category: { type: String, trim: true },
  description: { type: String, trim: true },
  price: { type: Number, required: true, min: 0 },
  oldPrice: { type: Number, min: 0 },
  image: { type: String, trim: true },
  color: { type: String, trim: true },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true }
}, {
  timestamps: true
});

const Product = model("Product", productSchema);
module.exports = Product;