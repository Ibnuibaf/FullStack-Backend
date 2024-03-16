import express from "express";
import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/users.controller.js";
import { isLoggedIn, isNotLoggedIn } from "../middlewares/auth.middleware.js";

const userRouter = express.Router();

userRouter.get(
  "/",
  (req, res, next) => isLoggedIn(req, res, next),
  (req, res) => getUser(req, res)
);
userRouter.post(
  "/register",
  (req, res, next) => isNotLoggedIn(req, res, next),
  (req, res) => registerUser(req, res)
);
userRouter.post(
  "/login",
  (req, res, next) => isNotLoggedIn(req, res, next),
  (req, res) => loginUser(req, res)
);
userRouter.get(
  "/logout",
  (req, res, next) => isLoggedIn(req, res, next),
  (req, res) => logoutUser(req, res)
);

export default userRouter;
