import express from "express";
import { createCheckoutSession } from "../controllers/PaymentController.js";
import protect from "../middleware/auth.js";

const PaymentRouter = express.Router();

PaymentRouter.post("/create-checkout-session", protect, createCheckoutSession);

export default PaymentRouter;
