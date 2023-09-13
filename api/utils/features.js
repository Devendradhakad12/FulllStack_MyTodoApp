import { serialize } from "cookie";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const tokenGenerator = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRETE);
};

export const cookieSetter = (res, token, set) => {
  res.setHeader(
    "Set-cookie",
    serialize("token", set ? token : "", {
      path: "/",
      httpOnly: true,
      maxAge: set ? 15 * 24 * 60 * 60 * 1000 : 0, // expires 15 days
    })
  );
};
