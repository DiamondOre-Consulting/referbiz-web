import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
// import { fileURLToPath } from 'url';
// import { dirname, join } from 'path';
// import multer from 'multer';
import dotenv from 'dotenv';

const app = express();
// const ip = "192.168.1.49";
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(express.static('ProfileImgUploads'))

// Secret key for JWT
const secretKey = process.env.JWT_SECRET; // Replace with your own secret key

// Mock database for demo purposes
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

import candidateController from './Controllers/candidate.js';
import associateController from './Controllers/associates.js';
import adminController from './Controllers/admin.js';
import employeeController from './Controllers/employees.js';

app.use('/api/candidates', candidateController);
app.use('/api/associates', associateController);
app.use('/api/admin-rb', adminController);
app.use('/api/employee-rb', employeeController);

const otpStore = {};
const forgotOtp = {};

// Start the server
app.listen(8080, () => {
  console.log(`Server running on PORT:8080`);
});

export default {otpStore, forgotOtp};
