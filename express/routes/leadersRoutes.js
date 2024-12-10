import { Router } from 'express';
import { tambahLeaders, editLeader, hapusLeaders, getLeaders } from '../controllers/leadersController.js';
import { verifyRole } from '../middleware/roleMiddleware.js';

const router = Router();

// Routes untuk leaders
router.post('/leaders', verifyRole(['adminhq']), tambahLeaders); 
router.put('/leaders', verifyRole(['adminhq']), editLeader);  
router.delete('/leaders/:p_id_user', verifyRole(['adminhq']), hapusLeaders); 
router.get('/leaders', getLeaders);  

export default router;
