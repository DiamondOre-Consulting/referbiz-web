import express, { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import Employees from "../Models/Employees.js";
import employeeAuthToken from "../Middlewares/employeeAuthToken.js";
import AssoUsers from "../Models/AssoUsers.js";
import CvSharing from "../Models/CvSharing.js";
dotenv.config();

const secretKey = process.env.EMPLOYEE_JWT_SECRET;

const router = express.Router();

// EMPLOYEE SIGN-UP
router.post("/employee-signup", async (req, res) => {
  const { EmpName, EmpEmail, password, myAsso } = req.body;

  try {
    // Check if user already exists
    const userExists = await Employees.exists({ EmpEmail });
    if (userExists) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object
    const newEmp = new Employees({
      EmpName,
      EmpEmail,
      password: hashedPassword,
    });

    // Save the user to the database
    await newEmp.save();

    return res.status(201).json({ message: "Employee created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// EMPLOYEE LOGIN
router.post("/employee-login", async (req, res) => {
  const { EmpEmail, password } = req.body;

  try {
    // Find the user in the database
    const user = await Employees.findOne({ EmpEmail });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare the passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { EmpName: user.EmpName, EmpEmail: user.EmpEmail },
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

// EMPLOYEE USER_DATA
router.get("/user-data", employeeAuthToken, async (req, res) => {
  try {
    // Get the user's email from the decoded token
    const { EmpEmail, id } = req.user;

    // Find the user in the database
    const user = await Employees.findOne({ EmpEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Extract the required fields from the user object
    const {
      EmpName,
      profileImage,
      totalShared,
      totalShortlisted,
      totalJoined,
      totalAmount,
      myAsso,
    } = user;
    // console.log(user.totalShortlisted, " ", user.totalJoined)

    res
      .status(200)
      .json({
        EmpName,
        EmpEmail,
        profileImage,
        totalShared,
        totalShortlisted,
        totalJoined,
        totalAmount,
        myAsso,
      });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ASSOCIATES SECTION
// FETCHING ALL ASSOCIATES DATA
router.get("/my-associates-data", employeeAuthToken, async (req, res) => {
  try {
    // Get the user's email from the decoded token
    const { EmpEmail, myAsso } = req.user;

    // Find the user in the database
    const user = await Employees.findOne({ EmpEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log(user);

    const myAssos = await AssoUsers.find({ _id: { $in: user.myAsso } }, { password: 0 });

    res.status(200).json(myAssos);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// FETCHING AN ASSOCIATE BY ID
router.get("/my-associates-data/:id", employeeAuthToken, async (req, res) => {
  const { id } = req.params;

  try {
    // Get the user's email from the decoded token
    const { EmpEmail } = req.user;

    // Find the user in the database
    const user = await Employees.findOne({ EmpEmail });
    if (!user) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Find the associate by ID
    const associate = await AssoUsers.findById(id, { password: 0 });
    if (!associate) {
      return res.status(404).json({ message: "Associate not found" });
    }

    console.log(associate.allCvInfo);

    res.status(200).json(associate);
  } catch (error) {
    console.error("Error retrieving associate:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// UPDATE A PARTICULAR ASSOCIATE
router.put(
  "/my-associates-data/update/:id",
  employeeAuthToken,
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
      const { EmpEmail } = req.user;

      // Find the user in the database
      const user = await Employees.findOne({ EmpEmail });
      if (!user) {
        return res.status(404).json({ message: "Employee not found" });
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

      res.status(200).json({ message: "Your associate is updated successfully" });
    } catch (error) {
      console.error("Error updating associate:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// UPDATE ASSOCIATE CV-SHARE SHORTLISTED BY ID
router.put(
  "/my-associates-data/update-shortlisted-cv-sharing/:id",
  employeeAuthToken,
  async (req, res) => {
    const { id } = req.params;
    const { isShortlisted, isJoined } = req.body;
    const cvId = id;

    try {
      // Get the user's email from the decoded token
      const { EmpEmail } = req.user;

      // Find the user in the database
      const user = await Employees.findOne({ EmpEmail });
      if (!user) {
        return res.status(404).json({ message: "Employee not found" });
      }

      // Find the associate by ID
      const cvUserShortlist = await CvSharing.findByIdAndUpdate(id, {
        $set: { isShortlisted: true },
      });
      if (!cvUserShortlist) {
        return res.status(404).json({ message: "cv details not found" });
      }

      console.log(cvUserShortlist.isShortlisted);
      if (cvUserShortlist.isShortlisted) {
        const assoUser = await AssoUsers.findOneAndUpdate(
          { allCvInfo: cvId, totalShortlisted: { $ne: 1 } },
          { $inc: { totalShortlisted: 1 } }
        );
        console.log(assoUser);
        const empUser = await Employees.findOneAndUpdate(
          { myAsso: assoUser._id, totalShortlisted: { $ne: 1 } },
          { $inc: { totalShortlisted: 1 } }
        );
        console.log(empUser);
      }

      // Save the updated associate
      await cvUserShortlist.save();

      res.status(200).json({ message: "cv details updated successfully" });
    } catch (error) {
      console.error("Error updating cv details:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// UPDATE ASSOCIATE CV-SHARE JOINED BY ID
router.put(
  "/my-associates-data/update-joined-cv-sharing/:id",
  employeeAuthToken,
  async (req, res) => {
    const { id } = req.params;
    const { isShortlisted, isJoined } = req.body;
    const cvId = id;

    try {
      // Get the user's email from the decoded token
      const { EmpEmail } = req.user;

      // Find the user in the database
      const user = await Employees.findOne({ EmpEmail });
      if (!user) {
        return res.status(404).json({ message: "Employee not found" });
      }

      // Find the associate by ID
      const cvUserJoined = await CvSharing.findByIdAndUpdate(id, {
        $set: { isJoined: true },
      });
      if (!cvUserJoined) {
        return res.status(404).json({ message: "cv details not found" });
      }

      console.log(cvUserJoined.isJoined);
      if (cvUserJoined.isJoined) {
        const assoUser = await AssoUsers.findOneAndUpdate(
          { allCvInfo: cvId, totalJoined: { $ne: 1 } },
          { $inc: { totalJoined: 1 } }
        );
        console.log(assoUser);
        const empUser = await Employees.findOneAndUpdate(
          { myAsso: assoUser._id, totalJoined: { $ne: 1 } },
          { $inc: { totalJoined: 1 } }
        );
        console.log(empUser);
      }

      // Save the updated associate
      await cvUserJoined.save();

      res.status(200).json({ message: "cv details updated successfully" });
    } catch (error) {
      console.error("Error updating cv details:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// FETCHING ASSOCIATE'S CV DETAILS BY ID
router.get(
  "/my-associates/get-cv-data/:id",
  employeeAuthToken,
  async (req, res) => {
    const { id } = req.params;

    try {
      // Get the user's email from the decoded token
      const { email } = req.user;

      // Find the user in the database
      const user = await Employees.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "Employee not found" });
      }

      // Find the affiliate by ID
      const cvById = await CvSharing.findById(id);
      if (!cvById) {
        return res.status(404).json({ message: "Cv Details not found" });
      }

      res.status(200).json(cvById);
    } catch (error) {
      console.error("Error retrieving associate:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

export default router;
