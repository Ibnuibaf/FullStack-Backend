import express from "express";
import {
  addReview,
  changeReviewStatus,
  getReviews,
} from "../controllers/reviews.controller.js";
import upload from "../middlewares/multer.middleware.js";
import { adminAuth, isLoggedIn } from "../middlewares/auth.middleware.js";

const reviewRouter = express.Router();

reviewRouter.get(
  "/all",
  (req, res, next) => isLoggedIn(req, res, next),
  (req, res) => getReviews(req, res)
);
reviewRouter.post(
  "/add",
  (req, res, next) => isLoggedIn(req, res, next),
  upload.single("imageFile"),
  (req, res) => addReview(req, res)
);
reviewRouter.patch(
  "/status",
  (req, res, next) => adminAuth(req, res, next),
  (req, res) => changeReviewStatus(req, res)
);

export default reviewRouter;
