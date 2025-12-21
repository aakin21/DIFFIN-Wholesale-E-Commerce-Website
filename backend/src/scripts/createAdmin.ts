import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Admin from '../models/Admin';

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/diffin');
    console.log('MongoDB Connected');

    // Admin kullanıcısını kontrol et
    const existingAdmin = await Admin.findOne({ username: process.env.ADMIN_USERNAME });

    if (existingAdmin) {
      console.log('Admin kullanıcısı zaten mevcut');
      process.exit(0);
    }

    // Yeni admin oluştur
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10);

    const admin = new Admin({
      username: process.env.ADMIN_USERNAME || 'diffin_admin',
      password: hashedPassword
    });

    await admin.save();
    console.log('✅ Admin kullanıcısı başarıyla oluşturuldu!');
    console.log(`Username: ${admin.username}`);
    console.log(`Password: ${process.env.ADMIN_PASSWORD}`);

    process.exit(0);
  } catch (error) {
    console.error('Hata:', error);
    process.exit(1);
  }
};

createAdmin();
