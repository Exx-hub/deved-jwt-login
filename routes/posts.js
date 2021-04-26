const express = require("express");
const router = express.Router();

const verify = require("./verifyToken");

router.get("/", verify, (req, res) => {
	res.send(req.user);
});

module.exports = router;

// this is a another route and you are protecting it using the verify middleware.
// this middleware will check the req.headers if there is a token, whatever you named the token, in this case "auth-token"
// if there is not token it will return a 401
// if there is a token,
// jwt will user verify method to unwrap that token to whatever you hid inside it
// considering you will provide the correct secret.
// if secret is correct it will return whatever you hid inside the token
// in this case , the ID of the user. and then proceed with the next middleware becuase of the next function call. in this case you now have access to the id which was hidden in the token which you can use to find data in your database etc...
