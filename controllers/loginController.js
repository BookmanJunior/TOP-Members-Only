const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username }).exec();

      if (!user) {
        return done(null, false, { message: "Username not found." });
      }

      const isValidPassword = await user.validatePassword(password);

      if (!isValidPassword) {
        return done(null, false, { message: "Incorrect password." });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

exports.login_post = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    try {
      if (err || !user) {
        return res.send(info);
      }

      req.logIn(user, { session: false }, (err) => {
        if (err) return res.sendStatus(401);
      });
      const body = { _id: user._id, username: user.username };
      const token = jwt.sign({ user: body }, process.env.SECRET_TOKEN_KEY, {
        expiresIn: "10m",
      });

      const expirationDate = new Date();

      const cookieOptions = {
        secure: true,
        httpOnly: true,
        maxAge: expirationDate.setDate(expirationDate.getDate() + 7),
      };

      res.cookie("jwt-token", token, cookieOptions);

      return res.json({ token });
    } catch (err) {
      return res.sendStatus(401);
    }
  })(req, res, next);
};
