import express, { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import adminAuthToken from "../Middlewares/adminAuthToken.js";
import path from "path"
import AdminUsers from "../Models/AdminUsers.js";
import Users from "../Models/Users.js";
import AssoUsers from "../Models/AssoUsers.js";
import CvSharing from "../Models/CvSharing.js";
import Employees from "../Models/Employees.js";
dotenv.config();

const __dirname = path.resolve(path.dirname(''));

const secretKey = process.env.ADMIN_JWT_SECRET;

const router = express.Router();

const randomKeyGen = (length) => {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomKey = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    randomKey += charset.charAt(randomIndex);
  }

  return randomKey;
};

// SIGNUP NEW ADMIN
router.post("/admin-signup-rb", adminAuthToken, async (req, res) => {
  const { name, email, password } = req.body;

  try {

    // Check if user already exists
    const userExists = await AdminUsers.exists({ email });
    if (userExists) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const randomKey = randomKeyGen(15);

    // Create a new user object
    const newAdmin = new AdminUsers({
      name,
      email,
      password: hashedPassword,
      key: randomKey,
    });

    // Save the user to the database
    await newAdmin.save();

    return res.status(201).json({ message: "Admin User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// LOGIN AS ADMIN
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

    const {key} = user;

    return res.status(200).json({ token, key });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// LOGGED IN USER DATA
router.get("/admin-user-data", adminAuthToken, async (req, res) => {
  try {
    // Get the user's email from the decoded token
    const { email } = req.user;

    // Find the user in the database
    const user = await AdminUsers.findOne({ email });
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
      key
    } = user;
    // console.log(user.totalShortlisted, " ", user.totalJoined)

    res.status(200).json({
      id,
      name,
      email,
      profileImage,
      totalShared,
      totalShortlisted,
      totalJoined,
      totalAmount,
      key
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// UPDATE USER-DATA
router.put("/admin-user-data/update/:id", adminAuthToken, async (req, res) => {
  const { name, email } = req.body;

  try {
    // Get the user's id from the decoded token
    const { id } = req.params;
    console.log(id);

    // Find the affiliate by ID
    const admin = await AdminUsers.findById(id);
    if (!admin) {
      return res.status(404).json({ message: "admin not found" });
    }

    // Update the admin's fields
    if (!name) {
      admin.name = admin.name;
    } else {
      admin.name = name;
    }

    if (!email) {
      admin.email = admin.email;
    } else {
      admin.email = email;
    }

    // Save the updated admin
    await admin.save();

    res.status(200).json({ message: "admin updated successfully" });
  } catch (error) {
    console.error("Error updating admin:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// EMPLOYEES SECTION
// FETCHING ALL EMPLOYEES DATA
router.get("/admin-employees-data", adminAuthToken, async (req, res) => {
  try {
    // Get the user's email from the decoded token
    const { email } = req.user;

    // Find the user in the database
    const user = await AdminUsers.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const employees = await Employees.find({}, { password: 0 });

    // Extract the required fields from the user object
    //   const { name, email, totalShared, totalShortlisted, totalJoined, totalAmount } = user;
    // console.log(employees[15].name, " and ", employees[15].email);
    res.status(200).json(employees);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET AN EMPLOYEE BY ID
router.get("/admin-employees-data/:id", adminAuthToken, async (req, res) => {
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
    const employee = await Employees.findById(id, { password: 0 });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json(employee);
  } catch (error) {
    console.error("Error retrieving affiliate:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// UPDATE AN EMPLOYEE BY ID
router.put(
  "/admin-employees-data/update/:id",
  adminAuthToken,
  async (req, res) => {
    const { id } = req.params;
    const {
      EmpName,
      EmpEmail,
      totalShared,
      totalShortlisted,
      totalAmount,
      totalJoined,
      myAsso,
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
      const employee = await Employees.findById(id);
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }

      // Update the affiliate's fields
      if (!EmpName) {
        employee.EmpName = employee.EmpName;
      } else {
        employee.EmpName = EmpName;
      }

      if (!EmpEmail) {
        employee.EmpEmail = employee.EmpEmail;
      } else {
        employee.EmpEmail = EmpEmail;
      }

      if (!totalShared) {
        employee.totalShared = employee.totalShared;
      } else {
        employee.totalShared = totalShared;
      }

      if (!totalShortlisted) {
        employee.totalShortlisted = employee.totalShortlisted;
      } else {
        employee.totalShortlisted = totalShortlisted;
      }

      if (!totalJoined) {
        employee.totalJoined = employee.totalJoined;
      } else {
        employee.totalJoined = totalJoined;
      }

      if (!totalAmount) {
        employee.totalAmount = employee.totalAmount;
      } else {
        employee.totalAmount = totalAmount;
      }

      // Save the updated employee
      await employee.save();

      res.status(200).json({ message: "employee updated successfully" });
    } catch (error) {
      console.error("Error updating employee:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// DELETE EMPLOYEE BY ID
router.delete(
  "/admin-employees-data/delete/:id",
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

      const deletedEmployee = await Employees.findByIdAndDelete(id);
      if (!deletedEmployee) {
        return res.status(404).json({ message: "Employee not found" });
      }

      res.status(200).json({ message: "Employee deleted successfully" });
    } catch (error) {
      console.error("Error deleting affiliate:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

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

      if (mentorEmail) {
        const previousUser = await Employees.findOneAndUpdate(
          { EmpEmail: mentorEmail },
          { $pull: { myAsso: associate._id } } // Use $pull to remove associate._id from myAsso
        );
        const emp = await Employees.findOneAndUpdate(
          { EmpEmail: mentorEmail },
          { $push: { myAsso: associate._id } }
        );
      }

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
    console.log(allCv[1].refName, " and ", allCv[1].refUniqueEmailId);
    res.status(200).json(allCv);
  } catch (error) {
    console.error("Error fetching CV data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// FETCH AFFILIATES CV DETAILS BY ID
router.get(
  "/admin-affiliates-data/get-cv-data/:id",
  adminAuthToken,
  async (req, res) => {
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
      const cvById = await CvSharing.findById(id);
      if (!cvById) {
        return res.status(404).json({ message: "Cv Details not found" });
      }
  
      res.status(200).json(cvById);
    } catch (error) {
      console.error("Error retrieving affiliate:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// FETCH ASSOCIATES CV DETAILS BY ID
router.get(
  "/admin-associates-data/get-cv-data/:id",
  adminAuthToken,
  async (req, res) => {
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

// UPDATE ASSOCIATE CV-SHARE SHORTLISTED BY ID
router.put(
  "/admin-associates-data/update-shortlisted-cv-sharing/:id",
  adminAuthToken,
  async (req, res) => {
    const { id } = req.params;
    const { isShortlisted, isJoined } = req.body;
    const cvId = id;

    try {
      // Get the user's email from the decoded token
      const { adminEmail } = req.user;

      // Find the user in the database
      const user = await AdminUsers.findOne({ adminEmail });
      if (!user) {
        return res.status(404).json({ message: "Admin not found" });
      }

      // Find the associate by ID
      const cvUserShortlist = await CvSharing.findByIdAndUpdate(
        id,
        {
          $set: { isShortlisted: true },
        },
        { new: true }
      );
      if (!cvUserShortlist) {
        return res.status(404).json({ message: "cv details not found" });
      }

      await cvUserShortlist.save();
      console.log(cvUserShortlist);

      console.log(cvUserShortlist.isShortlisted);
      if (cvUserShortlist.isShortlisted) {
        const assoUser = await AssoUsers.findOneAndUpdate(
          { allCvInfo: cvId },
          { $inc: { totalShortlisted: 1 } }
        );
        await assoUser.save();
        console.log(assoUser);
        const empUser = await Employees.findOneAndUpdate(
          { myAsso: assoUser._id },
          { $inc: { totalShortlisted: 1 } }
        );
        await empUser.save();
        console.log(empUser);
      }

      // Save the updated associate
      await cvUserShortlist.save();

      console.log(cvUserShortlist);

      res.status(200).json({ message: "cv details updated successfully" });
    } catch (error) {
      console.error("Error updating cv details:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// UPDATE ASSOCIATE CV-SHARE JOINED BY ID
router.put(
  "/admin-associates-data/update-joined-cv-sharing/:id",
  adminAuthToken,
  async (req, res) => {
    const { id } = req.params;
    const { isShortlisted, isJoined } = req.body;
    const cvId = id;

    try {
      // Get the user's email from the decoded token
      const { adminEmail } = req.user;

      // Find the user in the database
      const user = await AdminUsers.findOne({ adminEmail });
      if (!user) {
        return res.status(404).json({ message: "Admin not found" });
      }

      // Find the associate by ID
      const cvUserJoined = await CvSharing.findByIdAndUpdate(
        id,
        {
          $set: { isJoined: true },
        },
        { new: true }
      );
      if (!cvUserJoined) {
        return res.status(404).json({ message: "cv details not found" });
      }

      await cvUserJoined.save();
      console.log(cvUserJoined);

      console.log(cvUserJoined.isJoined);
      if (cvUserJoined.isJoined) {
        const assoUser = await AssoUsers.findOneAndUpdate(
          { allCvInfo: cvId },
          { $inc: { totalJoined: 1 } }
        );
        await assoUser.save();
        console.log(assoUser);
        const empUser = await Employees.findOneAndUpdate(
          { myAsso: assoUser._id },
          { $inc: { totalJoined: 1 } }
        );
        await empUser.save();
        console.log(empUser);
      }

      // Save the updated associate
      await cvUserJoined.save();

      console.log(cvUserJoined);

      res.status(200).json({ message: "cv details updated successfully" });
    } catch (error) {
      console.error("Error updating cv details:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// UPDATE AFFILIATE CV-SHARE SHORTLISTED BY ID
router.put(
  "/admin-affiliates-data/update-shortlisted-cv-sharing/:id",
  adminAuthToken,
  async (req, res) => {
    const { id } = req.params;
    const { isShortlisted, isJoined } = req.body;
    const cvId = id;

    try {
      // Get the user's email from the decoded token
      const { adminEmail } = req.user;

      // Find the user in the database
      const user = await AdminUsers.findOne({ adminEmail });
      if (!user) {
        return res.status(404).json({ message: "Admin not found" });
      }

      // Find the associate by ID
      const cvUserShortlist = await CvSharing.findByIdAndUpdate(
        id,
        { $set: { isShortlisted: true } },
        { new: true }
      );

      // Save the updated associate
      await cvUserShortlist.save();
      console.log(cvUserShortlist);

      console.log(cvUserShortlist.isShortlisted);
      if (cvUserShortlist.isShortlisted) {
        const affiUser = await Users.findOneAndUpdate(
          { allCvInfo: id },
          { $inc: { totalShortlisted: 1 } }
        );

        if (affiUser) {
          await affiUser.save();
          console.log(affiUser);
        } else {
          console.log("No user found to update.");
        }
      }

      // Save the updated associate
      await cvUserShortlist.save();

      console.log(cvUserShortlist);

      res.status(200).json({ message: "cv details updated successfully" });
    } catch (error) {
      console.error("Error updating cv details:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// UPDATE AFFILIATE CV-SHARE JOINED BY ID
router.put(
  "/admin-affiliates-data/update-joined-cv-sharing/:id",
  adminAuthToken,
  async (req, res) => {
    const { id } = req.params;
    const { isShortlisted, isJoined } = req.body;
    const cvId = id;

    try {
      // Get the user's email from the decoded token
      const { adminEmail } = req.user;

      // Find the user in the database
      const user = await AdminUsers.findOne({ adminEmail });
      if (!user) {
        return res.status(404).json({ message: "Admin not found" });
      }

      // Find the associate by ID
      const cvUserJoined = await CvSharing.findByIdAndUpdate(
        id,
        { $set: { isJoined: true } },
        { new: true }
      );

      // Save the updated associate
      await cvUserJoined.save();
      console.log(cvUserJoined);

      console.log(cvUserJoined.isJoined);
      if (cvUserJoined.isJoined) {
        const affiUser = await Users.findOneAndUpdate(
          { allCvInfo: id },
          { $inc: { totalJoined: 1 } }
        );

        if (affiUser) {
          await affiUser.save();
          console.log(affiUser);
        } else {
          console.log("No user found to update.");
        }
      }

      // Save the updated associate
      await cvUserJoined.save();

      console.log(cvUserJoined);

      res.status(200).json({ message: "cv details updated successfully" });
    } catch (error) {
      console.error("Error updating cv details:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// FETCH EMPLOYEE'S CV DETAILS BY ID
router.get(
  "/admin-employees-data/get-cv-data/:id",
  adminAuthToken,
  async (req, res) => {
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

// UPDATE EMPLOYEE CV-SHARE SHORTLISTED BY ID
router.put(
  "/admin-employee-data/update-shortlisted-cv-sharing/:id",
  adminAuthToken,
  async (req, res) => {
    const { id } = req.params;
    const { isShortlisted, isJoined } = req.body;
    const cvId = id;

    try {
      // Get the user's email from the decoded token
      const { adminEmail } = req.user;

      // Find the user in the database
      const user = await AdminUsers.findOne({ adminEmail });
      if (!user) {
        return res.status(404).json({ message: "Admin not found" });
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

// PREVIEW CV BY ID
router.get("/get-cv-preview/:id", async(req,res)=> {
  console.log("This is CV Preview")
  const {id} = req.params
  console.log(__dirname)

  try {
    // Get the user's email from the decoded token
    // const { email } = req.user;

    // Find the user in the database
    // const user = await AdminUsers.findOne({ email });
    // if (!user) {
    //   return res.status(404).json({ message: "Admin not found" });
    // }

    // Find the affiliate by ID
    const cvById = await CvSharing.findById(id);
    if (!cvById) {
      return res.status(404).json({ message: "Cv Details not found" });
    }

    res.setHeader('Content-Type', 'application/pdf');
    return res.sendFile(path.join(__dirname,"/Uploads",cvById?.PDF))
  } catch (error) {
    console.error("Error retrieving associate:", error);
    res.status(500).json({ message: "Internal server error" });
  }
})

// PREVIEW ASSOCIATE CV BY ID
router.get("/get-asso-cv-preview/:id", async(req,res)=> {
  console.log("This is CV Preview")
  const {id} = req.params;
  console.log(__dirname)

  try {
    // Get the user's email from the decoded token
    // const { email } = req.user;

    // Find the user in the database
    // const user = await AdminUsers.findOne({ email });
    // if (!user) {
    //   return res.status(404).json({ message: "Admin not found" });
    // }

    // Find the affiliate by ID
    const cvById = await CvSharing.findById(id);
    if (!cvById) {
      return res.status(404).json({ message: "Cv Details not found" });
    }

    res.setHeader('Content-Type', 'application/pdf');
    return res.sendFile(path.join(__dirname,"/AssociateCv",cvById?.PDF))
  } catch (error) {
    console.error("Error retrieving associate:", error);
    res.status(500).json({ message: "Internal server error" });
  }
})

// FORGOT PASSOWORD PROCESS
router.put("/forgot-password", async (req, res) => {
  const { email, key, password } = req.body;

  try {
    // const { id } = req.params;
    console.log(key);

    // Find the user in the database
    const user = await AdminUsers.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Admin not found" });
    }

    console.log(user);

    if (user.key == key) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();

    res.status(200).json({ message: "Password Updated Successfully!!!" });
  } catch (error) {
    console.error("Error updating Admin Password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
