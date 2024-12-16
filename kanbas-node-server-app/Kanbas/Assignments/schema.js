import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => new mongoose.Types.ObjectId().toString(),
    },
    title: String,
    description: String,
    availableDateTime: String,
    dueDateTime: String,
    description: String,
    points: Number,
    course: { type: mongoose.Schema.Types.String, ref: "CourseModel" },
  },
  { collection: "assignments" }
);
export default schema;