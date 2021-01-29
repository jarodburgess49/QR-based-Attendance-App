import jwt from "jsonwebtoken";

const generateJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "25d",
  });
};

export default generateJWT;
