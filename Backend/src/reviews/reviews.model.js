const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const reviewSchema = new Schema({
  reviews : {type: String , requied: true },
  rating : {type: Number , required : true},
  userId : {type : mongoose.Schema.Types.ObjectId, ref: "User" , required:true},
  productId : {type : mongoose.Schema.Types.ObjectId, ref : "Product",required : true}
},{
  timestamps : true
});

const Reviews = model("Review", productSchema);
module.exports = Reviews;