import mongoose from "mongoose";

const classesSchema = mongoose.Schema({
  courseCode: { type: String, required: true },
  courseName: { type: String, required: true },
  faculty: { type: String, required: true },
  time: { type: String, required: true },
  building: { type: String, required: true },
});

const Classes = mongoose.model("Classes", classesSchema);

export default Classes;
