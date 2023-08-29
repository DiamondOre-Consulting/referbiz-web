import express, { Router } from "express";
import multer from "multer";
import path from "path";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// Define storage options for Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Specify the directory where you want to store the uploaded files
      cb(
        null,
        "ResumeBuildingCVs"
      );
    },
    filename: function (req, file, cb) {
      // Set the file name to be the original name of the uploaded file
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
    },
  });
  
  // Create the Multer upload instance
  const upload = multer({ storage: storage });

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "harshkr2709@gmail.com",
    pass: "frtohlwnukisvrzh",
  },
});

router.post("/resume-building", upload.single("document"), async (req, res) => {
  try {
    const userName = req.body.name;
    const userEmailAddress = req.body.email; // Assuming the form has an email input
    const userPhone = req.body.phone;
    const documentPath = req.file.path;

    // Compose the email
    const mailOptions = {
      from: "Harsh Jha <harsh.diamondore@gmail.com>",
      to: "sweetyjha.rasonline@gmail.com",
      subject: `New CV Received from ${userName}`,
      text: `A new Resume has been submitted by ${userName}. Email id is ${userEmailAddress}`,
      html: `<h3 style="font-size:1.7rem; display:flex; justify-content: center;">A new Resume has been submitted by <span style="font-size:2rem;">"${userName}"</span></h3> </br>
                <h4 style="font-size:1.7rem; display:flex; justify-content: center;">Email Id: ${userEmailAddress}</h4> </br>
                <h4 style="font-size:1.7rem; display:flex; justify-content: center;">Phone No: ${userPhone}</h4>`,
      attachments: [
        {
          filename: "document.pdf",
          path: documentPath,
        },
      ],
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).send("Error sending email");
      } else {
        console.log("Email sent:", info.response);
        res.status(200).send({message: "Email sent successfully!!!"});
      }
    });

    // res.status(201).json({ message: "CV Sent Successfully!!!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

export default router;
