import mongoose from "mongoose";
import type { DataItem } from "../types/index.js";

export interface DataDocument extends DataItem, mongoose.Document {}

const DataSchema = new mongoose.Schema(
  {},
  {
    strict: false,
    timestamps: true,
  },
);

export default mongoose.model<DataDocument>("Data", DataSchema);
