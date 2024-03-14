import HTTPStatus from "../constants/httpStatus.constant.js";
import Products from "../models/products.model.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Products.find();
    res
      .status(HTTPStatus.Success)
      .send({ success: true, message: "Fetched all products", products });
  } catch (error) {
    console.log(error);
    res
      .status(HTTPStatus.ServerError)
      .send({ success: false, message: error.message });
  }
};

export const updateProducts = async (req, res) => {
  try {
    const {productName,price,image,productDescription,department,id}=req.body
    
  } catch (error) {
    console.log(error);
    res
      .status(HTTPStatus.ServerError)
      .send({ success: false, message: error.message });
  }
};
