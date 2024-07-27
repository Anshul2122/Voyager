const express = require('express');
const { check, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const verifyToken = require("../middleware/auth");
const router = express.Router();


router.post("/login", [
    check("email", "email is required").isEmail(),
    check("password", "password with 6 or more characters").isLength({ min: 6 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) { 
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) { 
            return res.status(400).json({ message: "incorrect passworod" });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
        });
        console.log("login successful");
        return res.status(200).json({ message: "login successfull" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message:"something went wrong"});
    }
});


router.post("/logout", (req, res) => {
    res.cookie("auth_token", "", {
        expires: new Date(0)
    });
    res.sendStatus(200);
});

router.get("/validate-token", verifyToken, (req, res) => {
    res.status(200).send({ userId: req.userId });
})

module.exports = router;