import userModel from "../Models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { SECRET_KEY } from "../config.js";

export const Signup = async (req, res) => {
  try {
    //getting user from req body
    const { name, age, gender, email, password, phoneNo } = req.body;

    if (!name || name.length < 3) {
      return res
        .status(400)
        .json({ message: "Name must be at least 3 characters long" });
    }

    if (age <= 0) {
      return res.status(400).json({ message: "Age must be a positive number" });
    }

    if (!["Male", "Female", "Other"].includes(gender)) {
      return res
        .status(400)
        .json({ message: "Gender must be Male, Female, or Other" });
    }

    if (!email.endsWith("@gmail.com")) {
      return res
        .status(400)
        .json({ message: "Email must end with @gmail.com" });
    }

    if (password.length < 10) {
      return res
        .status(400)
        .json({ message: "Password must be at least 10 characters long" });
    }

    if (!/^\d{10}$/.test(phoneNo)) {
      return res
        .status(400)
        .json({ message: "Phone number must be exactly 10 digits" });
    }

    //Check if the user Exists ->
    const existUser = await userModel.findOne({ email });
    if (existUser) {
      return res.status(400).json({
        message:
          "User Already Exists with this email please try another email to Signup!",
      });
    }
    //hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //creating a new user
    const newUser = await userModel.create({
      name,
      age,
      gender,
      email,
      password: hashedPassword,
      phoneNo,
    });

    //checking if the user is saved or not
    if (!SECRET_KEY) {
      throw new Error("SECRET_KEY is not defined in environment variables");
    }
    //jsonweb token
    const token = jwt.sign(
      { email: newUser.email, password: newUser.password, id: newUser._id },
      SECRET_KEY,
      { expiresIn: "24h" }
    );
    // Set cookie
    res.cookie("token", token, {
      httpOnly: true, // cannot be accessed by JS
      secure: false, // HTTPS only in production
      sameSite: "lax", // protect against CSRF
      maxAge: 24 * 60 * 60 * 1000, // 24h in ms
    });

    //save the token into cookies or session
    res.status(200).json({
      message: "User Saved Successfully!",
      user: { id: newUser._id, name: newUser.name, email: newUser.email },
      token
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something Went wrong", error: err.message });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await userModel.findOne({ email: email.trim() });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Compare password (FIX: Added await)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    if (!SECRET_KEY) {
      // It's good that you check this!
      throw new Error("SECRET_KEY is not defined in environment variables");
    }

    // jsonweb token (FIX: Removed 'password' from the payload)
    const token = jwt.sign({ email, id: user._id }, SECRET_KEY, {
      expiresIn: "24h",
    });

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure:true in production
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "User Login Successfully!",
      user: { id: user._id, name: user.name, email: user.email },
      token, // You can return the token too, but the primary method is the cookie
    });
  } catch (err) {
    // Note: Logging the full err object on the server is helpful for debugging
    console.error("Login error:", err); 
    res
      .status(500)
      .json({ message: "Something Went wrong", error: err.message });
  }
};

export const logOut = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something Went wrong", error: err.message });
  }
};
