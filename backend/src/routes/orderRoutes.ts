import express from 'express';
import { createOrder, getAllOrders, getOrderById, deleteOrder } from '../controllers/orderController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

router.post('/', createOrder);
router.get('/', authMiddleware, getAllOrders);
router.get('/:id', authMiddleware, getOrderById);
router.delete('/:id', authMiddleware, deleteOrder);

export default router;
