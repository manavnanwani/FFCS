import Student from "../models/student.js";

export const signin = async (req, res) => {
  const { regNo: regNo } = req.params;

  try {
    const existingUser = await Student.find({ regNo: regNo });

    if (!existingUser)
      return res.status(404).json({ message: "User does not exist " });
    return res
      .status(200)
      .json({ name: existingUser[0].name, regNo: existingUser[0].regNo });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { regNo, password, name } = req.body;
  try {
    const existingUser = await Student.findOne({ regNo });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const result = await Student.create({
      regNo,
      password,
      name,
    });

    return res.status(200).json({ name: result.name, regNo: result.regNo });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
