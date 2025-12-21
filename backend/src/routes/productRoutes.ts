import express from 'express';
import {
  getAllProducts,
  getProductsByCategory,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
  toggleFeatured,
} from '../controllers/productController';
import { authMiddleware } from '../middleware/auth';
import { upload } from '../middleware/upload';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/category/:categoryId', getProductsByCategory);
router.get('/:id', getProductById);
router.post('/', authMiddleware, createProduct);
router.put('/:id', authMiddleware, updateProduct);
router.delete('/:id', authMiddleware, deleteProduct);
router.post('/upload', authMiddleware, upload.single('image'), uploadProductImage);
router.post('/toggle-featured', authMiddleware, toggleFeatured);

export default router;
