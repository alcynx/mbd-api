import express from "express";
import { getLokasi } from "../controllers/lokasiController.js";

const router = express.Router();

router.get("/lokasi", getLokasi);

export default router;
