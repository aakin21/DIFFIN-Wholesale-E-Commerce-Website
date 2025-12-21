import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/userAuthController';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', getUserProfile);

export default router;
