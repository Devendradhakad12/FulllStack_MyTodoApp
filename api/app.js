import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from 'cors'
import authRoute from './routes/auth.js'
import userRoute from './routes/user.js'
import taskRoute from './routes/task.js'
import cookieParser from "cookie-parser";


//* Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});
 
dotenv.config();

const app = express();
const port = process.env.PORT;



// ? routes

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.get("/",(req,res)=>{res.status(200).json({message:"conected"})})
app.use("/api/auth",authRoute)
app.use("/api/user",userRoute)
app.use("/api/task",taskRoute)


// database

const connectToDB = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
};

mongoose.connection.on("disconnected",()=>{
    console.log("mongoDB disconnected!")
});
mongoose.connection.on("connected",()=>{ 
    console.log("mongoDB connected!")
});

 const server =  app.listen(port, () => {
  connectToDB();
  console.log(`app listning on http://localhost:${port}`);
});


//* unhandled promise rejection - mongoConnection String error handling
process.on('unhandledRejection',(err)=>{
  console.log(`Error: ${err.message}`) 
  console.log(`Shutting down the server due to inhandled promise rejection`)
  server.close(()=>{
     process.exit(1)
  }) 
 })   