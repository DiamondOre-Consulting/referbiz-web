import express from 'express';
import Lead from '../Models/Lead.js';
import nodemailer from 'nodemailer';
import otpStore from "../server.js";

const router = express.Router();

const sendEmail = async (formData) => {
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
            to: "hr@diamondore.in",
            subject: `New Lead from ${formData.name}`,
            text: `You have a new contact form submission:\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nLeadFor: ${formData.leadfor}\nSummery: ${formData.summery}`,
            html: `
                <p>You have a new Lead From:</p>
                <p><strong>Name:</strong> ${formData.name}</p>
                <p><strong>Email:</strong> ${formData.email}</p>
                <p><strong>Phone:</strong> ${formData.phone}</p>
                <p><strong>LeadFor:</strong> ${formData.leadfor}</p>
                <p><strong>Message:</strong> ${formData.summery}</p>   
            `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};


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

        await sendEmail({ name, email, phone, leadfor , summery });
        res.status(200).json({ message: 'Lead submitted successfully.', lead });
    } catch (error) {
        console.error('Error processing lead form:', error);
        res.status(500).json({ message: 'Server error. Please try again later.', error });
    }
});



export default router;
