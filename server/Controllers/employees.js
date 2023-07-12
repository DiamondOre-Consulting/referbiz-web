import express, { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import multer from "multer";
import path from 'path';
import authenticateToken from "../Middlewares/authenticateToken.js";
import Employees from "../Models/Employees.js";
dotenv.config();

const secretKey = process.env.JWT_SECRET;

const router = express.Router();

router.post("/employee-signup", async (req, res) => {
    const { EmpName, EmpEmail, password, myAsso } = req.body;
  
    try {
      // Check if user already exists
      const userExists = await Employees.exists({ email });
      if (userExists) {
        return res.status(409).json({ message: "User already exists" });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user object
      const newUser = new Employees({
        EmpName,
        EmpEmail,
        password: hashedPassword,
      });
  
      // Save the user to the database
      await newUser.save();
  
      return res
        .status(201)
        .json({ message: "Employee created successfully" });
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });