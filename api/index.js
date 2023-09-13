import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from 'cors'
import authRouet from './routes/auth.js'
import cookieParser from "cookie-parser";
 
dotenv.config();

const app = express();
const port = process.env.PORT;



// ? routes

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRouet)


// database

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};

mongoose.connection.on("disconnected",()=>{
    console.log("mongoDB disconnected!")
});
mongoose.connection.on("connected",()=>{ 
    console.log("mongoDB connected!")
});

app.listen(port, () => {
  connectToDB();
  console.log(`app listning on http://localhost:${port}`);
});
