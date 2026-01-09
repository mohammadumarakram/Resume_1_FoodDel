// import { placeOrder, verifyPayment } from "../controllers/orderController.js";
// import express from "express"
// import authMiddleware from "../middleware/auth.js"

// const orderRouter=express.Router();
// orderRouter.post("/place",authMiddleware,placeOrder);
// orderRouter.post("/verify",verifyPayment)

// export default orderRouter;

import express from "express";
import authMiddleware from "../middleware/auth.js";
import { placeOrder, verifyPayment,userOrders, listOrder, updateStatus } from "../controllers/orderController.js";

const orderRouter = express.Router();
 
orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify", verifyPayment);
orderRouter.post("/userorders",authMiddleware,userOrders)
orderRouter.get("/list",listOrder)
orderRouter.post("/status",updateStatus)

export default orderRouter;



