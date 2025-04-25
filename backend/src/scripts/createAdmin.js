const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });

const MONGODB_URI = process.env.MONGODB_URI;

const ADMIN_EMAIL = 'a0krsharma@gmail.com';
const ADMIN_PASSWORD = '70@Crore';
const ADMIN_NAME = 'Admin User';

async function createAdmin() {
  await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  const existing = await User.findOne({ email: ADMIN_EMAIL });
  if (existing) {
    console.log('Admin already exists:', ADMIN_EMAIL);
    mongoose.disconnect();
    return;
  }
  const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
  const admin = new User({
    name: ADMIN_NAME,
    email: ADMIN_EMAIL,
    password: hashedPassword,
    role: 'admin',
    isVerified: true
  });
  await admin.save();
  console.log('Admin user created:', ADMIN_EMAIL);
  mongoose.disconnect();
}

createAdmin().catch(e => { console.error(e); mongoose.disconnect(); });
