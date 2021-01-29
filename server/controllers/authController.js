import Teacher from "../models/teacher.js";
import asyncHandler from "express-async-handler";
import generateJWT from "../generateJWT.js";

//Register a user
export const registerTeacher = asyncHandler(async (req, res) => {
  const { name, lastname, email, password } = req.body;
  const alreadyExists = await Teacher.findOne({ email });
  if (alreadyExists) {
    res.status(400);
    throw new Error(
      "User Already exists , try with different email and password"
    );
  }
  const teacher = await Teacher.create({ name, lastname, email, password });
  if (teacher) {
    res.status(201).json({
      _id: teacher._id,
      name: teacher.name,
      lastname: teacher.lastname,
      email: teacher.email,
      token: generateJWT(teacher._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

//Loggin checker

export const loginChecker = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const teacher = await Teacher.findOne({ email });
  if (teacher && (await teacher.matchPassword(password))) {
    res.json({
      _id: teacher._id,
      name: teacher.name,
      lastname: teacher.lastname,
      email: teacher.email,
      token: generateJWT(teacher._id),
    });
  } else {
    res.status(401).json({
      message: "invalid credentials",
    });
  }
});

//Get teacher profile

export const getProfile = asyncHandler(async (req, res) => {
  const teacher = await Teacher.findById(req.teacher._id);
  if (teacher) {
    res.json({
      _id: teacher._id,
      name: teacher.name,
      email: teacher.email,
      token: generateJWT(teacher._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

export const updateTeacherProfile = asyncHandler(async (req, res) => {
  const teacher = await Teacher.findById(req.teacher._id);

  if (teacher) {
    teacher.name = req.body.name || teacher.name;
    teacher.lastname = req.body.lastname || teacher.lastname;

    teacher.email = req.body.email || teacher.email;
    if (req.body.password) {
      teacher.password = req.body.password;
    }

    const updatedteacher = await teacher.save();

    res.json({
      _id: updatedteacher._id,
      name: updatedteacher.name,
      lastname: updatedteacher.lastname,
      email: updatedteacher.email,
      token: generateJWT(updatedteacher._id),
    });
  } else {
    res.status(404);
    throw new Error("Teacher not found");
  }
});
