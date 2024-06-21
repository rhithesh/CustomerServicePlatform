const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const customerServiceRoutes = require("./routes/customerService");
const cors = require("cors");

dotenv.config();

const app = express();

// Database connection

mongoose
	.connect("mongodb://localhost:27017/new", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("MongoDB connected"))
	.catch((err) => console.log(err));
app.use(
	cors({
		origin: "http://localhost:3000",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	}),
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Passport config
require("./config/passport");

app.get("/", (req, res) => {
	res.send('<a href="/auth/google">Login with Google</a>');
});

app.use(
	session({
		secret: "secret",
		resave: true,
		saveUninitialized: true,
	}),
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.use("/customer-service", customerServiceRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
