import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import userModel from "../Models/user.model.js"; // adjust path to your user model
import {GOOGLE_CLIENT_SECRET, GOOGLE_CLIENT_ID } from "../config.js";

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID ,       // from Google Cloud
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback", // must match in Google console
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // find or create user in DB
      let user = await userModel.findOne({ email: profile.emails[0].value });
      if (!user) {
          user = await userModel.create({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id
        });
      }

    return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
));

export default passport;
