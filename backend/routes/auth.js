const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get(
	"/google",
	passport.authenticate("google", { scope: ["profile", "email"] }),
);

router.get(
	"/google/callback",
	passport.authenticate("google", { failureRedirect: "/" }),
	(req, res) => {
		const userData = req.user;
		return userData;
		res.redirect("http://localhost:5173/dashboard");
	},
);

router.get("/logout", (req, res) => {
	req.logout();
	res.redirect("/");
});

module.exports = router;
