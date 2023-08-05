const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const jwtSecret = process.env.JWT_SECRET;

passport.use(
  new LocalStrategy(
    {usernameField: "email"},
    async (email, password, done) => {
      try {
        const user = await User.findOne({email});

        if (!user) {
          return done(null, false, {message: "Incorrect Email"});
        }

        const isCorrectPass = await bcrypt.compare(password, user.password);
        if (!isCorrectPass) {
          return done(null, false, {message: "Incorrect password"});
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret
};

passport.use(
  new JwtStrategy(jwtOpts, async (payload, done) => {
    try {
      const user = await User.findById(payload.sub);

      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);