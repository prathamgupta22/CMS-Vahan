import express from "express";
import {
  getStudents,
  getStudentById,
  addStudent,
  removeStudent,
  updateStudent,
} from "../controllers/student.controller.js";

const router = express.Router();

// Route to get all students
router.get("/", getStudents);
router.get(
  "/:id",
  (req, res, next) => {
    const { id } = req.params;
    if (!Number.isInteger(parseInt(id))) {
      return res.status(400).json({ error: "Invalid student ID" });
    }
    next();
  },
  getStudentById
);
router.post("/", addStudent);
router.delete("/:id", removeStudent);
router.put("/update/:id", updateStudent);

export { router };
