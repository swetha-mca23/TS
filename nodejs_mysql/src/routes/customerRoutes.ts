import express from "express";
import { getCustomers, getCustomer, addCustomer, updateCustomer, deleteCustomer } from "../controller/customerController";
import { authenticate, authorize } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/all", authenticate, authorize(["admin"]), getCustomers);
router.get("/me", authenticate, getCustomer);
router.post("/add", authenticate, authorize(["admin"]), addCustomer);
router.put("/update/:id", authenticate, authorize(["admin"]), updateCustomer);
router.put("/update/me", authenticate, updateCustomer);
router.delete("/delete/:id", authenticate, authorize(["admin"]), deleteCustomer);

export default router;
