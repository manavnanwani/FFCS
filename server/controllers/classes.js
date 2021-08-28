import Classes from "../models/classes.js";

export const getCourse = async (req, res) => {
  const { id: courseCode } = req.params;
  console.log(courseCode);
};
