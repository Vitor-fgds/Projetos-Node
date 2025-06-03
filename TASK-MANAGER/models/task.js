const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim:true, // Corta possíveis espaços no salvamento do dado
        maxlength: [50, "Name can't have more than 50 characters!"]
    },

    completed: {
        type: Boolean,
        default: false,
    }
})

const Task = mongoose.model("Tasks", TaskSchema);

module.exports = Task;