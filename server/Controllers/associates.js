import express, { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import authenticateToken from "../Middlewares/authenticateToken.js";

import AssoUser from "../Models/AssoUsers.js";
import CvSharing from "../Models/CvSharing.js";
import ContactUs from "../Models/ContactUs.js";
import Employees from "../Models/Employees.js";
dotenv.config();

const secretKey = process.env.JWT_SECRET;

const router = express.Router();

const picStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the directory where you want to store the uploaded files
    cb(null, "ProfileImgUploads");
  },
  filename: function (req, file, cb) {
    // Set the file name to be the original name of the uploaded file
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
    // cb(null, file.originalname);
  },
});

const uploadImg = multer({ storage: picStorage });

router.post("/signup", uploadImg.single("profileImage"), async (req, res) => {
  const {
    name,
    email,
    password,
    mentorName,
    mentorEmail,
    allCvInfo,
    document,
  } = req.body;
  const profileImage = req.file;

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
      allCvInfo,
      document,
      profileImage: profileImage.filename,
    });

    // Save the user to the database
    await newUser.save();

    const emp = await Employees.findOneAndUpdate(
      { EmpEmail: mentorEmail }, // Match the candidate ID
      {
        // $inc: { totalShared: 1 },
        $push: { myAsso: newUser._id },
      }
    );

    console.log(emp);

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

    console.log(user._id);
    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      secretKey,
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({ token });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/user-data", authenticateToken, async (req, res) => {
  try {
    // Get the user's email from the decoded token
    const { email } = req.user;

    // Find the user in the database
    const user = await AssoUser.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Extract the required fields from the user object
    const {
      id,
      name,
      profileImage,
      totalShared,
      totalShortlisted,
      totalJoined,
      totalAmount,
    } = user;
    // console.log(user.totalShortlisted, " ", user.totalJoined)

    res
      .status(200)
      .json({
        id,
        name,
        email,
        profileImage,
        totalShared,
        totalShortlisted,
        totalJoined,
        totalAmount,
      });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// UPDATE A PARTICULAR AFFILIATE
router.put(
  "/associates-user-data/update/:id",
  authenticateToken,
  uploadImg.single("profileImage"),
  async (req, res) => {
    const { name, email } = req.body;
    const profileImage = req.file;

    try {
      // Get the user's email from the decoded token
      const { id } = req.params;
      console.log(id);

      // Find the affiliate by ID
      const associate = await AssoUser.findById(id);
      if (!associate) {
        return res.status(404).json({ message: "associate not found" });
      }

      // Update the associate's fields
      if (!name) {
        associate.name = associate.name;
      } else {
        associate.name = name;
      }

      if (!email) {
        associate.email = associate.email;
      } else {
        associate.email = email;
      }

      if (!profileImage) {
        associate.profileImage = associate.profileImage;
      } else {
        associate.profileImage = profileImage.filename;
      }

      // Save the updated associate
      await associate.save();

      res.status(200).json({ message: "associate updated successfully" });
    } catch (error) {
      console.error("Error updating associate:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// HANDLE CV SHARING FORM
// Define storage options for Multer
const AssociateCVs = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the directory where you want to store the uploaded files
    cb(null, "AssociateCv");
  },
  filename: function (req, file, cb) {
    // Set the file name to be the original name of the uploaded file
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

// Create the Multer upload instance
const uploadAssoCv = multer({ storage: AssociateCVs });

router.post(
  "/associate-contact-form",
  authenticateToken,
  uploadAssoCv.single("document"),
  async (req, res) => {
    const { refName, refPhone, refUniqueEmailId, userEmail } = req.body;

    const uploadedFile = req.file;

    const { email, id } = req.user;
    console.log(id);

    // Handle form submission and file upload logic
    if (!uploadedFile) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Perform any necessary validation on the form fields
    if (!refName || !refPhone || !refUniqueEmailId) {
      return res
        .status(400)
        .json({ error: "Name, email, and phone number are required fields" });
    }

    // Save the file to the desired location
    const filePath = uploadedFile.path; // Get the file path

    try {
      // Create a new contact form entry and save it to the database
      const cvSharing = new CvSharing({
        refName,
        refPhone,
        refUniqueEmailId,
        userEmail: email,
        PDF: uploadedFile?.filename,
        // user: req.user.email, // Associate the form entry with the logged-in user
      });
      await cvSharing.save();

      // Update totalShared count for the associated candidate
      const asso = await AssoUser.findOneAndUpdate(
        { email: email }, // Match the candidate ID
        {
          $inc: { totalShared: 1 },
          $push: { allCvInfo: cvSharing._id },
        }
      );

      console.log("req.user._id:", req.user.id);
      const empMentor = await Employees.findOneAndUpdate(
        { myAsso: { $in: [id] } }, // Match the candidate ID
        {
          $inc: { totalShared: 1 },
          $push: { allCvInfo: cvSharing._id },
        }
      );

      console.log("empMentor:", empMentor);

      console.log(asso);

      res.status(201).json({ message: "Form submitted successfully" });
    } catch (error) {
      console.error("Error submitting form:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.post("/contactus", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Create a new user object
    const newMessage = new ContactUs({
      name,
      email,
      message,
    });

    // Save the user to the database
    await newMessage.save();

    return res.status(202).json({ message: "Message Sent Successfully!!!" });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
