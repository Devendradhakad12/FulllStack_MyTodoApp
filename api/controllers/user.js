import { checkauthUser } from "../utils/features.js";
import { errorHandler } from "../utils/error.js";
import { User } from "../models/users.js";

// logged in user
export const loggedinuser = async (req, res) => {
  const token = req.headers.cookie?.split("=")[1];
  try {
    if (!token) return errorHandler(res, 400, "Please login");
    const userid = checkauthUser(res, token.toString());
    const user = await User.findById({ _id: userid });
    res.status(200).json({ success: true, message: `Successfully`, user });
  } catch (error) {
    console.log(error);
    errorHandler(res, 500, "Internal Server Error");
  }
};
