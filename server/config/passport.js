import * as dotenv from "dotenv";

import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";

import User from "../models/usersModel.js";

dotenv.config();

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_OR_KEY,
};

const jwtStrategy = new JwtStrategy(jwtOptions, function (jwt_payload, done) {
  User.findOne({ _id: jwt_payload.sub }, function (err, user) {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
      // or you could create a new account
    }
  });
});

const passportConfig = (passport) => {
  passport.use(jwtStrategy);
};

export { passportConfig };
