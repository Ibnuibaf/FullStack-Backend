import HTTPStatus from "../constants/httpStatus.constant.js";
import Products from "../models/products.model.js";
import uploadImageToCloud from "../utils/cloudinary.js";

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
    let {
      productName,
      price,
      image,
      productDescription,
      department,
      id,
      _id,
    } = req.body;
    if (req.file) {
      const response = await uploadImageToCloud(req.file);
      if(response.isError){
        return res.status(HTTPStatus.ServerError).send({success:false,message:response.message})
      }
      image = response.secure_url;
    }
    const isUpdated = await Products.findByIdAndUpdate(
      _id,
      { productName, price, image, productDescription, department, id },
      { new: true }
    );
    if (!isUpdated) {
      return res
        .status(HTTPStatus.ClientError)
        .send({ success: false, message: "Product not found, Try Again" });
    }

    res.status(HTTPStatus.Success).send({success:true,message:"Updated the product details."})
  } catch (error) {
    console.log(error);
    res
      .status(HTTPStatus.ServerError)
      .send({ success: false, message: error.message });
  }
};
