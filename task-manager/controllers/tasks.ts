import { RequestHandler } from 'express';
import Task from '../models/Task.js';

export const createTask: RequestHandler = async (req, res) => {
    try {
        const { name } = req.body;
        // const task = await Task.create({ name, completed: false });
        const newTask = new Task({ name });
        await newTask.save();
        res.status(201).json({ success: true, task: newTask })
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .json({
                success: false,
                error: (error as Error).message
            })
    }
}

export const getAllTasks: RequestHandler = async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).json({ success: true, tasks });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: (error as Error).message })
    }
}
export const getTask: RequestHandler = async (req, res) => {
    try {
        const id = req.params.id;
        const task = await Task.findById(id);
        console.log(id, task);
        if (task) {
            res.status(200).json({
                success: true,
                task
            })
        } else {
            res.status(404).json({ success: false, error: 'task was not found' })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: (error as Error).message });
    }
}
export const updateTask: RequestHandler = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, completed } = req.body;
        const updated = await Task.findByIdAndUpdate(
            { _id: id },
            { name, completed },
            { runValidators: true }
        )

        if (!updated) {
            return res.status(404).json({ success: false, error: 'task was not found' })
        }

        res.status(200).json({
            success: true,
            task: updated
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Server error'
        })
    }
}
export const deleteTask: RequestHandler = async (req, res) => {
    try {
        const id = req.params.id;
        const task = await Task.findOneAndDelete({ _id: id });
        if (task) {
            res.status(200).json({ success: true, msg: 'task was delete successful' });
        } else {
            res.status(404).json({ success: false, msg: `task with id: ${ id } was not found` })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, msg: (error as Error).message });
    }
}