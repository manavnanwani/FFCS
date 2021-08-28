import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
  name: { type: String, required: true },
  regNo: { type: String, required: true },
  password: { type: String, required: true },
  selectedCourses: { type: Array },
  bookedSlots: { type: Array },
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
