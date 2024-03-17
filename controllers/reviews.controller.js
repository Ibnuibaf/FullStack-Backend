import JWT from "jsonwebtoken";
import dotenv from "dotenv";
import Reviews from "../models/reviews.model.js";
import HTTPStatus from "../constants/httpStatus.constant.js";
import Products from "../models/products.model.js";
import uploadImageToCloud from "../utils/cloudinary.js";

dotenv.config();

export const getReviews = async (req, res) => {
  try {
    const { token } = req.cookies;
    const { _id, role } = JWT.verify(token, process.env.JWT_SECRET_ID);
    let reviews = [];
    if (role == "team member") {
      reviews = await Reviews.find({ author: _id })
        .populate("author", "_id email")
        .populate("product");
    } else if (role == "admin") {
      reviews = await Reviews.find({ status: "pending" })
        .populate("author", "_id email")
        .populate("product");
    }
    res
      .status(HTTPStatus.Success)
      .send({ success: true, message: "Fetched all reviews", reviews });
  } catch (error) {
    console.log(error);
    res
      .status(HTTPStatus.ServerError)
      .send({ success: false, message: error.message });
  }
};

export const getReviewAnalytics = async (req, res) => {
  try {
    const { token } = req.cookies;
    // const { _id, role } = JWT.verify(token, process.env.JWT_SECRET_ID);
    let analitics = [];
    // if (role == "team member") {
    // analitics = await Reviews.aggregate([
    // { $match: { author: _id } },
    // { $group: { _id: "$status", count: { $sum: 1 } } },
    // { $project: { _id: 0, status: "$_id", count: 1 } }
    // ]);
    // } else if (role == "admin") {
    analitics = await Reviews.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
      { $project: { _id: 0, status: "$_id", count: 1 } },
    ]);
    // }
    res
      .status(HTTPStatus.Success)
      .send({ success: true, message: "Fetched analitics", analitics });
  } catch (error) {
    console.log(error);
    res
      .status(HTTPStatus.ServerError)
      .send({ success: false, message: error.message });
  }
};

export const addReview = async (req, res) => {
  try {
    let {
      productId,
      productName,
      price,
      image,
      productDescription,
      department,
      id,
    } = req.body;
    const { token } = req.cookies;
    const { _id } = JWT.verify(token, process.env.JWT_SECRET_ID);
    const product = await Products.findById(productId);
    if (!product) {
      return res
        .status(HTTPStatus.ClientError)
        .send({ success: false, message: "Product not found, Try Again" });
    }
    console.log("Reached here");
    if (req.file) {
      const response = await uploadImageToCloud(req.file);
      if (response.isError) {
        return res
          .status(HTTPStatus.ServerError)
          .send({ success: false, message: response.message });
      }
      console.log("Reached here file upload");
      image = response.secure_url;
    }
    console.log("Reached here finished upload");
    await Reviews.create({
      author: _id,
      product: productId,
      updatedDetails: {
        productName,
        price,
        image,
        productDescription,
        department,
        id,
      },
    });
    res
      .status(HTTPStatus.Success)
      .send({ success: true, message: "Added review as pending" });
  } catch (error) {
    console.log(error);
    res
      .status(HTTPStatus.ServerError)
      .send({ success: false, message: error.message });
  }
};

export const changeReviewStatus = async (req, res) => {
  try {
    const { _id, status } = req.body;
    if (status != "rejected" && status != "approved") {
      return res
        .status(HTTPStatus.ClientError)
        .send({ success: false, message: "Invalid status, Try Again" });
    }
    const review = await Reviews.findById(_id);
    if (!review) {
      return res
        .status(HTTPStatus.ClientError)
        .send({ success: false, message: "Review Not Found, Try Again" });
    }
    review.status = status;
    await review.save();

    res
      .status(HTTPStatus.Success)
      .send({ success: true, message: "Updated Review Status" });
  } catch (error) {
    console.log(error);
    res
      .status(HTTPStatus.ServerError)
      .send({ success: false, message: error.message });
  }
};
