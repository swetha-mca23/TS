import express from "express";
import { getCustomers, getCustomer, addCustomer, updateCustomer, deleteCustomer } from "../controller/customerController";
import { authenticate, authorize } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/data/", authenticate, getCustomers);
router.get("/data/:id", getCustomer);
router.post("/add/", authenticate, addCustomer);
router.put("/put/:id", authenticate, updateCustomer);
router.delete("/del/:id", authenticate, deleteCustomer);

export default router;
