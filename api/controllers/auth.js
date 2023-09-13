import { User } from "../models/users.js";
import { errorHandler } from "../utils/error.js";
import bcrypt from "bcrypt";
import { cookieSetter, tokenGenerator } from "../utils/features.js";
import { validationResult } from "express-validator";

export const login = async (req, res) => {

    const validationErrors =  validationResult(req)
    if(!validationErrors.isEmpty()) return errorHandler(res,400,validationErrors.array()[0].msg)

  const { username, email, password } = req.body;
  const hasPassword = await bcrypt.hash(password, 10);

  try {
    if (!username || !email || !password)
      return errorHandler(res, 400, "All field required");
    const finduser = await User.findOne({ email });
    if (finduser) return errorHandler(res, 400, "User Already exist");
    const user = await User.create({ username, email, password: hasPassword });

    const token  = tokenGenerator(user._id)
    cookieSetter(res,token,true)

    res.status(200).json({success:true,message:`Welcome ${user.username}`,user});
  } catch (error) {
    console.log(error);
    errorHandler(res, 500, "Internal Server Error");
  }
};
