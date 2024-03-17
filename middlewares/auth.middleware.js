import JWT from "jsonwebtoken";
import dotenv from "dotenv";
import Users from "../models/users.model.js";
import HTTPStatus from "../constants/httpStatus.constant.js";
dotenv.config();
export const adminAuth = async (req, res, next) => {
  try {
    const token= req.headers["authorization"];
    if (!token) {
      return res.status(HTTPStatus.ClientError).send({
        success: false,
        message: "Login to your account, for this operation",
      });
    }
    const { _id, role } = JWT.verify(token, process.env.JWT_SECRET_ID);
    const user = await Users.findById(_id);
    if (!user) {
      return res.status(HTTPStatus.ClientError).clearCookie("token").send({
        success: false,
        message: "User details not found, Try again after login",
      });
    }
    if (role != "admin") {
      return res.status(HTTPStatus.ClientError).send({
        success: false,
        message: "Access restricted for this operation",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res
      .status(HTTPStatus.ServerError)
      .send({ success: false, message: error.message });
  }
};

export const isLoggedIn = async (req, res, next) => {
  try {
    const token= req.headers["authorization"];
    if (!token) {
      return res.status(HTTPStatus.ClientError).send({
        success: false,
        message: "Login to your account, for this operation",
      });
    }
    const { _id, role } = JWT.verify(token, process.env.JWT_SECRET_ID);
    const user = await Users.findById(_id);
    if (!user) {
      return res.status(HTTPStatus.ClientError).clearCookie("token").send({
        success: false,
        message: "User details not found, Try again after login",
      });
    }
    if (role != "admin" && role != "team member") {
      return res.status(HTTPStatus.ClientError).send({
        success: false,
        message: "Access restricted for this operation",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res
      .status(HTTPStatus.ServerError)
      .send({ success: false, message: error.message });
  }
};

export const isNotLoggedIn = (req, res, next) => {
  try {
    const token= req.headers["authorization"];
    if (token) {
      return res.status(HTTPStatus.ClientError).send({
        success: false,
        message: "Already LoggedIn, Try after Log Out",
      });
    }
    next()
  } catch (error) {
    console.log(error);
    res
      .status(HTTPStatus.ServerError)
      .send({ success: false, message: error.message });
  }
};
