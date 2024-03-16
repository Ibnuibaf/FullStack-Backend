import express from "express";
import {
  getProducts,
  updateProducts,
} from "../controllers/products.controller.js";
import upload from "../middlewares/multer.middleware.js";
import { adminAuth, isLoggedIn } from "../middlewares/auth.middleware.js";

const productRouter = express.Router();

productRouter.get(
  "/all",
  (req, res, next) => isLoggedIn(req, res, next),
  (req, res) => getProducts(req, res)
);
productRouter.patch(
  "/update",
  (req, res, next) => adminAuth(req, res, next),
  upload.single("imageFile"),
  (req, res) => updateProducts(req, res)
);

export default productRouter;
