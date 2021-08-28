import Classes from "../models/classes.js";
import Student from "../models/student.js";

export const generate = async (req, res) => {
  const { id: studentId } = req.params;
  const student = await Student.findById(studentId);

  const searchResults = student.selectedCourses;
  Array.prototype.sortBy = function (p) {
    return this.slice(0).sort(function (a, b) {
      return a[p] > b[p] ? 1 : a[p] < b[p] ? -1 : 0;
    });
  };
  const newArr = await searchResults.sortBy("courseCode");
  const arr1 = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const arr2 = ["", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const changeDate = (initialDay) => {
    const initialDate = arr2.findIndex((element) => element === initialDay);
    const d = new Date();
    d.setDate(d.getDate() + ((((7 - d.getDay()) % 7) + initialDate) % 7));
    const arr = d.toString().split(" ");
    const month = arr1.findIndex((element) => element === arr[1]);
    const fin = month + 1 < 10 ? `0${month + 1}` : `${month + 1}`;
    return `${arr[3]}-${fin}-${arr[2]}`;
  };

  var finalArr = [];
  newArr.map((c) => {
    const obj = {
      title: `${c.courseName} at ${c.time.split(" ")[1].split("-")[0]} till ${
        c.time.split(" ")[1].split("-")[1]
      } in ${c.building}`,
      date: changeDate(c.time.split(" ")[0]),
    };
    finalArr.push(obj);
  });

  return res.status(200).json({ finalArr: finalArr });
};

export const getAllCourse = async (req, res) => {
  const { id: studentId } = req.params;
  const student = await Student.findById(studentId);

  const searchResults = student.selectedCourses;
  Array.prototype.sortBy = function (p) {
    return this.slice(0).sort(function (a, b) {
      return a[p] > b[p] ? 1 : a[p] < b[p] ? -1 : 0;
    });
  };
  const newArr = await searchResults.sortBy("courseCode");

  if (newArr.length > 0)
    return res.status(200).json({ selectedCourses: newArr });
  else return res.status(201).json({ message: "No courses added!" });
};

export const addCourse = async (req, res) => {
  const { id: studentId } = req.params;
  const course = req.body;
  const student = await Student.findById(studentId);

  const index = student.selectedCourses.findIndex(
    (c) => c._id === String(course._id)
  );
  if (index !== -1)
    return res.status(201).json({ message: "Course Already Added" });

  const index1 = await student.bookedSlots.findIndex(
    (time) => time === String(course.time)
  );
  if (index1 !== -1) {
    const clashedCourse = await Classes.findById(
      student.selectedCourses[index1]
    );
    return res
      .status(201)
      .json({ message: `Course Clash with ${clashedCourse.courseName}` });
  }

  student.bookedSlots.push(course.time);

  student.selectedCourses.push(course);
  const updatedStudent = await Student.findByIdAndUpdate(studentId, student, {
    new: true,
  });

  course.numOfStudents.push(studentId);
  const updatedClasses = await Classes.findByIdAndUpdate(course._id, course, {
    new: true,
  });

  res.status(200).json({ message: "Course Added" });
};

export const deleteCourse = async (req, res) => {
  const { courseId: courseId, studentId: studentId } = req.params;
  const student = await Student.findById(studentId);
  const course = await Classes.findById(courseId);

  student.selectedCourses = student.selectedCourses.filter(
    (c) => c._id !== String(courseId)
  );
  student.bookedSlots = student.bookedSlots.filter(
    (c) => c !== String(course.time)
  );

  const updatedStudent = await Student.findByIdAndUpdate(studentId, student, {
    new: true,
  });

  course.numOfStudents = course.numOfStudents.filter(
    (c) => c !== String(studentId)
  );

  const updatedClasses = await Classes.findByIdAndUpdate(course._id, course, {
    new: true,
  });

  res.status(200).json(updatedStudent.selectedCourses);
};
