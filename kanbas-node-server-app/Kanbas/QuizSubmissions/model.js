import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("SubmissionModel", schema);
export default model;