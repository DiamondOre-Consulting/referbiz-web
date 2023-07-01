import express, { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import adminAuthToken from "../Middlewares/adminAuthToken.js";

import AdminUsers from "../Models/AdminUsers.js";
import Users from "../Models/Users.js";
import AssoUsers from "../Models/AssoUsers.js";
import CvSharing from "../Models/CvSharing.js";
dotenv.config();

const secretKey = process.env.ADMIN_JWT_SECRET;

const router = express.Router();

router.post("/admin-signup-rb", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await AdminUsers.exists({ email });
    if (userExists) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object
    const newAdmin = new AdminUsers({
      name,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newAdmin.save();

    return res.status(201).json({ message: "Admin User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/admin-login-rb", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user in the database
    const user = await AdminUsers.findOne({ email });
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

// AFFILIATES SECTION
// FETCHING ALL AFFILIATES DATA
router.get("/admin-affiliates-data", adminAuthToken, async (req, res) => {
  try {
    // Get the user's email from the decoded token
    const { email } = req.user;

    // Find the user in the database
    const user = await AdminUsers.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const affiliates = await Users.find({}, { password: 0 });

    // Extract the required fields from the user object
    //   const { name, email, totalShared, totalShortlisted, totalJoined, totalAmount } = user;
    console.log(affiliates[15].name, " and ", affiliates[15].email);
    res.status(200).json(affiliates);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET A PARTICULAR AFFILIATE
router.get("/admin-affiliates-data/:id", adminAuthToken, async (req, res) => {
  const { id } = req.params;

  try {
    // Get the user's email from the decoded token
    const { email } = req.user;

    // Find the user in the database
    const user = await AdminUsers.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Find the affiliate by ID
    const affiliate = await Users.findById(id);
    if (!affiliate) {
      return res.status(404).json({ message: "Affiliate not found" });
    }

    res.status(200).json(affiliate);
  } catch (error) {
    console.error("Error retrieving affiliate:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// UPDATE A PARTICULAR AFFILIATE
router.put(
  "/admin-affiliates-data/update/:id",
  adminAuthToken,
  async (req, res) => {
    const { id } = req.params;
    const {
      name,
      email,
      totalShared,
      totalShortlisted,
      totalAmount,
      totalJoined,
    } = req.body;

    try {
      // Get the user's email from the decoded token
      const { adminEmail } = req.user;

      // Find the user in the database
      const user = await AdminUsers.findOne({ adminEmail });
      if (!user) {
        return res.status(404).json({ message: "Admin not found" });
      }

      // Find the affiliate by ID
      const affiliate = await Users.findById(id);
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

      if (!totalShared) {
        affiliate.totalShared = affiliate.totalShared;
      } else {
        affiliate.totalShared = totalShared;
      }

      if (!totalShortlisted) {
        affiliate.totalShortlisted = affiliate.totalShortlisted;
      } else {
        affiliate.totalShortlisted = totalShortlisted;
      }

      if (!totalJoined) {
        affiliate.totalJoined = affiliate.totalJoined;
      } else {
        affiliate.totalJoined = totalJoined;
      }

      if (!totalAmount) {
        affiliate.totalAmount = affiliate.totalAmount;
      } else {
        affiliate.totalAmount = totalAmount;
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

// DELETE A PARTICUALR AFFILIATE
router.delete(
  "/admin-affiliates-data/delete/:id",
  adminAuthToken,
  async (req, res) => {
    const { id } = req.params;

    try {
      // Get the user's email from the decoded token
      const { adminEmail } = req.user;

      // Find the user in the database
      const user = await AdminUsers.findOne({ adminEmail });
      if (!user) {
        return res.status(404).json({ message: "Admin not found" });
      }

      const deletedAffiliate = await Users.findByIdAndDelete(id);
      if (!deletedAffiliate) {
        return res.status(404).json({ message: "Affiliate not found" });
      }

      res.status(200).json({ message: "Affiliate deleted successfully" });
    } catch (error) {
      console.error("Error deleting affiliate:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// ASSOCIATES SECTION
// FETCHING ALL ASSOCIATES DATA
router.get("/admin-associates-data", adminAuthToken, async (req, res) => {
  try {
    // Get the user's email from the decoded token
    const { email } = req.user;

    // Find the user in the database
    const user = await AdminUsers.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const associates = await AssoUsers.find({}, { password: 0 });

    // Extract the required fields from the user object
    //   const { name, email, totalShared, totalShortlisted, totalJoined, totalAmount } = user;
    console.log(associates[1].name, " and ", associates[1].email);
    res.status(200).json(associates);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET A PARTICULAR ASSOCIATE
router.get("/admin-associates-data/:id", adminAuthToken, async (req, res) => {
  const { id } = req.params;

  try {
    // Get the user's email from the decoded token
    const { email } = req.user;

    // Find the user in the database
    const user = await AdminUsers.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Find the affiliate by ID
    const associate = await AssoUsers.findById(id);
    if (!associate) {
      return res.status(404).json({ message: "Associate not found" });
    }

    res.status(200).json(associate);
  } catch (error) {
    console.error("Error retrieving associate:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// UPDATE A PARTICULAR ASSOCIATE
router.put(
  "/admin-associates-data/update/:id",
  adminAuthToken,
  async (req, res) => {
    const { id } = req.params;
    const {
      name,
      email,
      totalShared,
      totalShortlisted,
      totalAmount,
      totalJoined,
      mentorName,
      mentorEmail,
    } = req.body;

    try {
      // Get the user's email from the decoded token
      const { adminEmail } = req.user;

      // Find the user in the database
      const user = await AdminUsers.findOne({ adminEmail });
      if (!user) {
        return res.status(404).json({ message: "Admin not found" });
      }

      // Find the associate by ID
      const associate = await AssoUsers.findById(id);
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

      if (!totalShared) {
        associate.totalShared = associate.totalShared;
      } else {
        associate.totalShared = totalShared;
      }

      if (!totalShortlisted) {
        associate.totalShortlisted = associate.totalShortlisted;
      } else {
        associate.totalShortlisted = totalShortlisted;
      }

      if (!totalJoined) {
        associate.totalJoined = associate.totalJoined;
      } else {
        associate.totalJoined = totalJoined;
      }

      if (!totalAmount) {
        associate.totalAmount = associate.totalAmount;
      } else {
        associate.totalAmount = totalAmount;
      }

      if (!mentorName) {
        associate.mentorName = associate.mentorName;
      } else {
        associate.mentorName = mentorName;
      }

      if (!mentorEmail) {
        associate.mentorEmail = associate.mentorEmail;
      } else {
        associate.mentorEmail = mentorEmail;
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

// DELETE A PARTICUALR AFFILIATE
router.delete(
  "/admin-associates-data/delete/:id",
  adminAuthToken,
  async (req, res) => {
    const { id } = req.params;

    try {
      // Get the user's email from the decoded token
      const { adminEmail } = req.user;

      // Find the user in the database
      const user = await AdminUsers.findOne({ adminEmail });
      if (!user) {
        return res.status(404).json({ message: "Admin not found" });
      }

      const deletedAssociate = await AssoUsers.findByIdAndDelete(id);
      if (!deletedAssociate) {
        return res.status(404).json({ message: "Associate not found" });
      }

      res.status(200).json({ message: "Associate deleted successfully" });
    } catch (error) {
      console.error("Error deleting associate:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// CV SHARING SECTION
// FETCHING ALL CV's DATA
router.get("/all-cv-admin", adminAuthToken, async (req, res) => {
  try {
    // Get the user's email from the decoded token
    const { email } = req.user;

    // Find the user in the database
    const user = await AdminUsers.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const allCv = await CvSharing.find({});

    // Extract the required fields from the user object
    //   const { name, email, totalShared, totalShortlisted, totalJoined, totalAmount } = user;
    console.log(allCv[1].refName, " and ", allCv[1].refUniqueEmailId);
    res.status(200).json(allCv);
  } catch (error) {
    console.error("Error fetching CV data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// UPDATE ASSOCIATES CV-SHARE BY ID
router.put(
  "/admin-associates-data/update-cv-sharing/:id",
  adminAuthToken,
  async (req, res) => {
    const { id } = req.params;
    const { isShortlisted, isJoined } = req.body;

    try {
      // Get the user's email from the decoded token
      const { adminEmail } = req.user;

      // Find the user in the database
      const user = await AdminUsers.findOne({ adminEmail });
      if (!user) {
        return res.status(404).json({ message: "Admin not found" });
      }

      // Find the associate by ID
      const cvUser = await CvSharing.findById(id);
      if (!cvUser) {
        return res.status(404).json({ message: "cv details not found" });
      }

      // Update the cvSharing's fields
      if (!isShortlisted) {
        cvUser.isShortlisted = cvUser.isShortlisted;
      } else {
        cvUser.isShortlisted = isShortlisted;
        cvUser.count = cv.user+1;
      }

      if (!isJoined) {
        cvUser.isJoined = cvUser.isJoined;
      } else {
        cvUser.isJoined = isJoined;
        cvUser.count = cv.user+1;
      }

      // Save the updated associate
      await cvUser.save();

      res.status(200).json({ message: "cv details updated successfully" });
    } catch (error) {
      console.error("Error updating cv details:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// UPDATE AFFILIATES CV-SHARE BY ID
router.put(
    "/admin-affiliates-data/update-cv-sharing/:id",
    adminAuthToken,
    async (req, res) => {
      const { id } = req.params;
      const { isShortlisted, isJoined } = req.body;
  
      try {
        // Get the user's email from the decoded token
        const { adminEmail } = req.user;
  
        // Find the user in the database
        const user = await AdminUsers.findOne({ adminEmail });
        if (!user) {
          return res.status(404).json({ message: "Admin not found" });
        }
  
        // Find the associate by ID
        const cvUser = await CvSharing.findById(id);
        if (!cvUser) {
          return res.status(404).json({ message: "cv details not found" });
        }
  
        // Update the cvSharing's fields
        if (!isShortlisted) {
          cvUser.isShortlisted = cvUser.isShortlisted;
        } else {
          cvUser.isShortlisted = isShortlisted;
        }
  
        if (!isJoined) {
          cvUser.isJoined = cvUser.isJoined;
        } else {
          cvUser.isJoined = isJoined;
        }
  
        // Save the updated associate
        await cvUser.save();
  
        res.status(200).json({ message: "cv details updated successfully" });
      } catch (error) {
        console.error("Error updating cv details:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  );

export default router;