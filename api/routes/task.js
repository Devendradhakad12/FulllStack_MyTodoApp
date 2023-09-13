
import express from 'express';
import { addTask, deleteTask, getTask, updateTask } from '../controllers/task.js';

const router = express.Router()

router.post("/new",addTask)
router.get("/",getTask)
router.patch("/:id",updateTask)
router.delete("/:id",deleteTask)

export default router