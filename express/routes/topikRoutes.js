import express from 'express';
import {
    tambahTopik,
    editTopik,
    hapusTopik,
    getTopik
} from '../controllers/topikController.js';
import { verifyRole } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.post('/topik', verifyRole(['adminhq', 'leaders']), tambahTopik);
router.put('/topik', verifyRole(['adminhq', 'leaders']), editTopik);
router.delete('/topik/:p_id_topik', verifyRole(['adminhq']), hapusTopik);
router.get('/topik', verifyRole(['adminhq', 'leaders']), getTopik);

export default router;
