import express, { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import nodemailer from "nodemailer";
import Employees from "../Models/Employees.js";
import employeeAuthToken from "../Middlewares/employeeAuthToken.js";
import AssoUsers from "../Models/AssoUsers.js";
import CvSharing from "../Models/CvSharing.js";
import adminAuthToken from "../Middlewares/adminAuthToken.js";
import User from "../Models/Users.js";
import Users from "../Models/Users.js";

dotenv.config();

const secretKey = process.env.EMPLOYEE_JWT_SECRET;

const router = express.Router();

// EMPLOYEE SIGN-UP
router.post("/employee-signup", async (req, res) => {
  const { EmpName, EmpEmail, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await Employees.exists({ EmpEmail });
    if (userExists) {
      return res.status(409).json({ message: "User already exists" });
    }

        // Get the total count of employees
        const totalCount = await Employees.countDocuments();
        console.log(totalCount);

        // Format the count with leading zeros if needed
        const formattedCount = `0${totalCount + 1}`.slice(-2);
    
        // Generate UniqueCode
        const firstThreeLetters = EmpName.slice(0, 3).toLowerCase();
        const uniqueCode = `${firstThreeLetters}${formattedCount}`;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object
    const newEmp = new Employees({
      EmpName,
      EmpEmail,
      UniqueCode: uniqueCode,
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
    const { EmpEmail } = req.user;

    // Find the user in the database
    const user = await Employees.findOne({ EmpEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Extract the required fields from the user object
    const {
      id,
      EmpName,
      profileImage,
      totalShared,
      totalShortlisted,
      totalAppeared,
      totalOffered,
      totalJoined,
      totalAmount,
      myAsso,
      myAffil
    } = user;
    // console.log(user.totalShortlisted, " ", user.totalJoined)

    res
      .status(200)
      .json({
        id,
        EmpName,
        EmpEmail,
        profileImage,
        totalShared,
        totalShortlisted,
        totalAppeared,
        totalOffered,
        totalJoined,
        totalAmount,
        myAsso,
        myAffil
      });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// UPDATE
router.put(
  "/employee-user-data/update/:id",
  employeeAuthToken,
  async (req, res) => {
    const {
      EmpName,
      EmpEmail,
    } = req.body;

    try {
      // Get the user's email from the decoded token
      const { id } = req.params;
      console.log(id)

      // Find the user in the database
      // const user = await Employees.findOne({ EmpEmail });
      // if (!user) {
      //   return res.status(404).json({ message: "employee not found" });
      // }

      // Find the employee by ID
      const employee = await Employees.findById(id);
      if (!employee) {
        return res.status(404).json({ message: "employee not found" });
      }

      // Update the employee's fields
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

      // Save the updated employee
      await employee.save();

      res.status(200).json({ message: "employee updated successfully" });
    } catch (error) {
      console.error("Error updating employee:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

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
      totalAppeared,
      totalOffered,
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

      
      if (!totalOffered) {
        associate.totalOffered = associate.totalOffered;
      } else {
        associate.totalOffered = totalOffered;
      }

      if (!totalAppeared) {
        associate.totalAppeared = associate.totalAppeared;
      } else {
        associate.totalAppeared = totalAppeared;
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

// UPDATE ASSOCIATE CV-SHARE APPEARED BY ID
router.put(
  "/my-associates-data/update-appeared-cv-sharing/:id",
  employeeAuthToken,
  async (req, res) => {
    const { id } = req.params;
    const { isAppeared } = req.body;
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
      const cvUserAppeared = await CvSharing.findByIdAndUpdate(id, {
        $set: { isAppeared },
      }, { new: true });

      // if (!cvUserShortlist) {
      //   return res.status(404).json({ message: "cv details not found" });
      // }

      // Save the updated associate
      await cvUserAppeared.save();
      console.log(cvUserAppeared);

      console.log(cvUserAppeared.isAppeared);
      if (cvUserAppeared.isAppeared) {
        const assoUser = await AssoUsers.findOneAndUpdate(
          { allCvInfo: id },
          { $inc: { totalAppeared: 1 } }
        );

        if (assoUser) {
          await assoUser.save();
          console.log(assoUser);
        } else {
          console.log("No user found to update.");
        }
      }

      if (cvUserAppeared.isAppeared) {
        console.log(cvUserAppeared.isAppeared);
        const mentorUser = await Employees.findOneAndUpdate(
          { EmpEmail },
          { $inc: { totalAppeared: 1 }}
        );

        if (mentorUser) {
          await mentorUser.save();
          console.log(mentorUser);
        } else {
          console.log("No mentor to update");
        }
      }

      // Save the updated associate
      await cvUserAppeared.save();

      console.log(cvUserAppeared);

      res.status(200).json({ message: "cv details updated successfully" });
    } catch (error) {
      console.error("Error updating cv details:", error);
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
        $set: { isShortlisted },
      }, { new: true });

      // if (!cvUserShortlist) {
      //   return res.status(404).json({ message: "cv details not found" });
      // }

      // Save the updated associate
      await cvUserShortlist.save();
      console.log(cvUserShortlist);

      console.log(cvUserShortlist.isShortlisted);
      if (cvUserShortlist.isShortlisted) {
        const assoUser = await AssoUsers.findOneAndUpdate(
          { allCvInfo: id },
          { $inc: { totalShortlisted: 1 } }
        );
        // console.log(assoUser);
        // const empUser = await Employees.findOneAndUpdate(
        //   { myAsso: assoUser?._id, totalShortlisted: { $ne: 1 } },
        //   { $inc: { totalShortlisted: 1 } }
        // );
        // console.log(empUser);
        if (assoUser) {
          await assoUser.save();
          console.log(assoUser);
        } else {
          console.log("No user found to update.");
        }
      }

      if (cvUserShortlist.isShortlisted) {
        console.log(cvUserShortlist.isShortlisted);
        const mentorUser = await Employees.findOneAndUpdate(
          { EmpEmail },
          { $inc: { totalShortlisted: 1 }}
        );

        if (mentorUser) {
          await mentorUser.save();
          console.log(mentorUser);
        } else {
          console.log("No mentor to update");
        }
      }

      // Save the updated associate
      // await cvUserShortlist.save();

      // console.log(cvUserShortlist);

      res.status(200).json({ message: "cv details updated successfully" });
    } catch (error) {
      console.error("Error updating cv details:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// UPDATE ASSOCIATE CV-SHARE OFFERED BY ID
router.put(
  "/my-associates-data/update-offering-cv-sharing/:id",
  employeeAuthToken,
  async (req, res) => {
    const { id } = req.params;
    const { isOffered } = req.body;
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
      const cvUserOffered = await CvSharing.findByIdAndUpdate(id, {
        $set: { isOffered },
      }, { new: true });

      // if (!cvUserShortlist) {
      //   return res.status(404).json({ message: "cv details not found" });
      // }

      // Save the updated associate
      await cvUserOffered.save();
      console.log(cvUserOffered);

      console.log(cvUserOffered.isOffered);
      if (cvUserOffered.isOffered) {
        const affilUser = await AssoUsers.findOneAndUpdate(
          { allCvInfo: id },
          { $inc: { totalOffered: 1 } }
        );

        if (affilUser) {
          await affilUser.save();
          console.log(affilUser);
        } else {
          console.log("No user found to update.");
        }
      }

      if (cvUserOffered.isOffered) {
        console.log(cvUserOffered.isOffered);
        const mentorUser = await Employees.findOneAndUpdate(
          { EmpEmail },
          { $inc: { totalOffered: 1 }}
        );

        if (mentorUser) {
          await mentorUser.save();
          console.log(mentorUser);
        } else {
          console.log("No mentor to update");
        }
      }

      // Save the updated associate
      await cvUserOffered.save();

      console.log(cvUserOffered);

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
        $set: { isJoined },
      }, { new: true });
      // if (!cvUserJoined) {
      //   return res.status(404).json({ message: "cv details not found" });
      // }

      // Save the updated associate
      await cvUserJoined.save();
      console.log(cvUserJoined);

      console.log(cvUserJoined.isJoined);
      if (cvUserJoined.isJoined) {
        const assoUser = await AssoUsers.findOneAndUpdate(
          { allCvInfo: id },
          { $inc: { totalJoined: 1 } }
        );
        // console.log(assoUser);
        // const empUser = await Employees.findOneAndUpdate(
        //   { myAsso: assoUser?._id, totalJoined: { $ne: 1 } },
        //   { $inc: { totalJoined: 1 } }
        // );
        // console.log(empUser);
        if (assoUser) {
          await assoUser.save();
          console.log(assoUser);
        } else {
          console.log("No user found to update.");
        }
      }

      if (cvUserJoined.isJoined) {
        console.log(cvUserJoined.isJoined);
        const mentorUser = await Employees.findOneAndUpdate(
          { EmpEmail },
          { $inc: { totalJoined: 1 }}
        );

        if (mentorUser) {
          await mentorUser.save();
          console.log(mentorUser);
        } else {
          console.log("No mentor to update");
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

// AFFILIATES SECTION
// FETCHING ALL AFFILIATES DATA
router.get("/my-affiliates-data", employeeAuthToken, async (req, res) => {
  try {
    // Get the user's email from the decoded token
    const { EmpEmail, myAffil } = req.user;

    // Find the user in the database
    const user = await Employees.findOne({ EmpEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log(user);
    console.log(user.myAffil);

    const myAffiliates = await User.find({ _id: { $in: user.myAffil } }, { password: 0 });

    res.status(200).json(myAffiliates);
  } catch (error) {
    console.error("Error fetching all affiliates:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// FETCHING AN AFFILAITE BY ID
router.get("/my-affiliates-data/:id", employeeAuthToken, async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    // Get the user's email from the decoded token
    const { EmpEmail } = req.user;

    // Find the user in the database
    const user = await Employees.findOne({ EmpEmail });
    if (!user) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Find the affiliate by ID
    const affiliate = await User.findById(id, { password: 0 });
    if (!affiliate) {
      return res.status(404).json({ message: "Affiliate not found" });
    }

    console.log(affiliate);

    res.status(200).json(affiliate);
  } catch (error) {
    console.error("Error retrieving affiliate:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// FETCHING AN AFFILAITE BY ID
router.get("/my-affiliates-data/update/:id", employeeAuthToken, async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    // Get the user's email from the decoded token
    const { EmpEmail } = req.user;

    const {name, email, profileImage, totalAppeared, totalShortlisted, totalOffered, totalJoined} = req.body;

    // Find the user in the database
    const user = await Employees.findOne({ EmpEmail });
    if (!user) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Find the affiliate by ID
    const affiliate = await User.findById(id, { password: 0 });
    if (!affiliate) {
      return res.status(404).json({ message: "Affiliate not found" });
    }

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

    if (!totalAppeared) {
      affiliate.totalAppeared = affiliate.totalAppeared;
    } else {
      affiliate.totalAppeared = totalAppeared
    }

    if (!totalShortlisted) {
      affiliate.totalShortlisted = affiliate.totalShortlisted;
    } else {
      affiliate.totalShortlisted = totalShortlisted
    }

    if (!totalOffered) {
      affiliate.totalOffered = affiliate.totalOffered;
    } else {
      affiliate.totalOffered = totalOffered
    }

    if (!totalJoined) {
      affiliate.totalJoined = affiliate.totalJoined;
    } else {
      affiliate.totalJoined = totalJoined
    }

    // Save the updated affiliate
    await affiliate.save();

    console.log(affiliate);

    res.status(200).json({message: "Affiliate data has been updated!!! ", affiliate});
  } catch (error) {
    console.error("Error retrieving affiliate:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// FETCHING AFFILIATE'S CV DETAILS BY ID
router.get(
  "/my-affiliates/get-cv-data/:id",
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

// mail go to affiliate when his refereal status updated of appeared


const mailtoaffiupdatedappearingstatus = async (affirefdet, cvDetails ,user) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "harshkr2709@gmail.com",
        pass: "frtohlwnukisvrzh",
      },
    });

    const mailOptions = {
      from: "Referbiz.in <harshkr2709@gmail.com>",
      to: `Recipient <${affirefdet.email}>`,
      subject: "🎉 Congratulations! Your Referred CV is Now Appeared 🎉",
      text: `Congratulations, ${cvDetails.name}! Your referral is now Appeared.`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
          <h2 style="color: #2E86C1; text-align: center;">🎉 Congratulations, ${affirefdet.name}! 🎉</h2>
          <p style="text-align: center;">Your referral is now Appeared.</p>
          <div style="margin-top: 20px;">
            <h3 style="color: #2E86C1;">Referred CV Details:</h3>
            <ul>
              <li><strong>Name:</strong> ${cvDetails.refName}</li>
              <li><strong>Phone:</strong> ${cvDetails.refPhone}</li>
              <li><strong>Email:</strong> ${cvDetails.refUniqueEmailId}</li>
              <li><strong>Resume:</strong> ${cvDetails.PDF}</li>
            </ul>
          </div>
          <p>Best Regards,<br/>${user.EmpName}</p>
          <p style="font-style: italic; text-align: center;">Thank you for your referral!</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);

    // console.log(info);
  } catch (error) {
    console.error("Error sending Mail:", error);
    throw error;
  }
}


// mail go to admin the that referel refrence is appeared 

const mailtoadminupdatedappearingstatus = async ( affirefdet ,cvDetails ,user ) => {

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "harshkr2709@gmail.com",
        pass: "frtohlwnukisvrzh",
      },
    });

    const mailOptions = {
      from: "Referbiz.in <harshkr2709@gmail.com>",
      to: `Recipient <info.codifiers@gmail.com>`,
      subject: "Appeared status has been updated",
      text: ``,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; background-color: #f5f5f5; padding: 20px;">
          <h2 style="color: #2E86C1; margin-bottom: 20px;">Appeared Status Update</h2>
          <p>Hello Admin,</p>
          <p>This is to inform you that the appeared status of an affiliate${affirefdet.name}  who refer  ${cvDetails.refName} has been updated.</p>
          <h3 style="color: #2E86C1; margin-top: 30px;">Referred CV Details:</h3>
          <ul style="list-style-type: none; padding-left: 0;">
            <li><strong>Name:</strong> ${cvDetails.refName}</li>
            <li><strong>Phone:</strong> ${cvDetails.refPhone}</li>
            <li><strong>Email:</strong> ${cvDetails.refUniqueEmailId}</li>
            <li><strong>Resume:</strong> ${cvDetails.PDF}</li>
            <li><strong>Employee name:</strong> ${user.EmpName}</li>
            <li><strong>isAppeared:</strong>True</li>
          </ul>
          <p>Please take necessary actions as required.</p>
          <p>Best Regards,<br/>Referbiz Team</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);

    // console.log(info);
  } catch (error) {
    console.error("Error sending Mail:", error);
    throw error;
  }

}

// mail go to employee that his /her appeared has been updated

const mailtoemployeeupdatedappearingstatus = async (affirefdet, cvDetails, user) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "harshkr2709@gmail.com",
        pass: "frtohlwnukisvrzh",
      },
    });

    const mailOptions = {
      from: "Referbiz.in <harshkr2709@gmail.com>",
      to: `Recipient <${user.EmpEmail}>`,
      subject: "Appeared status has been updated",
      text: `Hello ${user.EmpName}, Your affiliate's appeared status has been updated.`,
      html: `
        <p>Hello ${user.EmpName},</p>
        <p>We're writing to inform you that your affiliate, ${affirefdet.name}, has had their appeared status updated.</p>
        <h3>Referred CV Details:</h3>
        <ul>
          <li><b>Name:</b> ${cvDetails.refName}</li>
          <li><b>Phone:</b> ${cvDetails.refPhone}</li>
          <li><b>Email:</b> ${cvDetails.refUniqueEmailId}</li>
          <li><b>Resume:</b> ${cvDetails.PDF}</li>
        </ul>
        <p>Thank you for your attention.</p>
        <p>Best Regards,<br/>Referbiz Team</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending Mail:", error);
    throw error;
  }
}


// UPDATE AFFILIATE CV-SHARE APPEARED BY ID
router.put(
  "/my-affiliates-data/update-appeared-cv-sharing/:id",
  employeeAuthToken,
  async (req, res) => {
    const { id } = req.params;
    const { isAppeared } = req.body;
    const cvId = id;

    try {
      // Get the user's email from the decoded token
      const { EmpEmail } = req.user;

      // Find the user in the database
      const cvDetails = await CvSharing.findById(id);
      const affirefdet =await Users.findOne({allCvInfo : id });
      const user = await Employees.findOne({ EmpEmail });
    
      if (!user) {
        return res.status(404).json({ message: "Employee not found" });
      }

      // Find the associate by ID
      const cvUserAppeared = await CvSharing.findByIdAndUpdate(id, {
        $set: { isAppeared },
      }, { new: true });

      // if (!cvUserShortlist) {
      //   return res.status(404).json({ message: "cv details not found" });
      // }

      // Save the updated associate
      await cvUserAppeared.save();
      console.log(cvUserAppeared);

      console.log(cvUserAppeared.isAppeared);
      if (cvUserAppeared.isAppeared) {
        const affilUser = await User.findOneAndUpdate(
          { allCvInfo: id },
          { $inc: { totalAppeared: 1 } }
        );

        if (affilUser) {
          await affilUser.save();
          console.log(affilUser);
        } else {
          console.log("No user found to update.");
        }
      }

      if (cvUserAppeared.isAppeared) {
        console.log(cvUserAppeared.isAppeared);
        const mentorUser = await Employees.findOneAndUpdate(
          { EmpEmail },
          { $inc: { totalAppeared: 1 }}
        );

        if (mentorUser) {
          await mentorUser.save();
          console.log(mentorUser);
        } else {
          console.log("No mentor to update");
        }
      }

      // Save the updated associate
      await cvUserAppeared.save();

      console.log(cvUserAppeared);

      await mailtoaffiupdatedappearingstatus(affirefdet ,cvDetails,user);
      await mailtoadminupdatedappearingstatus(affirefdet ,cvDetails ,user)
      await mailtoemployeeupdatedappearingstatus( affirefdet ,cvDetails ,user)
      res.status(200).json({ message: "cv details updated successfully" });
    } catch (error) {
      console.error("Error updating cv details:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

//mail to affilite that his refferel sv is shorlisted

const mailtoaffiupdatedShotlistingstatus = async ( affirefdet ,cvDetails,user ) => {

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "harshkr2709@gmail.com",
        pass: "frtohlwnukisvrzh",
      },
    });

    const mailOptions = {
      from: "Referbiz.in <harshkr2709@gmail.com>",
      to: `Recipient <${affirefdet.email}>`,
      subject: "🎉 Congratulations! Your Referred CV is Now Shortlisted🎉",
      text: `Congratulations, ${cvDetails.name}! Your referral is now Shortlisted.`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
          <h2 style="color: #2E86C1; text-align: center;">🎉 Congratulations, ${affirefdet.name}! 🎉</h2>
          <p style="text-align: center;">Your referral is now Shortlisted.</p>
          <div style="margin-top: 20px;">
            <h3 style="color: #2E86C1;">Referred CV Details:</h3>
            <ul>
              <li><strong>Name:</strong> ${cvDetails.refName}</li>
              <li><strong>Phone:</strong> ${cvDetails.refPhone}</li>
              <li><strong>Email:</strong> ${cvDetails.refUniqueEmailId}</li>
              <li><strong>Resume:</strong> ${cvDetails.PDF}</li>
            </ul>
          </div>
          <p>Best Regards,<br/>${user.EmpName}</p>
          <p style="font-style: italic; text-align: center;">Thank you for your referral!</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);

    // console.log(info);
  } catch (error) {
    console.error("Error sending Mail:", error);
    throw error;
  }

}


// mail go to admin the that referel refrence is Shortlisted 

const mailtoadminupdatedShortlistingstatus = async ( affirefdet ,cvDetails ,user ) => {

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "harshkr2709@gmail.com",
        pass: "frtohlwnukisvrzh",
      },
    });

    const mailOptions = {
      from: "Referbiz.in <harshkr2709@gmail.com>",
      to: `Recipient <info.codifiers@gmail.com>`,
      subject: "Shortlisting status has been updated",
      text: ``,
      html: `
      <div style="font-family: Arial, sans-serif; color: #333; background-color: #f5f5f5; padding: 20px;">
      <h2 style="color: #2E86C1; margin-bottom: 20px;">Shortlisting Status Update</h2>
      <p>Hello Admin,</p>
      <p>This is to inform you that the shortlisting status of an affiliate${affirefdet.name}  who refer  ${cvDetails.refName} has been updated.</p>
      <h3 style="color: #2E86C1; margin-top: 30px;">Referred CV Details:</h3>
      <ul style="list-style-type: none; padding-left: 0;">
        <li><strong>Name:</strong> ${cvDetails.refName}</li>
        <li><strong>Phone:</strong> ${cvDetails.refPhone}</li>
        <li><strong>Email:</strong> ${cvDetails.refUniqueEmailId}</li>
        <li><strong>Resume:</strong> ${cvDetails.PDF}</li>
        <li><strong>Employee name:</strong> ${user.EmpName}</li>
        <li><strong>isShortlisted:</strong>True</li>
      </ul>
      <p>Please take necessary actions as required.</p>
      <p>Best Regards,<br/>Referbiz Team</p>
    </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);

    // console.log(info);
  } catch (error) {
    console.error("Error sending Mail:", error);
    throw error;
  }

}

// mail go to employee that his /her shortlisting has been updated

const mailtoemployeeupdatedShorlistingstatus = async ( affirefdet ,cvDetails ,user ) => {

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "harshkr2709@gmail.com",
        pass: "frtohlwnukisvrzh",
      },
    });

    const mailOptions = {
      from: "Referbiz.in <harshkr2709@gmail.com>",
      to: `Recipient <${user.EmpEmail}>`,
      subject: "Shortlisting status has been updated",
      text: `Hello ${user.EmpName}, Your affiliate's Shortlisting status has been updated.`,
      html: `
        <p>Hello ${user.EmpName},</p>
        <p>We're writing to inform you that your affiliate, ${affirefdet.name}, has had their Shortlisting status updated.</p>
        <h3>Referred CV Details:</h3>
        <ul>
          <li><b>Name:</b> ${cvDetails.refName}</li>
          <li><b>Phone:</b> ${cvDetails.refPhone}</li>
          <li><b>Email:</b> ${cvDetails.refUniqueEmailId}</li>
          <li><b>Resume:</b> ${cvDetails.PDF}</li>
        </ul>
        <p>Thank you for your attention.</p>
        <p>Best Regards,<br/>Referbiz Team</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);

    // console.log(info);
  } catch (error) {
    console.error("Error sending Mail:", error);
    throw error;
  }

}



// UPDATE AFFILIATE CV-SHARE SHORTLISTED BY ID
router.put(
  "/my-affiliates-data/update-shortlisted-cv-sharing/:id",
  employeeAuthToken,
  async (req, res) => {
    const { id } = req.params;
    const { isShortlisted } = req.body;
    const cvId = id;

    try {
      // Get the user's email from the decoded token
      const { EmpEmail } = req.user;

      const cvDetails = await CvSharing.findById(id);
      const affirefdet =await Users.findOne({allCvInfo : id });

      // Find the user in the database
      const user = await Employees.findOne({ EmpEmail });
      if (!user) {
        return res.status(404).json({ message: "Employee not found" });
      }

      // Find the associate by ID
      const cvUserShortlist = await CvSharing.findByIdAndUpdate(id, {
        $set: { isShortlisted },
      }, { new: true });

      // if (!cvUserShortlist) {
      //   return res.status(404).json({ message: "cv details not found" });
      // }

      // Save the updated associate
      await cvUserShortlist.save();
      console.log(cvUserShortlist);

      console.log(cvUserShortlist.isShortlisted);
      if (cvUserShortlist.isShortlisted) {
        const affilUser = await User.findOneAndUpdate(
          { allCvInfo: id },
          { $inc: { totalShortlisted: 1 } }
        );

        if (affilUser) {
          await affilUser.save();
          console.log(affilUser);
        } else {
          console.log("No user found to update.");
        }
      }

      if (cvUserShortlist.isShortlisted) {
        console.log(cvUserShortlist.isShortlisted);
        const mentorUser = await Employees.findOneAndUpdate(
          { EmpEmail },
          { $inc: { totalShortlisted: 1 }}
        );

        if (mentorUser) {
          await mentorUser.save();
          console.log(mentorUser);
        } else {
          console.log("No mentor to update");
        }
      }

      // Save the updated associate
      await cvUserShortlist.save();

      console.log(cvUserShortlist);
      await mailtoaffiupdatedShotlistingstatus(affirefdet ,cvDetails ,user);
      await mailtoadminupdatedShortlistingstatus( affirefdet ,cvDetails ,user);
      await mailtoemployeeupdatedShorlistingstatus( affirefdet ,cvDetails ,user ) ;
      res.status(200).json({ message: "cv details updated successfully" });
    } catch (error) {
      console.error("Error updating cv details:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// mail to affiliate that his cv is offered


const mailtoaffiupdatedOfferedstatus = async ( affirefdet ,cvDetails ,user) => {

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "harshkr2709@gmail.com",
        pass: "frtohlwnukisvrzh",
      },
    });

    const mailOptions = {
      from: "Referbiz.in <harshkr2709@gmail.com>",
      to: `Recipient <${affirefdet.email}>`,
      subject: "🎉 Congratulations! Your Referred CV is Now Offered🎉",
      text: `Congratulations, ${cvDetails.name}! Your referral is now Offered.`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
          <h2 style="color: #2E86C1; text-align: center;">🎉 Congratulations, ${affirefdet.name}! 🎉</h2>
          <p style="text-align: center;">Your referral is now Offered.</p>
          <div style="margin-top: 20px;">
            <h3 style="color: #2E86C1;">Referred CV Details:</h3>
            <ul>
              <li><strong>Name:</strong> ${cvDetails.refName}</li>
              <li><strong>Phone:</strong> ${cvDetails.refPhone}</li>
              <li><strong>Email:</strong> ${cvDetails.refUniqueEmailId}</li>
              <li><strong>Resume:</strong> ${cvDetails.PDF}</li>
            </ul>
          </div>
          <p>Best Regards,<br/>${user.EmpName}</p>
          <p style="font-style: italic; text-align: center;">Thank you for your referral!</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);

    // console.log(info);
  } catch (error) {
    console.error("Error sending Mail:", error);
    throw error;
  }

}


// mail go to admin the that referel refrence is Offered

const mailtoadminupdatedOfferedstatus = async ( affirefdet ,cvDetails ,user ) => {

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "harshkr2709@gmail.com",
        pass: "frtohlwnukisvrzh",
      },
    });

    const mailOptions = {
      from: "Referbiz.in <harshkr2709@gmail.com>",
      to: `Recipient <info.codifiers@gmail.com>`,
      subject: "Offered status has been updated",
      text: ``,
      html: `
      <div style="font-family: Arial, sans-serif; color: #333; background-color: #f5f5f5; padding: 20px;">
      <h2 style="color: #2E86C1; margin-bottom: 20px;">Offered Status Update</h2>
      <p>Hello Admin,</p>
      <p>This is to inform you that the Offered status of an affiliate${affirefdet.name}  who refer  ${cvDetails.refName} has been updated.</p>
      <h3 style="color: #2E86C1; margin-top: 30px;">Referred CV Details:</h3>
      <ul style="list-style-type: none; padding-left: 0;">
        <li><strong>Name:</strong> ${cvDetails.refName}</li>
        <li><strong>Phone:</strong> ${cvDetails.refPhone}</li>
        <li><strong>Email:</strong> ${cvDetails.refUniqueEmailId}</li>
        <li><strong>Resume:</strong> ${cvDetails.PDF}</li>
        <li><strong>Employee name:</strong> ${user.EmpName}</li>
        <li><strong>isOffered:</strong>True</li>
      </ul>
      
      <p>Please take necessary actions as required.</p>
      <p>Best Regards,<br/>Referbiz Team</p>
    </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);

    // console.log(info);
  } catch (error) {
    console.error("Error sending Mail:", error);
    throw error;
  }

}

// mail go to employee that his /her offered has been updated

const mailtoemployeeupdatedOfferedstatus = async ( affirefdet ,cvDetails ,user ) => {

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "harshkr2709@gmail.com",
        pass: "frtohlwnukisvrzh",
      },
    });

    const mailOptions = {
      from: "Referbiz.in <harshkr2709@gmail.com>",
      to: `Recipient <${user.EmpEmail}>`,
      subject: "Offered status has been updated",
      text: `Hello ${user.EmpName}, Your affiliate's Offered status has been updated.`,
      html: `
        <p>Hello ${user.EmpName},</p>
        <p>We're writing to inform you that your affiliate, ${affirefdet.name}, has had their offered status updated.</p>
        <h3>Referred CV Details:</h3>
        <ul>
          <li><b>Name:</b> ${cvDetails.refName}</li>
          <li><b>Phone:</b> ${cvDetails.refPhone}</li>
          <li><b>Email:</b> ${cvDetails.refUniqueEmailId}</li>
          <li><b>Resume:</b> ${cvDetails.PDF}</li>
        </ul>
        <p>Thank you for your attention.</p>
        <p>Best Regards,<br/>Referbiz Team</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);

    // console.log(info);
  } catch (error) {
    console.error("Error sending Mail:", error);
    throw error;
  }

}

// UPDATE AFFILIATE CV-SHARE OFFERED BY ID
router.put(
  "/my-affiliates-data/update-offering-cv-sharing/:id",
  employeeAuthToken,
  async (req, res) => {
    const { id } = req.params;
    const { isOffered } = req.body;
    const cvId = id;

    try {
      // Get the user's email from the decoded token
      const { EmpEmail } = req.user;

      const cvDetails = await CvSharing.findById(id);
      const affirefdet =await Users.findOne({allCvInfo : id });

      // Find the user in the database
      const user = await Employees.findOne({ EmpEmail });
      if (!user) {
        return res.status(404).json({ message: "Employee not found" });
      }

      // Find the associate by ID
      const cvUserOffered = await CvSharing.findByIdAndUpdate(id, {
        $set: { isOffered },
      }, { new: true });

      // if (!cvUserShortlist) {
      //   return res.status(404).json({ message: "cv details not found" });
      // }

      // Save the updated associate
      await cvUserOffered.save();
      console.log(cvUserOffered);

      console.log(cvUserOffered.isOffered);
      if (cvUserOffered.isOffered) {
        const affilUser = await User.findOneAndUpdate(
          { allCvInfo: id },
          { $inc: { totalOffered: 1 } }
        );

        if (affilUser) {
          await affilUser.save();
          console.log(affilUser);
        } else {
          console.log("No user found to update.");
        }
      }

      if (cvUserOffered.isOffered) {
        console.log(cvUserOffered.isOffered);
        const mentorUser = await Employees.findOneAndUpdate(
          { EmpEmail },
          { $inc: { totalOffered: 1 }}
        );

        if (mentorUser) {
          await mentorUser.save();
          console.log(mentorUser);
        } else {
          console.log("No mentor to update");
        }
      }

      // Save the updated associate
      await cvUserOffered.save();

      console.log(cvUserOffered);
      await mailtoaffiupdatedOfferedstatus(affirefdet ,cvDetails,user);
      await mailtoadminupdatedOfferedstatus( affirefdet ,cvDetails ,user );
      await mailtoemployeeupdatedOfferedstatus( affirefdet ,cvDetails ,user )
      res.status(200).json({ message: "cv details updated successfully" });
    } catch (error) {
      console.error("Error updating cv details:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);


//mail to affilate that his referal has been joined

const mailtoaffiupdatedJoiningstatus = async ( affirefdet ,cvDetails,user ) => {

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "harshkr2709@gmail.com",
        pass: "frtohlwnukisvrzh",
      },
    });

    const mailOptions = {
      from: "Referbiz.in <harshkr2709@gmail.com>",
      to: `Recipient <${affirefdet.email}>`,
      subject: "🎉 Congratulations! Your Referred CV is Now Joined🎉",
      text: `Congratulations, ${cvDetails.name}! Your referral is now Joined.`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
          <h2 style="color: #2E86C1; text-align: center;">🎉 Congratulations, ${affirefdet.name}! 🎉</h2>
          <p style="text-align: center;">Your referral is now Joined.</p>
          <div style="margin-top: 20px;">
            <h3 style="color: #2E86C1;">Referred CV Details:</h3>
            <ul>
              <li><strong>Name:</strong> ${cvDetails.refName}</li>
              <li><strong>Phone:</strong> ${cvDetails.refPhone}</li>
              <li><strong>Email:</strong> ${cvDetails.refUniqueEmailId}</li>
              <li><strong>Resume:</strong> ${cvDetails.PDF}</li>
            </ul>
          </div>
          <p>Best Regards,<br/>${user.EmpName}</p>
          <p style="font-style: italic; text-align: center;">Thank you for your referral!</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);

    // console.log(info);
  } catch (error) {
    console.error("Error sending Mail:", error);
    throw error;
  }

}


// mail go to admin the that referel refrence is joined

const mailtoadminupdatedJoinedstatus = async ( affirefdet ,cvDetails ,user ) => {

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "harshkr2709@gmail.com",
        pass: "frtohlwnukisvrzh",
      },
    });
  
    const mailOptions = {
      from: "Referbiz.in <harshkr2709@gmail.com>",
      to: `Recipient <info.codifiers@gmail.com>`,
      subject: "Joining status has been updated",
      text: ``,
      html: `
      <div style="font-family: Arial, sans-serif; color: #333; background-color: #f5f5f5; padding: 20px;">
      <h2 style="color: #2E86C1; margin-bottom: 20px;">Joining Status Update</h2>
      <p>Hello Admin,</p>
      <p>This is to inform you that the Joining status of an affiliate${affirefdet.name}  who refer  ${cvDetails.refName} has been updated.</p>
      <h3 style="color: #2E86C1; margin-top: 30px;">Referred CV Details:</h3>
      <ul style="list-style-type: none; padding-left: 0;">
        <li><strong>Name:</strong> ${cvDetails.refName}</li>
        <li><strong>Phone:</strong> ${cvDetails.refPhone}</li>
        <li><strong>Email:</strong> ${cvDetails.refUniqueEmailId}</li>
        <li><strong>Resume:</strong> ${cvDetails.PDF}</li>
        <li><strong>Employee name:</strong> ${user.EmpName}</li>
        <li><strong>isShortlisted:</strong>True</li>
      </ul>
      <p>Please take necessary actions as required.</p>
      <p>Best Regards,<br/>Referbiz Team</p>
    </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);

    // console.log(info);
  } catch (error) {
    console.error("Error sending Mail:", error);
    throw error;
  }

}

// mail go to employee that his /her Joining  has been updated

const mailtoemployeeupdatedJoiningstatus = async ( affirefdet ,cvDetails ,user ) => {

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "harshkr2709@gmail.com",
        pass: "frtohlwnukisvrzh",
      },
    });

    const mailOptions = {
      from: "Referbiz.in <harshkr2709@gmail.com>",
      to: `Recipient <${user.EmpEmail}>`,
      subject: "Joining status has been updated",
      text: `Hello ${user.EmpName}, Your affiliate's Joining status has been updated.`,
      html: `
        <p>Hello ${user.EmpName},</p>
        <p>We're writing to inform you that your affiliate, ${affirefdet.name}, has had their Joining status updated.</p>
        <h3>Referred CV Details:</h3>
        <ul>
          <li><b>Name:</b> ${cvDetails.refName}</li>
          <li><b>Phone:</b> ${cvDetails.refPhone}</li>
          <li><b>Email:</b> ${cvDetails.refUniqueEmailId}</li>
          <li><b>Resume:</b> ${cvDetails.PDF}</li>
        </ul>
        <p>Thank you for your attention.</p>
        <p>Best Regards,<br/>Referbiz Team</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);

    // console.log(info);
  } catch (error) {
    console.error("Error sending Mail:", error);
    throw error;
  }

}

// UPDATE AFFILIATE CV-SHARE JOINED BY ID
router.put(
  "/my-affiliates-data/update-joined-cv-sharing/:id",
  employeeAuthToken,
  async (req, res) => {
    const { id } = req.params;
    const { isShortlisted, isJoined } = req.body;
    const cvId = id;

    try {
      // Get the user's email from the decoded token
      const { EmpEmail } = req.user;

      const cvDetails = await CvSharing.findById(id);
      const affirefdet =await Users.findOne({allCvInfo : id });

      // Find the user in the database
      const user = await Employees.findOne({ EmpEmail });
      if (!user) {
        return res.status(404).json({ message: "Employee not found" });
      }

      // Find the associate by ID
      const cvUserJoined = await CvSharing.findByIdAndUpdate(id, {
        $set: { isJoined: true },
      }, { new: true });
      // if (!cvUserJoined) {
      //   return res.status(404).json({ message: "cv details not found" });
      // }

      // Save the updated associate
      await cvUserJoined.save();
      console.log(cvUserJoined);

      console.log(cvUserJoined.isJoined);
      if (cvUserJoined.isJoined) {
        const affilUser = await User.findOneAndUpdate(
          { allCvInfo: id },
          { $inc: { totalJoined: 1 } }
        );
        // console.log(assoUser);
        // const empUser = await Employees.findOneAndUpdate(
        //   { myAsso: assoUser?._id, totalJoined: { $ne: 1 } },
        //   { $inc: { totalJoined: 1 } }
        // );
        // console.log(empUser);
        if (affilUser) {
          await affilUser.save();
          console.log(affilUser);
        } else {
          console.log("No user found to update.");
        }
      }

      if (cvUserJoined.isJoined) {
        console.log(cvUserJoined.isJoined);
        const mentorUser = await Employees.findOneAndUpdate(
          { EmpEmail },
          { $inc: { totalJoined: 1 }}
        );

        if (mentorUser) {
          await mentorUser.save();
          console.log(mentorUser);
        } else {
          console.log("No mentor to update");
        }
      }

      // Save the updated associate
      await cvUserJoined.save();

      console.log(cvUserJoined);
      await mailtoaffiupdatedJoiningstatus( affirefdet ,cvDetails ,user)
      await mailtoadminupdatedJoinedstatus ( affirefdet ,cvDetails ,user );
      await mailtoemployeeupdatedJoiningstatus( affirefdet ,cvDetails ,user)
      res.status(200).json({ message: "cv details updated successfully" });
    } catch (error) {
      console.error("Error updating cv details:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// mail go to affiliate when amout is updated
const mailforamountincreementupdate= async ( affdetails , user ) => {

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "harshkr2709@gmail.com",
        pass: "frtohlwnukisvrzh",
      },
    });

    const mailOptions = {
      from: "Referbiz.in <harshkr2709@gmail.com>",
      to: `Recipient <${affdetails.email}>`,
      subject: "🎉 Congratulations! Commission Increment Notification🎉",
      text:'',
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
          <h2 style="color: #2E86C1; text-align: center;">🎉 Congratulations, ${affdetails.name}! 🎉</h2>
          <div style="margin-top: 20px;">
            <p>We're thrilled to inform you that due to your outstanding performance and contribution to our affiliate model, we're increasing your commission rates, effective immediately. We truly appreciate your hard work and dedication .</p>
            <h4 style=" color: green ;">Now your total amount is <span style="color:red">${affdetails.totalAmount} </span></h4>
          </div>
          <p>Best Regards,<br/>${user.EmpName}</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);

    // console.log(info);
  } catch (error) {
    console.error("Error sending Mail:", error);
    throw error;
  }

}



// amonut apdation of an affiliate dashbord
router.put('/affiliate-amount-update/:id',
  employeeAuthToken,
  async(req,res)=>{
    const { id } = req.params;
    const { addAmount } = req.body;

    try {
      // Get the user's email from the decoded token
      const { EmpEmail } = req.user;
      const affdetails =await Users.findById({_id :id})

      // Find the user in the database
      const user = await Employees.findOne({ EmpEmail });
      if (!user) {
        return res.status(404).json({ message: "Employee not found" });
      }

      // Find the affiliate by ID
      const affiliate = await Users.findById(id);
      if (!affiliate) {
        return res.status(404).json({ message: "Affiliate not found" });
      }

      // Update the affiliate's fields
      const updatedamount = parseFloat(addAmount);
      affiliate.totalAmount += updatedamount;

      // Save the updated affiliate
      await affiliate.save();

      await mailforamountincreementupdate( affdetails , user ) 
      res.status(200).json({ message: "Affiliate amount has been updated successfully" });
    } catch (error) {
      console.error("Error updating affiliate:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);



export default router;
