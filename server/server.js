import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
// import { fileURLToPath } from 'url';
// import { dirname, join } from 'path';
// import multer from 'multer';
import dotenv from 'dotenv';

const app = express();
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

// Signup route
// app.post('/signup', async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     // Check if user already exists
//     const userExists = await User.exists({ email });
//     if (userExists) {
//       return res.status(409).json({ message: 'User already exists' });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new user object
//     const newUser = new User({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     // Save the user to the database
//     await newUser.save();

//     return res.status(201).json({ message: 'User created successfully' });
//   } catch (error) {
//     console.error('Error creating user:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// });

// Login route
// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Find the user in the database
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     // Compare the passwords
//     const passwordMatch = await bcrypt.compare(password, user.password);
//     if (!passwordMatch) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     // Generate JWT token
//     const token = jwt.sign({ email: user.email }, secretKey, { expiresIn: '1h' });

//     return res.status(200).json({ token });
//   } catch (error) {
//     console.error('Error logging in:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// });
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     // Specify the directory where you want to store the uploaded files
//     const __filename = fileURLToPath(import.meta.url);
//     const __dirname = dirname(__filename);
//     cb(null, join(__dirname, 'ProfileImgUploads/'));
//   },
//   filename: function (req, file, cb) {
//     // Set the file name to be the original name of the uploaded file
//     cb(null, file.originalname);
//   }
// });

// // Create the Multer upload instance
// const upload = multer({ storage: storage });

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// const profileImgUploadsPath = join(__dirname, 'ProfileImgUploads');
// app.use('/ProfileImgUploads', express.static(profileImgUploadsPath));

import candidateController from './Controllers/candidate.js';
import associateController from './Controllers/associates.js';
import adminController from './Controllers/admin.js';

app.use('/api/candidates', candidateController);
app.use('/api/associates', associateController);
app.use('/api/admin-rb', adminController);

// Start the server
app.listen(8080, () => {
  console.log('Server running on port 8080');
});
