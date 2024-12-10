import express from 'express';
import {
    tambahModul,
    editModul,
    hapusModul,
    getModul,
    getModulById
} from '../controllers/modulController.js';
import { verifyRole } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.post('/modul', verifyRole(['adminhq', 'leaders']), tambahModul);
router.put('/modul', verifyRole(['adminhq', 'leaders']), editModul);
router.delete('/modul/:p_id_modul', verifyRole(['adminhq']), hapusModul);
router.get('/modul', getModul);
router.get('/modul/:p_id_modul', getModulById);

export default router;
