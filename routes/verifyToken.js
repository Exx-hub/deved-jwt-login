const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
	const token = req.header("auth-token");

	// console.log(token);

	if (!token) return res.status(401).send("Access denied");

	try {
		const verifiedUser = jwt.verify(token, process.env.TOKEN_SECRET);
		console.log(verifiedUser);
		req.user = verifiedUser;
		console.log(req.user);
		next(); // to go to the next middle ware
	} catch (err) {
		res.status(400).send("invalid token");
	}
};

// in the jwt verify method, you will provide the encrpyted token and the same secret
// you used when you created the token and it will return whatever value you hid
// in the token, in this case it is the user id. you will then add that user id
// in the req headers as req.user. and call next function which will move to the
// next middleware.
