import { Router } from 'express';
import { login, logout } from '../controllers/authController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = Router();

// Route untuk login
router.post('/login', login);
router.post('/logout', verifyToken, logout);

export default router;
