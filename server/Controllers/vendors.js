import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Vendors from "../Models/Vendors.js";
import vendorAuthToken from "../Middlewares/vendorAuthToken.js";
dotenv.config();

const secretKey = process.env.VENDOR_JWT_SECRET;

const router = express.Router();

// SIGNUP AS VENDOR
router.post("/vendor-signup", async (req, res) => {
  const { name, email, phone, password, company, designation } = req.body;

  try {
    // Check if user already exists
    const userExists = await Vendors.exists({ email });
    if (userExists) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object
    const newVendor = new Vendors({
      name,
      email,
      phone,
      password: hashedPassword,
      company,
      designation,
    });

    // Save the user to the database
    await newVendor.save();

    return res
      .status(201)
      .json({ message: "Vendor User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// LOGIN AS VENDOR
router.post("/vendor-login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user in the database
    const user = await Vendors.findOne({ email });
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

// VENDOR USER_DATA
router.get('/vendor-user-data', vendorAuthToken, async (req, res) => {
    try {
        // Get the user's email from the decoded token
        const { email } = req.user;
    
        // Find the user in the database
        const user = await Vendors.findOne({ email });
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
    
        // Extract the required fields from the user object
        const {
          id,
          name,
          phone,
          company,
          designation,
          allSubmittedLeads,
          allProcessingLeads,
          allAcceptedLeads,
          allRejectedLeads,
          myAffiliates,
          myViews,
          myTrainedAffiliates,
          myTotalDistributedCash
        } = user;
        // console.log(user.totalShortlisted, " ", user.totalJoined)
    
        res.status(200).json({
          id,
          name,
          email,
          phone,
          company,
          designation,
          allSubmittedLeads,
          allProcessingLeads,
          allAcceptedLeads,
          allRejectedLeads,
          myAffiliates,
          myViews,
          myTrainedAffiliates,
          myTotalDistributedCash
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).json({ message: "Internal server error" });
      }
})

export default router;
