import jwt from "jsonwebtoken"
import { User } from "../models/User.js"
import bcrypt from "bcrypt"

import { SECRET_ACCESS_TOKEN } from "../config/index.js";


export const Signup = async (req, res) => {
    console.log("req body: ", req.body)
    const {firstName, lastName, userName, email, password} = req.body
    try{

        // Check if user already exists
        const existingEmail = await User.findOne({ email });
        console.log(existingEmail)
        if (existingEmail)
            return res.status(400).json({
                status: "failed",
                data: [],
                message: "It seems you already have an account, please log in instead.",
            });
        
        const existingUserName = await User.findOne({ userName });
        if (existingUserName)
            return res.status(400).json({
                status: "failed",
                data: [],
                message: "Username already taken. Try another username.",
            });
            

        const salt = await bcrypt.genSalt(10, async (error, salt) => {
            if(error) console.log("salt Error: ", error)
        
            console.log("salt: ", salt);
        
            const hashedPassword = bcrypt.hash(password, salt, async (error, hash) => {
                    if(error) console.log("hashedPasswordError: ", error)
                

                const newUser = new User(
                    {
                        firstName: firstName,
                        lastName: lastName,
                        userName: userName,
                        email: email,
                        password: hash
                    }
                )
                    const savedUser = await newUser.save();
                    const {password, ...savedData} = savedUser._doc
                    
                    res.status(200).json({
                        status: "success",
                        data: [savedData],
                        message:
                            "Thank you for registering with us. Your account has been successfully created.",
                    })
            })
        
        })    
    }catch(error){
        console.log("Error: ", error);
        res.status(500).json({
            status: "failed",
            data: [],
            message: "Internal Server Error",
        })
    }
}

export const Login = async (req, res) => {
    const {email} = req.body;
    console.log("email: ", email)
    console.log("Login API initiated")

    try{
        const isExistingUser = await User.findOne({ email });
        console.log("Existing User: ",isExistingUser);

        if (!isExistingUser){
            return res.status(401).json({
                status: "failed",
                data: [],
                message: "Invalid Email",
            });
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, isExistingUser.password);
        console.log("isPasswordValid: ", isPasswordValid);

        if (!isPasswordValid){
            return res.status(400).json({
                status: "failed",
                data: [],
                message: "Invalid Password",
            });
        }

        const {password, ...savedData} = isExistingUser._doc
        console.log("savedData: ", savedData);

        let options = {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // would expire in 2minutes
            httpOnly : true, // Ensures cookie is inaccessible via JavaScript( if set to true)
            secure : false, // Cookie only sent over HTTPS (use in production)
            sameSite : 'Lax' // Cookie sent in cross-site requests
            };

            // Set httpOnly to false
            

        const token = jwt.sign({ id: savedData._id }, SECRET_ACCESS_TOKEN); 
        console.log("loginToken: ", token)

        res.cookie("SessionID", token, options);
        res.status(200).json({
            status: "success",
            message: "You have successfully logged in.",
        });

    }catch(error){
        console.log("Error: ", error);
        res.status(500).json({
            status: "failed",
            data: [],
            message: "Internal Server Error",
        })
    }
}

export const Logout = async (req, res) => {
    
}