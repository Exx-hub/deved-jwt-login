require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const port = process.env.PORT || 3000;

// Connect to DB
mongoose.connect(process.env.DB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
});

const db = mongoose.connection;
db.on("error", () => console.log("cannot connect do database"));
db.once("open", () => console.log("connected to database successfully!"));

// Middlewares
app.use(express.json());

// Import routes
const authRoute = require("./routes/auth");
const postsRoute = require("./routes/posts");

// Route middlewars
app.use("/api/users", authRoute);
app.use("/api/posts", postsRoute); // protected route

app.get("/", (req, res) => {
	res.send("root route!");
});

app.listen(port, () => console.log(`Server listening on ${port}`));

// undefined user when token is input....fix this
