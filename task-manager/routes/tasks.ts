import express from "express";
import { createTask, getAllTasks, getTask, deleteTask, updateTask } from "../controllers/tasks.js";

const tasksRoute = express.Router();

tasksRoute.get('/', getAllTasks);
tasksRoute.post('/', createTask);

tasksRoute.patch('/:id', updateTask);
tasksRoute.get('/:id', getTask);
tasksRoute.delete('/:id', deleteTask);

export default tasksRoute;