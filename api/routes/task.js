
import express from 'express';
import { addTask, deleteAllTask, deleteTask, getTask, updateTask } from '../controllers/task.js';

const router = express.Router()

router.post("/new",addTask)
router.get("/",getTask)
router.patch("/:id",updateTask)
router.delete("/:id",deleteTask)
router.delete("/",deleteAllTask)

export default router