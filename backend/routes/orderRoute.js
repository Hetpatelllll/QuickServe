import express from "express"
import authMiddleware from "../middleware/auth.js";
import {listOrders, placeOrder, updateStatus, userOrders, verifyOrders} from "../controllers/orderController.js"

const orderRouter = express.Router();

orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/verify",verifyOrders);
orderRouter.post("/userorders",authMiddleware,userOrders);
orderRouter.get("/list",listOrders);
orderRouter.post("/status",updateStatus);

export default orderRouter;