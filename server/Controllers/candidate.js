import express, { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import path from "path";
import multer from "multer";
import authenticateToken from "../Middlewares/authenticateToken.js";
import cloudinary from "../Middlewares/cloudinaryConfig.js";
import nodemailer from "nodemailer";
import otpStore from "../server.js";
import forgotOtp from "../server.js";

import User from "../Models/Users.js";
import CvSharing from "../Models/CvSharing.js";
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

// Generate a random OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
};

// Send OTP via email using Nodemailer
const sendOTPByEmail = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "harshkr2709@gmail.com",
        pass: "frtohlwnukisvrzh",
      },
    });

    const mailOptions = {
      from: "ReferBiz.com <harshkr2709@gmail.com>",
      to: `Recipient <${email}>`,
      subject: "One Time Password",
      text: `Your OTP is: ${otp}`,
      html: `<h1 style="blue: red;">Refer<span>Biz</span></h1> and OTP is: ${otp}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);

    // console.log(info);
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw error;
  }
};

// Initiate OTP sending
router.post("/send-otp", uploadImg.single("profileImage"), async (req, res) => {
  try {
    const { email } = req.body;
    console.log(req.body);

    // Generate and store OTP
    const otp = generateOTP();
    otpStore[email] = otp; // Store OTP for the email

    console.log(email);
    console.log("otpStore: ", otpStore[email]);

    // Send OTP via email
    await sendOTPByEmail(email, otp);

    console.log("otpStore:", otpStore[email]);

    res.status(201).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// SIGNUP AS CANDIDATE
router.post("/signup", uploadImg.single("profileImage"), async (req, res) => {
  const { otp, name, email, password } = req.body;
  const profileImage = req.file;

  console.log("Signup Email:", email);
  console.log("Entered OTP:", otp);
  console.log("Stored OTP:", otpStore[email]);
  // const isValidOTP = verifyOTP(otpStore, otp); //TESTING OTP
  // if (isValidOTP) {
  // TESTING OTP
  try {
    // Verify OTP
    if (otpStore[email] == otp) {
      const userExists = await User.exists({ email });
      if (userExists) {
        return res.status(409).json({ message: "User already exists" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      const result = await cloudinary.uploader.upload(profileImage.path, {
        folder: "ProfileImagesAffiliates",
      });
      const imageUrl = result.secure_url;

      // Create a new user object
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        profileImage: imageUrl,
      });

      // Save the user to the database
      await newUser.save();

      delete otpStore[email];

      return res
        .status(201)
        .json({ message: "Candidate User created successfully" });
    } else {
      return res.status(400).json({ message: "Invalid Token" });
    }
    // Check if user already exists
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
  // } else {
  //   res.status(400).json({ error: "Invalid OTP" });
  // }
});

// LOGIN AS CANDIDATE
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user in the database
    const user = await User.findOne({ email });
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

    const updateUser = await User.findOneAndUpdate(
      { email },
      { $inc: { count: 1 } }
    );

    await updateUser.save();

    console.log(updateUser);

    return res.status(200).json({ token });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// FETCHING USER DATA
router.get("/user-data", authenticateToken, async (req, res) => {
  try {
    // Get the user's email from the decoded token
    const { email } = req.user;

    // Find the user in the database
    const user = await User.findOne({ email });
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
      document,
      count,
    } = user;

    console.log(user.count);

    res.status(200).json({
      id,
      name,
      email,
      profileImage,
      totalShared,
      totalShortlisted,
      totalJoined,
      totalAmount,
      document,
      count,
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// UPDATE A PARTICULAR AFFILIATE
router.put(
  "/affiliates-user-data/update/:id",
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
      const affiliate = await User.findById(id);
      if (!affiliate) {
        return res.status(404).json({ message: "Affiliate not found" });
      }

      // Update the affiliate's fields
      if (!name) {
        affiliate.name = affiliate.name;
      } else {
        affiliate.name = name;
      }

      if (!email) {
        affiliate.email = affiliate.email;
      } else {
        affiliate.email = email;
      }

      if (!profileImage) {
        affiliate.profileImage = affiliate.profileImage;
      } else {
        affiliate.profileImage = profileImage.filename;
      }

      // Save the updated affiliate
      await affiliate.save();

      res.status(200).json({ message: "Affiliate updated successfully" });
    } catch (error) {
      console.error("Error updating affiliate:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// FORGOT PASSWORD FOR AFFILIATE
// SEND-OTP
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    console.log(req.body);

    // Check affiliate exists
    const userExists = await User.exists({ email });
    if (!userExists) {
      return res.status(409).json({ message: "User does not exists" });
    }

    // Generate and store OTP
    const otp = generateOTP();
    forgotOtp[email] = otp; // Store OTP for the email

    console.log(email);
    console.log("otpStore: ", forgotOtp[email]);

    // Send OTP via email
    await sendOTPByEmail(email, otp);

    console.log("otpStore:", otpStore[email]);

    res.status(201).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// VERIFY AND UPDATE PASSWORD
router.put("/update-password", async (req, res) => {
  const { email, otp, password } = req.body;

  try {
    // const { id } = req.params;
    if (forgotOtp[email] == otp) {
      console.log("stored: ", forgotOtp[email]);
      console.log("Entered: ", otp);

      // Find the user in the database
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "Affiliate not found" });
      }

      console.log(user);

      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;

      await user.save();

      delete otpStore[email];

      res.status(200).json({ message: "Password Updated Successfully!!!" });
    }
  } catch (error) {
    console.error("Error updating Admin Password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// HANDLE CV SHARING FORM
// Define storage options for Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the directory where you want to store the uploaded files
    cb(null, "Uploads");
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
const upload = multer({ storage: storage });

router.post(
  "/affiliate-contact-form/:id",
  authenticateToken,
  upload.single("document"),
  async (req, res) => {
    const { refName, refPhone, refUniqueEmailId, referredBy } = req.body;

    const uploadedFile = req.file;

    // Get the user's email from the decoded token
    const { email, name } = req.user;

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

    const result = await cloudinary.uploader.upload(filePath, {
      folder: "AffiliatesCVs",
    });
    const cvUrl = result.secure_url;
    const ext = path.extname(cvUrl); // Get the file extension (e.g., '.pdf')

    // Change the file extension from pdf to png
    const modifiedUrl = cvUrl.replace(ext, ".png");

    try {
      const { id } = req.params;
      console.log(id);

      // Create a new contact form entry and save it to the database
      const cvSharing = new CvSharing({
        refName,
        refPhone,
        refUniqueEmailId,
        userEmail: email,
        PDF: modifiedUrl,
        referredBy,
        
        // user: req.user.email, // Associate the form entry with the logged-in user
      });
      await cvSharing.save();

      // Update totalShared count for the associated candidate
      await User.findOneAndUpdate(
        { email: email }, // Match the candidate ID
        {
          $inc: { totalShared: 1 },
          $push: { allCvInfo: cvSharing._id },
        }
      );

      const updatedEmp = await Employees.findOneAndUpdate(
        { EmpName: referredBy },
        {
          $inc: { totalShared: 1 },
          $push: { allCvInfo: cvSharing._id },
          $push: { myAffil: name },
        }
      );

      res
        .status(201)
        .json({ message: "Form submitted successfully", updatedEmp });
    } catch (error) {
      console.error("Error submitting form:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

export default router;
