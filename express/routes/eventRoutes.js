import express from 'express';
import {
    tambahEvent,
    tambahMentorEvent,
    tambahModulEvent,
    getEvent,
    getEventDetail,
    editEvent,
    hapusEvent,
    getEventByMentor,
    getEventById
} from '../controllers/eventController.js';
import { verifyRole } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.post('/event', verifyRole(['adminhq', 'leaders']), tambahEvent);
router.post('/event/mentor', verifyRole(['adminhq', 'leaders']), tambahMentorEvent);
router.post('/event/modul', verifyRole(['adminhq', 'leaders']), tambahModulEvent);
router.get('/event', getEvent);
router.get('/event/:event_id', getEventDetail);
router.put('/event', verifyRole(['adminhq', 'leaders']), editEvent);
router.delete('/event/:p_id_event', verifyRole(['adminhq']), hapusEvent);
router.get('/event/mentor/:p_nama_mentor', getEventByMentor);
router.get('/event/detail/:p_id_event', getEventById);

export default router;
