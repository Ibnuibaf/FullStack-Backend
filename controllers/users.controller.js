import HTTPStatus from "../constants/httpStatus.constant.js";
import { emailRegex, passwordRegex } from "../constants/user.constant.js";
import Users from "../models/users.model.js";
import bcrypt from "bcrypt";
import dotenv from 'dotenv'
import JWT from "jsonwebtoken";

dotenv.config()

export const registerUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!emailRegex.test(email)) {
      return res
        .status(HTTPStatus.ClientError)
        .send({ success: false, message: "Wrong email format" });
    }
    const userExist = await Users.findOne({ email });
    if (userExist) {
      return res
        .status(HTTPStatus.ClientError)
        .send({ success: false, message: "User account exist, Try Login" });
    }
    if (!passwordRegex.test(password)) {
      return res.status(HTTPStatus.ClientError).send({
        success: false,
        message:
          "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one digit.",
      });
    }
    if (role != "team member" && role != "admin") {
      return res
        .status(HTTPStatus.ClientError)
        .send({ success: false, message: "Provide valid role for the user" });
    }
    const encryptedPassword = bcrypt.hash(password, 10);
    await Users.create({ email, password: encryptedPassword, role });
    res.status(HTTPStatus.Success).send({
      success: true,
      message: "User account has been registered, Login",
    });
  } catch (error) {
    console.log(error);
    res
      .status(HTTPStatus.ServerError)
      .send({ success: false, message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (!user) {
      return res
        .status(HTTPStatus.ClientError)
        .send({ success: false, message: "User not found, Register User" });
    }
    if (!bcrypt.compare(password, user.password)) {
      return res
        .status(HTTPStatus.ClientError)
        .send({ success: false, message: "Wrong user password, Try again" });
    }
    const token = JWT.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET_ID);
    res
      .status(HTTPStatus.Success)
      .cookie("token", token)
      .send({ success: true, message: "User Logged In successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(HTTPStatus.ServerError)
      .send({ success: false, message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const {token}=req.cookies
    const tokenDetails=JWT.verify(token,process.env.JWT_SECRET_ID)
    const user=await Users.findById(tokenDetails._id,{password:0})
    res.status(HTTPStatus.Success).send({success:true,message:"User data fetched", user})
  } catch (error) {
    console.log(error);
    res
      .status(HTTPStatus.ServerError)
      .send({ success: false, message: error.message });
  }
};
