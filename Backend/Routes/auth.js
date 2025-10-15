import passport from "../Auth/passport.js";
import jwt from "jsonwebtoken";
import express from 'express';

const authRoutes = express.Router();

// Step 1: Redirect user to Google
authRoutes.get("/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Step 2: Google redirects back here
authRoutes.get("/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const user = req.user;
    
    if (!process.env.SECRET_KEY) {
      throw new Error("SECRET_KEY is not defined in environment variables");
    }

    // Generate JWT for OAuth user
    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.SECRET_KEY,
      { expiresIn: "24h" }
    );
    // Set cookie
        res.cookie("token", token, {
        httpOnly: true,  // cannot be accessed by JS
        secure: process.env.NODE_ENV === "production", // HTTPS only in production
        sameSite: "strict", // protect against CSRF
        maxAge: 24 * 60 * 60 * 1000 // 24h in ms
        });

    // Send same response structure as normal login
    // res.status(200).json({
    //   message: "Logged in with Google successfully",
    //   user: { id: user._id, name: user.name, email: user.email }
    // });

    res.redirect("http://localhost:5173/");
  }
);

export default authRoutes;