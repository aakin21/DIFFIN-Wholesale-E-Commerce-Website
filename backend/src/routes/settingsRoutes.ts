import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import SiteSettings from '../models/SiteSettings';

const router = express.Router();

// Multer config for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads/about');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only images are allowed'));
  }
});

// Get site settings (public)
router.get('/', async (req, res) => {
  try {
    let settings = await SiteSettings.findOne({ key: 'main' });
    if (!settings) {
      settings = await SiteSettings.create({ key: 'main' });
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching settings', error });
  }
});

// Upload about image (admin only)
router.post('/about-image/:imageKey', upload.single('image'), async (req, res) => {
  try {
    const { imageKey } = req.params;
    const validKeys = ['production', 'showroom', 'productDetails', 'office', 'packaging'];

    if (!validKeys.includes(imageKey)) {
      return res.status(400).json({ message: 'Invalid image key' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No image uploaded' });
    }

    let settings = await SiteSettings.findOne({ key: 'main' });
    if (!settings) {
      settings = await SiteSettings.create({ key: 'main' });
    }

    // Delete old image if exists
    const oldImagePath = settings.aboutImages[imageKey as keyof typeof settings.aboutImages];
    if (oldImagePath) {
      const fullPath = path.join(__dirname, '..', oldImagePath);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    }

    // Update with new image path
    const imagePath = `/uploads/about/${req.file.filename}`;
    settings.aboutImages[imageKey as keyof typeof settings.aboutImages] = imagePath;
    await settings.save();

    res.json({
      message: 'Image uploaded successfully',
      imagePath,
      settings
    });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading image', error });
  }
});

// Delete about image (admin only)
router.delete('/about-image/:imageKey', async (req, res) => {
  try {
    const { imageKey } = req.params;
    const validKeys = ['production', 'showroom', 'productDetails', 'office', 'packaging'];

    if (!validKeys.includes(imageKey)) {
      return res.status(400).json({ message: 'Invalid image key' });
    }

    const settings = await SiteSettings.findOne({ key: 'main' });
    if (!settings) {
      return res.status(404).json({ message: 'Settings not found' });
    }

    // Delete image file
    const imagePath = settings.aboutImages[imageKey as keyof typeof settings.aboutImages];
    if (imagePath) {
      const fullPath = path.join(__dirname, '..', imagePath);
      if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
      }
    }

    // Clear from database
    settings.aboutImages[imageKey as keyof typeof settings.aboutImages] = '';
    await settings.save();

    res.json({ message: 'Image deleted successfully', settings });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting image', error });
  }
});

export default router;
