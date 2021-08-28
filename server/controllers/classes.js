import Classes from "../models/classes.js";

export const getAllCourses = async (req, res) => {
  const searchResults = await Classes.find();
  Array.prototype.sortBy = function (p) {
    return this.slice(0).sort(function (a, b) {
      return a[p] > b[p] ? 1 : a[p] < b[p] ? -1 : 0;
    });
  };
  const newArr = await searchResults.sortBy("courseCode");
  return res.status(200).json({ searchResults: newArr });
};

export const getCourse = async (req, res) => {
  const { id: courseCode } = req.params;
  const searchResults = await Classes.find({ courseCode: courseCode });
  if (searchResults.length > 0) {
    return res.status(200).json({ searchResults });
  }
  return res.status(201).json({ message: "No courses found" });
};
