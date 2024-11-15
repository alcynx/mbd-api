import express from "express";
import { getAllLeaders, tambahLeaders, updateLeaders, deleteLeaders } from "../controllers/leadersController.js";
import { verifyToken } from "../controllers/authController.js";

const router = express.Router();

router.get("/leaders", verifyToken, getAllLeaders);
router.post("/leaders", verifyToken, tambahLeaders);
router.put("/leaders", verifyToken, updateLeaders);
router.delete("/leaders/:id_leaders", verifyToken, deleteLeaders);

export default router;
