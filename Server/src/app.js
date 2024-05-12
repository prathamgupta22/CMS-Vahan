import express from "express";
import { router as studentRoute } from "./routes/student.routes.js";

//rest object
const app = express();

//middleware
app.use(express.json());

//declare route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to entity table",
  });
});

app.use("/api/v1/student", studentRoute);

export { app };
