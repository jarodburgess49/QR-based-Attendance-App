import express from "express";
const router = express.Router();
import { authorization } from "../middlewares/authMiddleware.js";
import {
  createAttendance,
  getAttendanceRecords,
  addStudentRecord,
  getAttendanceByCourse,
  deleteAttendanceRecord,
} from "../controllers/attenndanceController.js";
//get attendance records
router.get("/", authorization, getAttendanceRecords);
//get attendance list  by course name

//save attendance to database
router.post("/create", authorization, createAttendance);

//Add single student record in database
router.post("/add", authorization, addStudentRecord);

//Get records by course id
router.post("/list", authorization, getAttendanceByCourse);

//delete attendance record

router.delete("/:id", authorization, deleteAttendanceRecord);

export default router;
