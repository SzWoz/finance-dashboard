import express from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const user = new User({ email, password });
  await user.save();
  res.status(201).json({ message: "Zarejestrowano" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password)))
    return res.status(400).json({ message: "Błędne dane logowania" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
  res.json({ token });
});

export default router;
