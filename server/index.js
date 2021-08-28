import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import studentRoutes from "./routes/student.js";
import classesRoutes from "./routes/classes.js";
import classRoutes from "./routes/class.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/student", studentRoutes);
app.use("/classes", classesRoutes);
app.use("/class", classRoutes);

const PORT = 5000;

mongoose
  .connect(
    "mongodb+srv://Admin:motorq@cluster0.an3be.mongodb.net/MotorQ?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((err) => console.log(err.message));

// mongoose.set("useFindAndModify", false);
