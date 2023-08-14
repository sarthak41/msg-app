const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const user = require("../models/user");
require("dotenv").config();

exports.signUp = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!email || !username || !password){
      return res.status(400).json({ message: "Field(s) required" });
    }

    let userExists = await User.findOne({ email });
    if (userExists)
      return res.status(409).json({ message: "- already in use", type: "email" });

    userExists = await User.findOne({username});
    if (userExists)
      return res.status(409).json({ message: "- username is taken", type: "username" });

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
  passport.authenticate('local', {session: false}, (err, user, info) => {
    if (err || !user) {
      return res.status(401).json({message: info.message, type: info.type});
    }

    req.login(user, {session: false}, (err) => {
      if (err) return next(err);

      const token = jwt.sign(
        {_id: user._id, username: user.username, email: user.email}, 
        process.env.JWT_SECRET, 
        {expiresIn: "3d"}, (err, token) => {
          if (err) return next(err);
          return res.status(200).json({_id: user._id, email: user.email, username: user.username, color: user.color, token, bio: user.bio});
      });
    });
  })(req, res, next);
};

exports.setBio = async (req, res, next) => {
  try {
    const {bio} = req.body;
    console.log(bio);

    const user = await User.findByIdAndUpdate(req.user._id, { bio }, { new: true });

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
}

exports.setColor = async (req, res, next) => {
  try {
    const {color} = req.params;

    const user = await User.findByIdAndUpdate(req.user._id, { color }, { new: true });

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
}

exports.verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}