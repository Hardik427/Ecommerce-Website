const express = require('express');
const User = require('./user.model');
const generateToken = require('../middleware/generateToken');
const router = express.Router();

//Register Route
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = User({ username, email, password });
        await user.save();
        console.log(req.body);
        res.status(201).send({ message: "User Registered successfully!" })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error Registering User" })
    }
})
//Login Route
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            res.status(404).send({ message: "You are not Registered" });
        }
        const isMatch = await user.comparePassword(password)
        if (!isMatch) {
            res.status(401).send({ message: "Unauthorized Access" });
        }

        const token = await generateToken(user._id);
        console.log(token);
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        });
        res.status(200).send({ message: "Logged In Successfull!", token, user })

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error Logging In User" })
    }
})



module.exports = router;

//7:12