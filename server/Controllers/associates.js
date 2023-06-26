import express, { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import multer from "multer";
import authenticateToken from "../Middlewares/authenticateToken.js";

import AssoUser from "../Models/AssoUsers.js";
import CvSharing from "../Models/CvSharing.js";
dotenv.config();

const secretKey = process.env.JWT_SECRET;

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { name, email, password, mentorName, mentorEmail } = req.body;

  try {
    // Check if user already exists
    const userExists = await AssoUser.exists({ email });
    if (userExists) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object
    const newUser = new AssoUser({
      name,
      email,
      password: hashedPassword,
      mentorName,
      mentorEmail,
    });

    // Save the user to the database
    await newUser.save();

    return res
      .status(201)
      .json({ message: "Associate User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user in the database
    const user = await AssoUser.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare the passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ name: user.name, email: user.email }, secretKey, {
      expiresIn: "1h",
    });

    return res.status(200).json({ token });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});



router.get('/user-data', authenticateToken, async (req, res) => {
  try {
    // Get the user's email from the decoded token
    const { email } = req.user;

    // Find the user in the database
    const user = await AssoUser.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Extract the required fields from the user object
    const { totalShared, totalShortlisted, totalJoined, totalAmount } = user;

    res.status(200).json({ totalShared, totalShortlisted, totalJoined, totalAmount });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// HANDLE CV SHARING FORM
// Define storage options for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the directory where you want to store the uploaded files
    cb(null, 'C:/Users/Harsh Jha/Documents/RAS Portal Pilot/ReferBiz/server/Uploads/');
  },
  filename: function (req, file, cb) {
    // Set the file name to be the original name of the uploaded file
    cb(null, file.originalname);
  }
});

// Create the Multer upload instance
const upload = multer({ storage: storage });

router.post('/associate-contact-form', authenticateToken, upload.single('document'), async (req, res) => {
  const { refName, refPhone, refUniqueEmailId, userEmail } = req.body;

  const uploadedFile = req.file;

  const { email } = req.user;

  // Handle form submission and file upload logic
  if (!uploadedFile) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Perform any necessary validation on the form fields
  if (!refName || !refPhone || !refUniqueEmailId) {
    return res.status(400).json({ error: 'Name, email, and phone number are required fields' });
  }

  // Save the file to the desired location
  const filePath = uploadedFile.path; // Get the file path

  try {
    // Create a new contact form entry and save it to the database
    const cvSharing = new CvSharing({
      refName,
      refPhone,
      refUniqueEmailId,
      userEmail: email, // Save the user's email along with the form data
      document: filePath,
      // user: req.user.email, // Associate the form entry with the logged-in user
    });
    await cvSharing.save();

    // Update totalShared count for the associated candidate
    await AssoUser.findOneAndUpdate(
      { email: email }, // Match the candidate ID
      { $inc: { totalShared: 1 } }, // Increment totalShared by 1
    );

    res.status(201).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
