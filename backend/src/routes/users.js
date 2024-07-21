const express = require('express');
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { check, validationResult} = require("express-validator");


// api/users/register
router.post("/register", [
    //validation on input fields
    check("firstName", "first name is required").isString(),
    check("lastName", "last name is required").isString(),
    check("email", "email is required").isString(),
    check("password", "password with 6 or more characters").isLength({ min: 6 }),
],
    async (req, res) => {
        // checking for the errors in the validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array()});
        }
    try {
        let user = await User.findOne({
            email: req.body.email,
        });
        if (user) { 
            return res.status(400).json({message: "user already exists"});
        }
        user = new User(req.body);
        user = await user.save();

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
        
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 640800000,
        })

        res.status(200).json({ message: "user register successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "something went wrong" });
    }
})


module.exports=router