import Classes from "../models/classes.js";
import Student from "../models/student.js";

export const getAllCourses = async (req, res) => {
  const searchResults = await Classes.find();
  return res.status(200).json({ searchResults });
};

export const getCourse = async (req, res) => {
  const { id: courseCode } = req.params;
  const searchResults = await Classes.find({ courseCode: courseCode });
  if (searchResults.length > 0) {
    return res.status(200).json({ searchResults });
  }
  return res.status(201).json({ message: "No courses found" });
};
