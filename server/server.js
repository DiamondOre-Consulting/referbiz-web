import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
// import { fileURLToPath } from 'url';
// import { dirname, join } from 'path';
// import multer from 'multer';
import { fileURLToPath } from 'url';
import path from "path";
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// const ip = "https://api.referbiz.in";
dotenv.config();
// Serve static files from the 'build' folder
app.use(express.static(path.join(__dirname, 'build')));
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
import resumeBuilding from './Controllers/resumebuilding.js';
import leadForm from './Controllers/leads.js'

app.use('/api/candidates', candidateController);
app.use('/api/associates', associateController);
app.use('/api/admin-rb', adminController);
app.use('/api/employee-rb', employeeController);
app.use('/api/resume-submit', resumeBuilding);
app.use('/api/leads-form', leadForm);

const otpStore = {};
const forgotOtp = {};

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// For any other request, serve the React app's HTML file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
app.listen(8080, () => {
  console.log(`Server running on ${process.env.IP}:8080`);
});

export default {otpStore, forgotOtp};
