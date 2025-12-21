import express from 'express';
import { getAllCategories, createCategory, deleteCategory } from '../controllers/categoryController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

router.get('/', getAllCategories);
router.post('/', authMiddleware, createCategory);
router.delete('/:id', authMiddleware, deleteCategory);

export default router;
