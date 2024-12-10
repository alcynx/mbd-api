import { Router } from 'express';
import { tambahProgram, editProgram, hapusProgram, getProgram, getProgramById } from '../controllers/programController.js';
import { verifyRole } from '../middleware/roleMiddleware.js';

const router = Router();

// Routes untuk leaders
router.post('/program', verifyRole(['adminhq']), tambahProgram); 
router.put('/program', verifyRole(['adminhq']), editProgram);  
router.delete('/program/:p_id_program', verifyRole(['adminhq', 'leaders']), hapusProgram); 
router.get('/program', getProgram);
router.get('/program/:p_id_program', getProgramById);

export default router;
