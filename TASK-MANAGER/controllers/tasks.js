const express = require("express");
const app = express();
const Task = require("../models/task.js")
const asyncWrapper = require("../middleware/async.js")
const {createCustomError} = require("../errors/custom-error.js")

const getAllTasks = asyncWrapper( async (req,res) => {
        const tasks = await Task.find({})
        res.status(200).json({ tasks })
})

const getTask = asyncWrapper(async (req,res,next) => {
        const {id} = req.params
        const task = await Task.findById(id)
        if (!task){
            return next(createCustomError("Task not found!", 404))
        }
        res.status(200).json({task})
})

const createTask =  asyncWrapper(async (req,res) => {
    const task = await Task.create(req.body);
    res.status(201).json({ task })
})

const updateTask = asyncWrapper(async (req,res) => {
        const {id} = req.params;
        const task = await Task.findByIdAndUpdate(id, req.body, {
            new:true,
            runValidators:true,
        });
        if (!task){
            return next(createCustomError("Task not found!", 404))
        }
        res.status(200).json({task});
})

const deleteTask = asyncWrapper(async (req,res) => {
        const {id} = req.params;
        const task = await Task.findByIdAndDelete(id);
        if (!task){
            return next(createCustomError("Task not found!", 404))
        }
        res.status(200).json({msg: "Task deleted!"})
})




module.exports = {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
}