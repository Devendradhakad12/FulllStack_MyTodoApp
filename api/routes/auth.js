
 import express from "express"
 import { body } from "express-validator"
import { login } from "../controllers/auth.js"
const router =  express.Router()

 router.post("/register", [
    body("email", "Enter a valid email").isEmail(),
    body("username", "Enter a valid name").isLength({ min: 3 }),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ] , login)

export default  router