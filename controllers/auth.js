import jwt from "jsonwebtoken";

import { User } from "../models/user.js";
import { Profile } from "../models/profile.js";

async function signup(req, res) {
  try {
    if (!process.env.SECRET) throw new Error("no SECRET in back-end .env");
    if (!process.env.CLOUDINARY_URL) {
      throw new Error("no CLOUDINARY_URL in back-end .env file");
    }

    const user = await User.findOne({ email: req.body.email });
    if (user) throw new Error("Account already exists");

    const newProfile = await Profile.create(req.body);
    req.body.profile = newProfile._id;
    const newUser = await User.create(req.body);

    const token = createJWT(newUser);
    res.status(200).json({ token });
  } catch (error) {
    console.error("An error occured", error);
    try {
      if (req.body.profile) {
        await Profile.findByIdAndDelete(req.body.profile);
      }
    } catch (error) {
      console.error("An error occured", error);
      return res.status(500).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
}

async function login(req, res) {
  try {
    if (!process.env.SECRET) throw new Error("no SECRET in back-end .env");
    if (!process.env.CLOUDINARY_URL) {
      throw new Error("no CLOUDINARY_URL in back-end .env");
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error("User not found");

    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) throw new Error("Incorrect password");

    const token = createJWT(user);
    res.json({ token });
  } catch (error) {
    handleAuthError(error, res);
  }
}

async function changePassword(req, res) {
  try {
    const user = await User.findById(req.user._id);
    if (!user) throw new Error("User not found");

    const isMatch = user.comparePassword(req.body.password);
    if (!isMatch) throw new Error("Incorrect password");

    user.password = req.body.newPassword;
    await user.save();

    const token = createJWT(user);
    res.json({ token });
  } catch (error) {
    handleAuthError(error, res);
  }
}

/* --== Helper Functions ==-- */

function handleAuthError(error, res) {
  console.error("An error occured", error);
  const { message } = error;
  if (message === "User not found" || message === "Incorrect password") {
    res.status(401).json({ error: message });
  } else {
    res.status(500).json({ error: message });
  }
}

function createJWT(user) {
  return jwt.sign({ user }, process.env.SECRET, { expiresIn: "24h" });
}

export { signup, login, changePassword };
