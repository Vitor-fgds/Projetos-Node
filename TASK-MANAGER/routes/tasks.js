const express = require("express");
const router = express.Router();
const {getAllTasks, getTask, deleteTask, updateTask, createTask} = require("../controllers/tasks.js")

router.get("/", getAllTasks);
router.get("/:id", getTask);
router.delete("/:id", deleteTask);
router.patch("/:id", updateTask);
router.post("/", createTask);


module.exports = router