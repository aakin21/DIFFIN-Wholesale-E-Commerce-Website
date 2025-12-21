import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin';

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Check if admin exists
    let admin = await Admin.findOne({ username });

    // If no admin exists, create default admin
    if (!admin) {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10);
      admin = new Admin({
        username: process.env.ADMIN_USERNAME || 'admin',
        password: hashedPassword,
      });
      await admin.save();
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign(
      { adminId: admin._id },
      process.env.JWT_SECRET || 'diffin_secret_key_2024_secure',
      { expiresIn: '24h' }
    );

    res.json({ token, message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
