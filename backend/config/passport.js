const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	try {
		let user = await User.findById(id);
		done(null, user); // Passes the user object to the next middleware
	} catch (err) {
		done(err, null); // Passes the error to the next middleware
	}
});

passport.use(
	new GoogleStrategy(
		{
			clientID: "",
			clientSecret: "",
			callbackURL: "/auth/google/callback",
		},
		async (accessToken, refreshToken, profile, done) => {
			try {
				// Check if the user already exists in your database
				let user = await User.findOne({ googleId: profile.id });

				if (user) {
					// If user already exists, return the user
					return done(null, user);
				} else {
					// Create a new user if not found
					const newUser = new User({
						googleId: profile.id,
						displayName: profile.displayName,
						email: profile.emails[0].value,
						accessToken: accessToken,
					});

					// Save the new user to the database
					await newUser.save();

					// Return the newly created user
					return done(null, newUser);
				}
			} catch (err) {
				// Handle any errors
				return done(err);
			}
		},
	),
);
