import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now() },
  updatedDetails: {
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    productDescription: { type: String, required: true },
    department: { type: String, required: true },
    id: { type: Number, required: true },
  },
  product: { type: mongoose.Types.ObjectId, ref: "Product", required: true },
  status: { type: String, default: "pending" },
  author: { type: mongoose.Types.ObjectId, ref: "User" },
});

const Reviews = mongoose.model("Review", reviewSchema);

export default Reviews;
