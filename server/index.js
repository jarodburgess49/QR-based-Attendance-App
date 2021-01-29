import express from "express";
const app = express();
import connect from "./db.js";
import authRoutes from "./routes/authRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import cors from "cors";
import bodyParser from "body-parser";
//Database
connect();
//Middlewares

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes

app.use("/api/auth", authRoutes);
app.use("/api", attendanceRoutes);
const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
  console.log(`Server is up and running at ${PORT}`);
});
