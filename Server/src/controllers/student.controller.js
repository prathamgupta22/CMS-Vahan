import pool from "../config/db.js";
import queries from "../models/student.queries.js";

const getStudents = async (req, res) => {
  try {
    const { rows } = await pool.query(queries.getStudents);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error executing getStudents query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!Number.isInteger(parseInt(id))) {
      return res.status(400).json({ error: "Invalid student ID" });
    }
    const queryResult = await pool.query(queries.getStudentById, [
      parseInt(id),
    ]);
    res.status(200).json(queryResult.rows);
  } catch (error) {
    console.error("Error fetching student by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addStudent = async (req, res) => {
  const { name, email, mobile_no, dob } = req.body;

  try {
    if (!name || !email || !mobile_no || !dob) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if email exists
    const emailCheck = await pool.query(queries.checkEmailExists, [email]);
    if (emailCheck.rows.length > 0) {
      return res.status(409).json({ error: "Email already exists" });
    }

    // Insert new student into database
    await pool.query(queries.addStudent, [name, email, mobile_no, dob]);

    res.status(201).json({ message: "Student added successfully" });
  } catch (error) {
    console.error("Error adding student:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const removeStudent = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    // Validate input
    if (isNaN(id)) {
      return res.status(400).send("Invalid student ID");
    }

    // Check if student exists
    const studentQuery = await pool.query(queries.getStudentById, [id]);
    const student = studentQuery.rows[0];
    if (!student) {
      return res.status(404).send("Student not found");
    }

    // Remove student
    await pool.query(queries.removeStudent, [id]);
    res.status(200).send("Student removed successfully");
  } catch (error) {
    console.error("Error removing student:", error);
    res.status(500).send("Internal server error");
  }
};

const updateStudent = async (req, res) => {
  const id = req.params.id;
  const { name, email, mobile_no, dob } = req.body;
  const updateFields = [];

  if (name) {
    updateFields.push(`name = '${name}'`);
  }
  if (email !== undefined) {
    updateFields.push(`email = '${email}'`);
  }
  if (mobile_no !== undefined) {
    updateFields.push(`mobile_no = '${mobile_no}'`);
  }
  if (dob !== undefined) {
    updateFields.push(`dob = '${dob}'`);
  }

  const updateQuery = `
    UPDATE students
    SET ${updateFields.join(", ")}
    WHERE id = $1`;

  try {
    const client = await pool.connect();
    const result = await client.query(updateQuery, [id]);
    client.release();
    res.status(200).send("Record updated successfully");
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).send("Error updating record");
  }
};

export {
  getStudents,
  getStudentById,
  addStudent,
  removeStudent,
  updateStudent,
};
