import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { AuthPayload } from "../types/index.js";

export const auth = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header("x-auth-token");

  if (!token) {
    res.status(401).json({ message: "No token, authorization denied" });
    return;
  }

  try {
    const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
    const decoded = jwt.verify(token, JWT_SECRET) as AuthPayload;

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};
