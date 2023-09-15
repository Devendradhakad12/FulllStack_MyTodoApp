import { User } from "../models/users.js";
import { errorHandler } from "../utils/error.js";
import bcrypt from "bcrypt";
import { cookieSetter, tokenGenerator } from "../utils/features.js";
import { validationResult } from "express-validator";

// register
export const register = async (req, res) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty())
    return errorHandler(res, 400, validationErrors.array()[0].msg);

  const { username, email, password: pass } = req.body;
  const hashPassword = await bcrypt.hash(pass, 10);

  try {
    if (!username || !email || !pass)
      return errorHandler(res, 400, "All field required");
    const finduser = await User.findOne({ email });
    if (finduser) return errorHandler(res, 400, "User Already exist");
    const user = await User.create({ username, email, password: hashPassword });

    const token = tokenGenerator(user._id, user.username, user.email);
    cookieSetter(res, token, true);
   // const { password, ...otherDetails } = user._doc;
    res
      .status(200)
      .json({
        success: true,
        message: `Welcome ${user.username}`,
        //user: { ...otherDetails },
        token
      });
  } catch (error) {
    console.log(error);
    errorHandler(res, 500, "Internal Server Error");
  }
};

// login
export const login = async (req, res) => {
  const { email, password: pass } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user)
      return errorHandler(res, 400, "Please enter vailid email or password");
    const passwordMatch = await bcrypt.compare(pass, user.password);
    if (!passwordMatch)
      return errorHandler(res, 400, "Please enter vailid email or password");

    const token = tokenGenerator(user._id, user.username, user.email);
    cookieSetter(res, token, true);
   // const { password, ...otherDetails } = user._doc;
    res.status(200).json({
      success: true,
      message: `Welcome ${user.username}`,
         //user: { ...otherDetails },
       token
    });
  } catch (error) {
    console.log(error);
    errorHandler(res, 500, "Internal Server Error");
  }
};

// logout
export const logout = async (req, res) => {
  try {
    const token = tokenGenerator(null);
    cookieSetter(res, token, false);
    res.status(200).json({ success: true, message: `Successfully logged out` });
  } catch (error) {
    console.log(error);
    errorHandler(res, 500, "Internal Server Error");
  }
};
