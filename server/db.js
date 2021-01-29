import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connect = async () => {
  mongoose
    .connect(process.env.MONGODB, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(console.log("Database Connected"))
    .catch((err) => {
      console.log(err);
    });
};

export default connect;
