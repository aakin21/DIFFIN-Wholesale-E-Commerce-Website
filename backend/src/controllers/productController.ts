import { Response, Request } from 'express';
import { AuthRequest } from '../middleware/auth';
import Product from '../models/Product';

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find().populate('categoryId').sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getProductsByCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;
    const products = await Product.find({ categoryId }).populate('categoryId');
    res.json(products);
  } catch (error) {
    console.error('Get products by category error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate('categoryId');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createProduct = async (req: AuthRequest, res: Response) => {
  try {
    const { categoryId, modelName, colors, pricePerSeries } = req.body;

    const product = new Product({
      categoryId,
      modelName,
      colors,
      pricePerSeries: pricePerSeries || 2250,
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateProduct = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const product = await Product.findByIdAndUpdate(id, updates, { new: true });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteProduct = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const uploadProductImage = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ imageUrl });
  } catch (error) {
    console.error('Upload image error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const toggleFeatured = async (req: AuthRequest, res: Response) => {
  try {
    const { productId, colorName } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const colorIndex = product.colors.findIndex(c => c.colorName === colorName);
    if (colorIndex === -1) {
      return res.status(404).json({ message: 'Color not found' });
    }

    const currentFeaturedStatus = product.colors[colorIndex].featured;

    // Eğer bu rengi öne çıkaracaksak, önce kategorideki tüm öne çıkanları kaldır
    if (!currentFeaturedStatus) {
      // Aynı kategorideki tüm ürünlerin öne çıkan durumunu kaldır
      await Product.updateMany(
        { categoryId: product.categoryId },
        { $set: { 'colors.$[].featured': false } }
      );
    }

    // Şimdi bu rengi toggle et
    product.colors[colorIndex].featured = !currentFeaturedStatus;
    await product.save();

    res.json(product);
  } catch (error) {
    console.error('Toggle featured error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
