import { Router } from 'express';
import { tambahLokasi, editLokasi, hapusLokasi, getLokasi } from '../controllers/lokasiController.js';
import { verifyRole } from '../middleware/roleMiddleware.js';

const router = Router();

// Routes untuk lokasi
router.post('/lokasi', verifyRole(['adminhq', 'leaders']), tambahLokasi);
router.put('/lokasi', verifyRole(['adminhq', 'leaders']), editLokasi); 
router.delete('/lokasi/:id_lokasi', verifyRole(['adminhq']), hapusLokasi);
router.get('/lokasi', getLokasi);

export default router;
