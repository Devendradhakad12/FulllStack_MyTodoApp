
 import express from "express"
 import { body } from "express-validator"
import { login, logout, register } from "../controllers/auth.js"
const router =  express.Router()

 router.post("/register", [
    body("email", "Enter a valid email").isEmail().notEmpty(),
    body("username", "Enter a valid username").isLength({ min: 3,max:20 }).notEmpty(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5, max:12
    }).notEmpty(),
      body('passwordConfirmation','Password not Match').custom((value, { req }) => {
      return value === req.body.password;
    }),
  ] , register)


  router.post("/login",login)
  router.get("/logout",logout)

export default  router