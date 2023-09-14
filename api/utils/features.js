import { serialize } from "cookie";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// generate token
export const tokenGenerator = (id,username,email) => {
  return jwt.sign({ id,username,email }, process.env.JWT_SECRETE);
};


// set cookie in headers
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

// checkAuthUser 
 
export const checkauthUser = (res,token) =>{
 try {
  const user = jwt.verify(token,process.env.JWT_SECRETE)
 return user
 } catch (error) {
  console.log(error);
  errorHandler(res, 500, "Internal Server Error");
 }
}
