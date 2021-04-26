// const router = require('express').Router(); // just chaining. but better to be explicit..
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { registerValidation, loginValidation } = require("../validation");

// REGISTER ----

router.post("/register", async (req, res) => {
	//  VALIDATION OF DATA FROM USER
	const { error } = registerValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	// CHECK IF USER IS ALREADY IN DATABASE
	const userExists = await User.findOne({ email: req.body.email });
	if (userExists) return res.status(400).send("Email already exists.");

	// HASH THE PASSWORD
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(req.body.password, salt);

	// CREATE NEW USER
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: hashedPassword,
	});

	try {
		// save user if no errors
		const savedUser = await user.save();
		res.send({
			message: "User SAVED",
			data: { userId: savedUser._id },
		});
	} catch (err) {
		// catch error if cannot save user
		res.status(400).send(err);
	}
});

// LOGIN ----

router.post("/login", async (req, res) => {
	//  VALIDATION OF DATA FROM USER
	const { error } = loginValidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	// CHECK IF USER IS ALREADY REGISTERED
	const user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(400).send("User not yet registered");

	// CHECK IF PASSWORD IS CORRECT
	const validPassword = await bcrypt.compare(req.body.password, user.password);
	if (!validPassword) return res.status(400).send("invalid password!");

	// CREATE AND ASSIGN A TOKEN
	const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
	// create a token with any property you want, in this case the id.
	// it's like you will hide the id , combine a secret to it and
	// this will convert it or will hide your id in a token
	// which can then be unwrapped using verify and will give you
	// the id again as long as you provide the correct secret.
	// console.log(token);

	res.header("auth-token", token).send(token);
});

module.exports = router;

// ------------ call back way to do it non-async await --------
// user.save((err, savedUser) => {
// 	res.send({
// 		message: "user saved",
// 		data: savedUser,
// 	});
// });
