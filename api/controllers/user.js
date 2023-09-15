import { checkauthUser } from "../utils/features.js";
import { errorHandler } from "../utils/error.js";
 

// logged in user
export const loggedinuser = async (req, res) => {
  //let token = req.headers.cookie?.split("=")[1];
 let {token} = req.body
  try {
     if (!token) return errorHandler(res, 400, "Please Login");
  //  const user = checkauthUser(res, token.toString());
    const user = checkauthUser(res,token);
   // const user = await User.findById({ _id: userid }); 
     
    res.status(200).json({ success: true, message: `Welcome ${user.username}`, user ,token});
  } catch (error) {
    console.log(error);
    errorHandler(res, 500, "Internal Server Error");
  }
};
   