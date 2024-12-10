import { Router } from 'express';
import { tambahMentor, editMentor, hapusMentor, getMentor, searchMentor, getProfilMentorById } from '../controllers/mentorController.js';
import { verifyRole } from '../middleware/roleMiddleware.js';

const router = Router();

// Routes untuk leaders
router.post('/mentor', verifyRole(['adminhq', 'leaders']), tambahMentor); 
router.put('/mentor', editMentor);  
router.delete('/mentor/:p_id_user', verifyRole(['adminhq']), hapusMentor); 
router.get('/mentor', getMentor);  
router.post('/mentor/search', searchMentor);
router.get('/mentor/:p_id_user', getProfilMentorById);

export default router;
