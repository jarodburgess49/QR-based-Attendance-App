import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rollno: {
    type: Number,
    required: true,
    unique: true,
  },
  branch: {
    type: String,
    required: true,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Teacher",
  },
});

const attendanceSchema = new mongoose.Schema(
  {
    course: {
      type: String,
      trim: true,
      required: true,
    },
    teacherId: String,
    date: String,
    time: String,
    students: [studentSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Attendance", attendanceSchema);
