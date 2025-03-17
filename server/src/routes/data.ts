import express from "express";
import type { Request, Response } from "express";
import multer from "multer";
import csvtojson from "csvtojson";
import { auth } from "../middleware/auth.js";
import Data from "../models/Data.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "text/csv" || file.originalname.endsWith(".csv")) {
      cb(null, true);
    } else {
      cb(new Error("Тільки CSV файли дозволені"));
    }
  },
});

// @route   GET api/data
// @desc    Get all data
// @access  Private
router.get("/", auth, async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await Data.find();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   POST api/data/upload
// @desc    Upload CSV and save to database
// @access  Private
router.post(
  "/upload",
  [auth, upload.single("file")],
  async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.file) {
        res.status(400).json({ message: "No file uploaded" });
        return;
      }

      const csvData = req.file.buffer.toString();

      const jsonData = await csvtojson({
        checkType: true,
        delimiter: [",", ";", "\\t"],
        ignoreEmpty: true,
      }).fromString(csvData);

      if (jsonData.length === 0) {
        res.status(400).json({ message: "CSV file is empty or invalid" });
        return;
      }

      await Data.deleteMany({});

      await Data.insertMany(jsonData);

      res.json({
        message: "File uploaded and data saved successfully",
        count: jsonData.length,
      });
    } catch (err: any) {
      console.error(err);
      res
        .status(500)
        .json({ message: err.message || "Server error during file upload" });
    }
  },
);

export default router;
