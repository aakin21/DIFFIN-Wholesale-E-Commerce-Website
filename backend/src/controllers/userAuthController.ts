import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

// Kullanıcı kaydı
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, phone, password, address } = req.body;

    // Email kontrolü
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Bu email zaten kayıtlı' });
    }

    // Şifreyi hashle
    const hashedPassword = await bcrypt.hash(password, 10);

    // Yeni kullanıcı oluştur
    const user = new User({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      address,
    });

    await user.save();

    // JWT token oluştur
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '30d' }
    );

    res.status(201).json({
      message: 'Kayıt başarılı',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası', error });
  }
};

// Kullanıcı girişi
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Kullanıcıyı bul
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Email veya şifre hatalı' });
    }

    // Şifreyi kontrol et
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Email veya şifre hatalı' });
    }

    // JWT token oluştur
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '30d' }
    );

    res.json({
      message: 'Giriş başarılı',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası', error });
  }
};

// Kullanıcı bilgilerini getir
export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.body.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası', error });
  }
};
