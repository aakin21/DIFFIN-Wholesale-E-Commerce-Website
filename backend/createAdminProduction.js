const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = 'mongodb+srv://diffin_admin:Bayerakin12.@diffin.ulvycso.mongodb.net/diffin?retryWrites=true&w=majority&appName=diffin';
const ADMIN_USERNAME = 'diffin_admin';
const ADMIN_PASSWORD = 'Bayerakin12.';

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Admin = mongoose.model('Admin', adminSchema);

async function createAdmin() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB Connected');

    const existingAdmin = await Admin.findOne({ username: ADMIN_USERNAME });
    if (existingAdmin) {
      console.log('Admin already exists!');
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
    const admin = new Admin({
      username: ADMIN_USERNAME,
      password: hashedPassword
    });

    await admin.save();
    console.log('✅ Admin created successfully!');
    console.log('Username:', ADMIN_USERNAME);
    console.log('Password:', ADMIN_PASSWORD);

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

createAdmin();
