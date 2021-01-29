import Attendance from "../models/attendance.js";
import asyncHandler from "express-async-handler";

export const createAttendance = asyncHandler(async (req, res) => {
  const id = req.teacher._id;
  const { course, date, time } = req.body;

  const attendance = await Attendance.create({
    course,
    teacherId: id,
    date,
    time,
  });
  if (attendance) {
    res.json({
      course: attendance.course,
      teacherId: id,
      date: attendance.date,
      time: attendance.time,
      students: [],
    });
  } else {
    res.status(400);
    throw new Error("Invalid Attendance");
  }
});

export const getAttendanceRecords = asyncHandler(async (req, res) => {
  try {
    const attendances = await Attendance.find({ teacherId: req.teacher._id });
    res.json(attendances);
  } catch (err) {
    res.status(400);
    throw new Error(err);
  }
});

export const addStudentRecord = asyncHandler(async (req, res) => {
  try {
    const { recordId, name, rollno, branch } = req.body;
    const userRecords = await Attendance.findById(recordId);

    const record = {
      name,
      rollno,
      branch,
      teacher: req.teacher._id,
    };
    userRecords.students.push(record);
    await userRecords.save();
    res.status(200).json({
      name: userRecords.course,
      student: userRecords.students,
    });
  } catch (err) {
    res.status(400);
    throw new Error("Failed to save");
  }
});

export const getAttendanceByCourse = asyncHandler(async (req, res) => {
  try {
    const { recordId } = req.body;
    const records = await Attendance.findById(recordId);
    if (records) {
      res.status(200).json({
        students: records.students,
      });
    }
  } catch (err) {
    res.status(400);
    throw new Error("No Attendance records");
  }
});

export const deleteAttendanceRecord = asyncHandler(async (req, res) => {
  const attendance = await Attendance.findById(req.params.id);

  if (attendance) {
    await attendance.remove();
    res.json({ message: "Attendance removed" });
  } else {
    res.status(404);
    throw new Error("Attendance not found");
  }
});
