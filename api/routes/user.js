import express from "express"
import { loggedinuser } from "../controllers/user.js"


const router =  express.Router()

 
router.post("/",loggedinuser)

export default  router