import express from "express"
import { loggedinuser } from "../controllers/user.js"


const router =  express.Router()

 
router.get("/",loggedinuser)

export default  router