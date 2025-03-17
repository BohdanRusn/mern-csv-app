import express from "express";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post("/login", async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  try {
    const hardcodedUser = {
      userId: "1",
      username: "admin",
      password: "password123",
    };

    if (username !== hardcodedUser.username) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    if (password !== hardcodedUser.password) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const payload = {
      user: {
        userId: hardcodedUser.userId,
        username: hardcodedUser.username,
      },
    };

    const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
    jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
router.get("/user", auth, (req: Request, res: Response): void => {
  try {
    res.json(req.user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
