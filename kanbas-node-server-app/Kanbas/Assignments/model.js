import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("AssignementModel", schema);
export default model;