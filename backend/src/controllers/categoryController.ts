import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import Category from '../models/Category';

export const getAllCategories = async (req: AuthRequest, res: Response) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json(categories);
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createCategory = async (req: AuthRequest, res: Response) => {
  try {
    const { name } = req.body;

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    const category = new Category({ name });
    await category.save();

    res.status(201).json(category);
  } catch (error) {
    console.error('Create category error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteCategory = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
