const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
require("dotenv").config();

exports.signUp = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!email || !username || !password)
      return res.status(400).json({ message: "One or more fields missing." });

    const userExists = await User.findOne({ email });
    console.log(userExists);
    if (userExists)
      return res.status(409).json({ message: "Email already in use." });

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username, email, password: encryptedPassword
    });

    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
};

exports.login = async (req, res, next) => {
  passport.authenticate('local', {session: false}, (err, user) => {
    if (err || !user) {
      return res.status(401).json({message: "Authentication failed"});
    }

    req.login(user, {session: false}, (err) => {
      if (err) return next(err);

      const token = jwt.sign(
        {sub: user._id}, 
        process.env.JWT_SECRET, 
        {expiresIn: "3d"}, (err, token) => {
          if (err) return next(err);
          return res.status(200).json({user, token})
      });
    });
  })(req, res, next);
};