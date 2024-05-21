import express from 'express';
import Lead from '../Models/Lead.js';
import nodemailer from 'nodemailer';
import otpStore from "../server.js";

const router = express.Router();

// Generate a random OTP
// const generateOTP = () => {
//     return Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
// };

// Send OTP via email using Nodemailer
// const sendOTPByEmail = async (email, otp) => {
//     try {
//         const transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 user: 'harshkr2709@gmail.com',
//                 pass: 'frtohlwnukisvrzh', // Consider using environment variables for sensitive information
//             },
//         });

//         const mailOptions = {
//             from: 'ReferBiz.com <harshkr2709@gmail.com>',
//             to: `Recipient <${email}>`,
//             subject: 'One Time Password',
//             text: `Your OTP is: ${otp}`,
//             html: `<h1 style="color: red;">Refer<span>Biz</span></h1> and OTP is: ${otp}`,
//         };

//         const info = await transporter.sendMail(mailOptions);
//         console.log('Email sent: ' + info.response);
//     } catch (error) {
//         console.error('Error sending OTP:', error);
//         throw error;
//     }
// };




// router.post('/send-otp', async (req, res) => {
//     try {
//         const { email } = req.body;
//         console.log(req.body);

//         // Generate and store OTP
//         const otp = generateOTP();
//         otpStore[email] = otp;  // Store OTP for the email

//         console.log(email);
//         console.log("otpStore: ", otpStore[email]);

//         // Send OTP via email
//         await sendOTPByEmail(email, otp);

//         console.log("otpStore:", otpStore[email]);
//         const storedemailotp = otpStore[email];
//         if (!storedemailotp) {
//             return res.status(406).json({ message: "incorrect emailId" })
//         }

//         res.status(201).json({ message: "OTP sent successfully" });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "An error occurred" });
//     }
// });



// Lead form submission and OTP generation
router.post('/lead-form', async (req, res) => {
    const {name, email, phone, leadfor, summery } = req.body;

    // Validate request data
    if (!name || !email || !phone || !leadfor || !summery) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try { 

        // Save lead to the database
        const lead = new Lead({
            name,
            email,
            phone,
            leadfor,
            summery,
        });

        await lead.save();

        // Clear OTP from store
       

        res.status(200).json({ message: 'Lead submitted successfully.', lead });
    } catch (error) {
        console.error('Error processing lead form:', error);
        res.status(500).json({ message: 'Server error. Please try again later.', error });
    }
});



export default router;
